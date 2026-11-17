import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { pool } from '@/lib/db'
import { sendAdvisorNotification, sendClientConfirmation } from '@/lib/email'

/**
 * Website enquiries are written into the CRM as leads against this tenant.
 * Override with CRM_SUBDOMAIN if the tenant is provisioned under another name.
 */
const SUBDOMAIN = process.env.CRM_SUBDOMAIN ?? 'preetisidhu'

/** Trims, collapses whitespace and caps length so one field cannot flood a row. */
function clean(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  }

  const record = body as Record<string, unknown>

  const firstName = clean(record['first-name'], 80)
  const lastName = clean(record['last-name'], 80)
  const email = clean(record['your-email'], 160)
  const phone = clean(record['your-phone'], 40)
  const product = clean(record['your-product'], 120)
  const message = clean(record['your-message'], 2000)

  const utmSource = clean(record.utm_source, 120)
  const utmMedium = clean(record.utm_medium, 120)
  const utmCampaign = clean(record.utm_campaign, 160)
  const utmContent = clean(record.utm_content, 160)
  const utmTerm = clean(record.utm_term, 160)
  const fbclid = clean(record.fbclid, 255)

  if (!firstName || !phone) {
    return NextResponse.json(
      { message: 'Please provide your first name and a phone number.' },
      { status: 400 }
    )
  }

  try {
    // ── Resolve the tenant ───────────────────────────────────────────────────
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
      console.error(`[enquiry] no active tenant for subdomain "${SUBDOMAIN}"`)
      return NextResponse.json(
        { message: 'We could not record that right now. Please call us on +1 (416) 427-3232.' },
        { status: 503 }
      )
    }

    // ── Reject an obvious duplicate rather than creating a second lead ───────
    const dupResult = await pool.query<{ phone: string }>(
      `SELECT phone FROM "Client"
        WHERE "tenantId" = $1 AND (phone = $2 OR ($3 <> '' AND email = $3))
        LIMIT 1`,
      [tenant.id, phone, email]
    )

    if (dupResult.rows[0]) {
      const matched = dupResult.rows[0].phone === phone ? 'phone number' : 'email address'
      return NextResponse.json(
        {
          alreadyRegistered: true,
          message: `This ${matched} is already on file with us. Our team will be in touch shortly.`,
        },
        { status: 409 }
      )
    }

    const name = [firstName, lastName].filter(Boolean).join(' ')

    const leadSource =
      utmSource === 'facebook' || fbclid
        ? 'FACEBOOK'
        : utmSource === 'instagram'
          ? 'INSTAGRAM'
          : utmSource === 'google'
            ? 'GOOGLE'
            : 'WEBSITE'

    const notes = JSON.stringify({
      source: 'Website quote request',
      ...(product && { product }),
      ...(message && { message }),
    })

    // Link the lead to the matching Product row when the visitor picked one off
    // the menu, so the CRM shows a real product rather than only free text. A
    // miss is fine — planName still carries whatever they typed.
    let productId: string | null = null
    if (product) {
      const productResult = await pool.query<{ id: string }>(
        `SELECT id FROM "Product"
          WHERE "tenantId" = $1 AND lower(name) = lower($2) AND active = true
          LIMIT 1`,
        [tenant.id, product]
      )
      productId = productResult.rows[0]?.id ?? null
    }

    const leadId = randomUUID()

    await pool.query(
      `INSERT INTO "Client" (
         id, "tenantId", name, "firstName", "lastName",
         email, phone, status, "leadSource", "planName", "productId", notes,
         "utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm", fbclid,
         "dateAdded", "updatedAt"
       ) VALUES (
         $1, $2, $3, $4, $5,
         $6, $7, 'INTERESTED'::"ClientStatus", $8::"LeadSource", $9, $10, $11,
         $12, $13, $14, $15, $16, $17,
         NOW(), NOW()
       )`,
      [
        leadId,
        tenant.id,
        name,
        firstName,
        lastName || null,
        // The CRM requires a non-null email; use a unique placeholder when the
        // lead only left a phone number.
        email || `nophone+${leadId}@placeholder.local`,
        phone,
        leadSource,
        product || null,
        productId,
        notes,
        utmSource || null,
        utmMedium || null,
        utmCampaign || null,
        utmContent || null,
        utmTerm || null,
        fbclid || null,
      ]
    )

    // Email is best-effort: a delivery failure must never lose the lead or make
    // the visitor think the form did not work.
    if (email) {
      sendClientConfirmation({
        tenantId: tenant.id,
        to: email,
        firstName,
        product: product || undefined,
      }).catch((err) => console.error('[enquiry] client confirmation failed', err))
    }

    if (tenant.notifyOnEnquiry && tenant.notifyEmail) {
      sendAdvisorNotification({
        tenantId: tenant.id,
        to: tenant.notifyEmail,
        leadName: name,
        leadPhone: phone,
        leadEmail: email,
        product: product || undefined,
        message: message || undefined,
        source: leadSource,
      }).catch((err) => console.error('[enquiry] advisor notification failed', err))
    }

    return NextResponse.json({ ok: true, id: leadId })
  } catch (err) {
    console.error('[enquiry] failed to record lead', err)
    return NextResponse.json(
      {
        message:
          'Something went wrong on our side. Please call +1 (416) 427-3232 and we will take your details directly.',
      },
      { status: 500 }
    )
  }
}
