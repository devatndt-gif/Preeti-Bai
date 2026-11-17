'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Creative } from '@/lib/creatives'
import { CONTACT } from '@/lib/site'
import { IconArrow, IconPhone } from './icons'

/**
 * The campaign graphics, laid out as a masonry wall.
 *
 * The creatives are square and portrait in roughly equal measure and carry
 * their message as baked-in type, so nothing here crops them — a column layout
 * keeps every one at its own aspect ratio and the text readable. Clicking a
 * tile opens it full size with the matching product and a way to call.
 */
export function CreativeGrid({ items }: { items: Creative[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])

  const close = useCallback(() => {
    setOpen((i) => {
      // Hand focus back to the tile that opened the viewer.
      if (i !== null) triggers.current[i]?.focus()
      return null
    })
  }, [])

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (open === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, close, step])

  const current = open === null ? null : items[open]

  return (
    <>
      <div className="cw-grid">
        {items.map((c, i) => (
          <button
            key={c.file}
            type="button"
            className="cw-tile"
            ref={(el) => {
              triggers.current[i] = el
            }}
            onClick={() => setOpen(i)}
            aria-haspopup="dialog"
          >
            <Image
              src={c.src}
              alt={c.alt}
              width={c.width}
              height={c.height}
              sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 30vw"
            />
            <span className="cw-tile-veil">
              <span className="cw-tile-title">{c.title}</span>
              <span className="cw-tile-hint">View</span>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className="cw-lightbox" role="dialog" aria-modal="true" aria-label={current.title}>
          <button
            type="button"
            className="cw-backdrop"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
          />

          <div className="cw-frame">
            <div className="cw-stage">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(max-width: 900px) 94vw, 720px"
                priority
              />
            </div>

            <div className="cw-panel">
              <h3>{current.title}</h3>
              {current.note && <p className="cw-note">{current.note}</p>}

              <div className="cw-actions">
                {current.product && (
                  <Link href={`/products/${current.product}`} className="btn btn-primary btn-sm" onClick={close}>
                    Read the details
                    <IconArrow />
                  </Link>
                )}
                <a href={CONTACT.phoneHref} className="btn btn-ghost btn-sm">
                  <IconPhone />
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            {items.length > 1 && (
              <>
                <button type="button" className="cw-nav prev" onClick={() => step(-1)} aria-label="Previous graphic">
                  <Chevron />
                </button>
                <button type="button" className="cw-nav next" onClick={() => step(1)} aria-label="Next graphic">
                  <Chevron />
                </button>
              </>
            )}

            <button type="button" className="cw-close" onClick={close} aria-label="Close" autoFocus>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
