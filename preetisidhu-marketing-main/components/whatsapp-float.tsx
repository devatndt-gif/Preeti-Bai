'use client'

import { useEffect, useRef } from 'react'
import { CONTACT } from '@/lib/site'
import { IconWhatsapp } from './icons'

/**
 * Floating WhatsApp button.
 *
 * It retires once the footer credit bar reaches the viewport. Everything the
 * button offers — the WhatsApp link, the phone number, the address — is in the
 * footer by that point, and the bottom-right corner is contested down there by
 * the agency marks and the legal links.
 *
 * Reserving space in the bar instead was not an option: the bar needs nearly
 * its full container width to keep the three services on one row, so any
 * padding pushed them onto a second line.
 */
export function WhatsappFloat() {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    const bar = document.querySelector<HTMLElement>('.powered')
    if (!el || !bar) return

    let frame = 0
    const update = () => {
      frame = 0
      const reachedFooter = bar.getBoundingClientRect().top < window.innerHeight
      el.classList.toggle('is-hidden', reachedFooter)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <a
      ref={ref}
      className="wa-float"
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <IconWhatsapp />
    </a>
  )
}
