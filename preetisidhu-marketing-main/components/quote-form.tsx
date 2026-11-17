'use client'

import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, productsByCategory } from '@/lib/products'
import { IconAlert, IconArrow, IconCheckCircle } from './icons'

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid',
] as const

const STORAGE_KEY = 'ps-attribution'

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const attribution = useRef<Record<string, string>>({})

  // Capture campaign parameters on first landing and keep them for the session,
  // so a lead that browses before converting is still attributed correctly.
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) attribution.current = JSON.parse(stored)

      const params = new URLSearchParams(window.location.search)
      const found: Record<string, string> = {}
      for (const key of UTM_KEYS) {
        const value = params.get(key)
        if (value) found[key] = value
      }
      if (Object.keys(found).length) {
        attribution.current = { ...attribution.current, ...found }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution.current))
      }
    } catch {
      /* private mode — attribution is best-effort, never block the form */
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const firstName = String(data.get('first-name') ?? '').trim()
    const phone = String(data.get('your-phone') ?? '').trim()

    if (!firstName || !phone) {
      setStatus('error')
      setMessage('Please enter your first name and a phone number we can reach you on.')
      return
    }

    setStatus('loading')
    setMessage('')

    const payload = {
      'first-name': firstName,
      'last-name': String(data.get('last-name') ?? '').trim(),
      'your-email': String(data.get('your-email') ?? '').trim(),
      'your-phone': phone,
      'your-product': String(data.get('your-product') ?? '').trim(),
      'your-message': String(data.get('your-message') ?? '').trim(),
      ...attribution.current,
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setMessage(
          'Thank you. Your request has reached us and we will call you shortly to talk it through.'
        )
        form.reset()
        return
      }

      const body = await res.json().catch(() => null)

      if (res.status === 409) {
        setStatus('duplicate')
        setMessage(
          body?.message ??
            'You are already on file with us. Our team will be in touch shortly.'
        )
        return
      }

      setStatus('error')
      setMessage(
        body?.message ??
          'We could not submit that just now. Please call us on +1 (416) 427-3232 and we will take the details directly.'
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
            name="your-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(416) 555-0123"
            required
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            name="your-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="field">
        <span>What are you interested in?</span>
        <select name="your-product" defaultValue={defaultProduct ?? ''}>
          <option value="">Select a product or ask us to recommend one</option>
          {CATEGORIES.map((cat) => (
            <optgroup key={cat.key} label={cat.title}>
              {productsByCategory(cat.key).map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Not sure — please advise">Not sure — please advise</option>
        </select>
      </label>

      <label className="field">
        <span>Anything we should know?</span>
        <textarea
          name="your-message"
          rows={4}
          placeholder="Ages of the people to be covered, travel dates, budget, existing coverage — whatever is relevant."
        />
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Request my free quote'}
        {status !== 'loading' && <IconArrow />}
      </button>

      <p className="form-note">
        No obligation and no cost. We use your details only to prepare your quote and
        contact you about it.
      </p>
    </form>
  )
}
