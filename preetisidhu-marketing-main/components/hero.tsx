'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CONTACT, SITE } from '@/lib/site'
import { IconArrow, IconCheckCircle, IconPhone } from './icons'

const SLIDES = [
  { src: '/slider/super-visa.jpg', alt: 'Grandparents welcomed at a Canadian airport' },
  { src: '/slider/life.jpg', alt: 'A family together at home' },
  { src: '/slider/travel.jpg', alt: 'Travellers setting out on a trip' },
  { src: '/slider/resp.jpg', alt: 'A student saving for post-secondary education' },
]

const TRUST = [
  '23+ Canadian insurers compared',
  'Full refund if a Super Visa is refused',
  'English, Punjabi & Hindi',
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-media" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={s.src} className={`hero-slide${i === idx ? ' on' : ''}`}>
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={82}
            />
          </div>
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="dot" />
            Licensed insurance &amp; investment advisor · Brampton, Ontario
          </span>

          <h1>
            Protecting what matters most, with advice that&nbsp;fits{' '}
            <em>your family</em>
          </h1>

          <p className="hero-sub">
            Super Visa, travel and life insurance, critical illness cover, and
            registered savings plans. We compare the whole Canadian market and
            explain the difference in plain language.
          </p>

          <div className="hero-cta">
            <Link href="/contact#quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-light">
              <IconPhone />
              {CONTACT.phone}
            </a>
          </div>

          <ul className="hero-trust">
            {TRUST.map((t) => (
              <li key={t}>
                <IconCheckCircle />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/*
          A transparent cut-out, so it is anchored to the floor of the hero and
          lit from behind rather than boxed like the rest of the photography.
        */}
        <div className="hero-figure">
          <Image
            src="/preeti-portrait.png"
            alt={`${SITE.advisor}, licensed insurance and investment advisor`}
            width={501}
            height={498}
            sizes="(max-width: 900px) 62vw, 420px"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={i === idx ? 'on' : undefined}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </section>
  )
}
