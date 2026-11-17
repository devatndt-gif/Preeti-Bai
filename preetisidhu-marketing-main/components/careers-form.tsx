'use client'

import { useState } from 'react'
import { IconAlert, IconArrow, IconCheckCircle } from './icons'

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

const LICENSING = [
  'Licensed — LLQP complete',
  'Licensing in progress',
  'Not yet licensed',
] as const

const EXPERIENCE = [
  'None yet',
  'Under 1 year',
  '1 – 3 years',
  '3 – 5 years',
  'More than 5 years',
] as const

const AVAILABILITY = [
  'Full-time',
  'Part-time',
  'Alongside my current work',
] as const

const LANGUAGES = ['English', 'Punjabi', 'Hindi', 'Gujarati', 'Urdu', 'Other'] as const

/** Mirrors the server-side allowlist in app/api/careers/route.ts. */
const CV_TYPES = ['.pdf', '.doc', '.docx']
const CV_MAX_BYTES = 5 * 1024 * 1024

export function CareersForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [cvName, setCvName] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const firstName = String(data.get('first-name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (!firstName || !phone || !email) {
      setStatus('error')
      setMessage('Please give us your name, a phone number and an email address.')
      return
    }

    const cv = data.get('cv')
    if (cv instanceof File && cv.size > 0) {
      const ext = cv.name.slice(cv.name.lastIndexOf('.')).toLowerCase()
      if (!CV_TYPES.includes(ext)) {
        setStatus('error')
        setMessage('Please attach your CV as a PDF or Word document.')
        return
      }
      if (cv.size > CV_MAX_BYTES) {
        setStatus('error')
        setMessage('That CV is larger than 5 MB. Please attach a smaller file or email it to us.')
        return
      }
    }

    setStatus('loading')
    setMessage('')

    try {
      // Sent as multipart rather than JSON, because of the CV attachment.
      const res = await fetch('/api/careers', { method: 'POST', body: data })

      if (res.ok) {
        setStatus('success')
        setMessage(
          'Thank you. Your application is with us and Preeti will be in touch to arrange a conversation.'
        )
        form.reset()
        setCvName('')
        return
      }

      const body = await res.json().catch(() => null)

      if (res.status === 409) {
        setStatus('duplicate')
        setMessage(
          body?.message ?? 'You have already applied. We have your details and will be in touch.'
        )
        return
      }

      setStatus('error')
      setMessage(
        body?.message ??
          'We could not send that just now. Please call +1 (416) 427-3232 and we will take your details directly.'
      )
    } catch {
      setStatus('error')
      setMessage(
        'We could not reach the server. Please check your connection, or call +1 (416) 427-3232.'
      )
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {status === 'success' && (
        <div className="alert alert-ok" role="status">
          <IconCheckCircle />
          <span>{message}</span>
        </div>
      )}
      {status === 'duplicate' && (
        <div className="alert alert-warn" role="status">
          <IconAlert />
          <span>{message}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-err" role="alert">
          <IconAlert />
          <span>{message}</span>
        </div>
      )}

      <div className="field-row">
        <label className="field">
          <span>
            First name <span className="req">*</span>
          </span>
          <input name="first-name" type="text" autoComplete="given-name" required />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="last-name" type="text" autoComplete="family-name" />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>
            Phone <span className="req">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(416) 555-0123"
            required
          />
        </label>
        <label className="field">
          <span>
            Email <span className="req">*</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>City</span>
          <input name="city" type="text" autoComplete="address-level2" placeholder="Brampton" />
        </label>
        <label className="field">
          <span>Current company or occupation</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="e.g. mortgage agent"
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>
            Licensing status <span className="req">*</span>
          </span>
          <select name="licensing" defaultValue={LICENSING[2]} required>
            {LICENSING.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Experience in insurance</span>
          <select name="experience" defaultValue={EXPERIENCE[0]}>
            {EXPERIENCE.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Availability</span>
        <select name="availability" defaultValue={AVAILABILITY[0]}>
          {AVAILABILITY.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      {/* A fieldset rather than a label, because the group holds several inputs. */}
      <fieldset className="field choice-group">
        <legend>Languages you advise in</legend>
        <div className="choices">
          {LANGUAGES.map((lang) => (
            <label className="choice" key={lang}>
              <input
                type="checkbox"
                name="languages"
                value={lang}
                defaultChecked={lang === 'English'}
              />
              <span>{lang}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>CV or résumé</span>
        <span className="file-input">
          <input
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCvName(e.currentTarget.files?.[0]?.name ?? '')}
          />
          <span className="file-cue">{cvName || 'PDF or Word, up to 5 MB — optional'}</span>
        </span>
      </label>

      <label className="field">
        <span>Anything else we should know?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Why you are interested, the network you already have, when you could start."
        />
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send my application'}
        {status !== 'loading' && <IconArrow />}
      </button>

      <p className="form-note">
        We use these details only to consider your application and to contact you about it.
      </p>
    </form>
  )
}
