import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { pool } from '@/lib/db'
import { sendRecruitAcknowledgement, sendRecruitNotification } from '@/lib/email'
import { SITE } from '@/lib/site'

/**
 * Applications from /join-our-team are recruitment leads, not insurance leads,
 * so they are written to the CRM's "SubAgent" table as a pending recruit:
 * agreement NOT_SENT and commission left at zero until someone takes them on.
 * Insurance enquiries keep going to /api/enquiry and the "Client" table.
 */
const SUBDOMAIN = process.env.CRM_SUBDOMAIN ?? 'preetisidhu'

/** Where a submitted CV is written, and the base URL the CRM links it under. */
const CV_DIR = process.env.CAREERS_UPLOAD_DIR ?? path.join(process.cwd(), 'public', 'uploads', 'careers')
const CV_BASE_URL = process.env.CAREERS_UPLOAD_BASE_URL ?? `${SITE.url}/uploads/careers`

const CV_TYPES = ['.pdf', '.doc', '.docx']
const CV_MAX_BYTES = 5 * 1024 * 1024

function clean(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, max)
}

/**
 * The CRM treats contact details as a sub-agent's identity and compares them
 * normalised, so "+1 (416) 427-3232" and "4164273232" collide. Match that here,
 * or the website would create rows the CRM then refuses to edit.
 */
const normalizeEmail = (v: string) => v.trim().toLowerCase()
const normalizePhone = (v: string) => v.replace(/\D/g, '')

type SavedCv = { url: string; name: string; type: string; size: number }

/** Best-effort: a CV that cannot be stored must never lose the application. */
async function storeCv(file: File, applicant: string): Promise<SavedCv | null> {
  const ext = path.extname(file.name).toLowerCase()
  if (!CV_TYPES.includes(ext)) return null
  if (file.size === 0 || file.size > CV_MAX_BYTES) return null

  const safeApplicant = applicant.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'applicant'
  const filename = `${Date.now()}_${safeApplicant}${ext}`

  try {
    await mkdir(CV_DIR, { recursive: true })
    await writeFile(path.join(CV_DIR, filename), Buffer.from(await file.arrayBuffer()))
  } catch (err) {
    console.error('[careers] could not store CV', err)
    return null
  }

  return {
    url: `${CV_BASE_URL.replace(/\/$/, '')}/${filename}`,
    name: file.name,
    type: ext.replace('.', ''),
    size: file.size,
  }
}

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  }

  const firstName = clean(form.get('first-name'), 80)
  const lastName = clean(form.get('last-name'), 80)
  const phone = clean(form.get('phone'), 40)
  const email = clean(form.get('email'), 160)
  const city = clean(form.get('city'), 120)
  const company = clean(form.get('company'), 160)
  const licensing = clean(form.get('licensing'), 80)
  const experience = clean(form.get('experience'), 80)
  const availability = clean(form.get('availability'), 80)
  const message = clean(form.get('message'), 2000)
  const languages = form
    .getAll('languages')
    .map((l) => clean(l, 40))
    .filter(Boolean)
    .join(', ')

  if (!firstName || !phone || !email) {
    return NextResponse.json(
      { message: 'Please provide your name, a phone number and an email address.' },
      { status: 400 }
    )
  }

  const name = [firstName, lastName].filter(Boolean).join(' ')

  try {
    const tenantResult = await pool.query<{
      id: string
      notifyEmail: string | null
      notifyOnEnquiry: boolean
    }>(
      `SELECT id, "notifyEmail", "notifyOnEnquiry"
         FROM "Tenant"
        WHERE subdomain = $1 AND active = true
        LIMIT 1`,
      [SUBDOMAIN]
    )

    const tenant = tenantResult.rows[0]
    if (!tenant) {
      console.error(`[careers] no active tenant for subdomain "${SUBDOMAIN}"`)
      return NextResponse.json(
        { message: 'We could not record that right now. Please call us on +1 (416) 427-3232.' },
        { status: 503 }
      )
    }

    const dupResult = await pool.query<{ email: string | null }>(
      `SELECT email FROM "SubAgent"
        WHERE "tenantId" = $1
          AND (lower(trim(email)) = $2 OR regexp_replace(phone, '\\D', '', 'g') = $3)
        LIMIT 1`,
      [tenant.id, normalizeEmail(email), normalizePhone(phone)]
    )

    if (dupResult.rows[0]) {
      return NextResponse.json(
        {
          alreadyApplied: true,
          message: 'You are already on our list. Preeti will be in touch about next steps.',
        },
        { status: 409 }
      )
    }

    const cvFile = form.get('cv')
    const cv = cvFile instanceof File && cvFile.size > 0 ? await storeCv(cvFile, name) : null

    // SubAgent.notes is free text, so the application is written as a readable
    // block rather than JSON — it is read by a person, in the CRM.
    const notes = [
      'Applied through the website careers page',
      licensing && `Licensing: ${licensing}`,
      experience && `Experience: ${experience}`,
      languages && `Languages: ${languages}`,
      availability && `Availability: ${availability}`,
      city && `City: ${city}`,
      cv && `CV: ${cv.url}`,
      message && `\nMessage:\n${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    const subAgentId = randomUUID()

    await pool.query(
      `INSERT INTO "SubAgent" (
         id, "tenantId", name, company, phone, email, address, notes,
         "portalEnabled", "agreementStatus", "commissionPercent", "paymentStatus",
         "outstandingBalance", "createdAt", "updatedAt"
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8,
         false, 'NOT_SENT'::"AgreementStatus", 0, 'PENDING'::"PaymentStatus",
         0, NOW(), NOW()
       )`,
      [subAgentId, tenant.id, name, company || null, phone, email, city || null, notes]
    )

    if (cv) {
      await pool.query(
        `INSERT INTO "Document" (
           id, "tenantId", name, category, "fileUrl", "fileType", "fileSize",
           "subAgentId", "uploadedAt"
         ) VALUES ($1, $2, $3, 'OTHER', $4, $5, $6, $7, NOW())`,
        [randomUUID(), tenant.id, `CV — ${name}`, cv.url, cv.type, cv.size, subAgentId]
      )
    }

    // Email is best-effort: a delivery failure must not lose the application or
    // make the applicant think the form did not work.
    sendRecruitAcknowledgement({ tenantId: tenant.id, to: email, firstName }).catch((err) =>
      console.error('[careers] applicant acknowledgement failed', err)
    )

    if (tenant.notifyOnEnquiry && tenant.notifyEmail) {
      sendRecruitNotification({
        tenantId: tenant.id,
        to: tenant.notifyEmail,
        name,
        phone,
        email,
        city: city || undefined,
        company: company || undefined,
        licensing: licensing || undefined,
        experience: experience || undefined,
        languages: languages || undefined,
        availability: availability || undefined,
        message: message || undefined,
        cvUrl: cv?.url,
      }).catch((err) => console.error('[careers] advisor notification failed', err))
    }

    return NextResponse.json({ ok: true, id: subAgentId })
  } catch (err) {
    console.error('[careers] failed to record application', err)
    return NextResponse.json(
      {
        message:
          'Something went wrong on our side. Please call +1 (416) 427-3232 and we will take your details directly.',
      },
      { status: 500 }
    )
  }
}
