'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, productsByCategory } from '@/lib/products'
import { SITE, CONTACT, SOCIAL } from '@/lib/site'
import {
  IconArrow, IconChevron, IconMail, IconMoon, IconPhone, IconSun, IconX,
  SOCIAL_ICONS,
} from './icons'

const THEME_KEY = 'ps-theme'

export function SiteHeader() {
  const pathname = usePathname()
  const [megaOpen, setMegaOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openAcc, setOpenAcc] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /*
    The theme deliberately lives in the DOM, not in React state. The server
    cannot know what is in localStorage, so holding it in state made the server
    render one icon and the client another, which is a hydration mismatch. The
    inline script in the layout sets data-theme before first paint; this reads
    that attribute back on click, and CSS decides which icon is visible.
  */
  function toggleTheme() {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* storage blocked — the theme still applies for this page view */
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes whatever was open. Adjusting during render (rather
  // than in an effect) avoids a frame where the menu is still open on the new
  // page. See React's "adjusting state when a prop changes" pattern.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setDrawerOpen(false)
    setMegaOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setDrawerOpen(false)
      setMegaOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-left">
            <a href={CONTACT.phoneHref}>
              <IconPhone />
              {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref} className="hide-sm">
              <IconMail />
              {CONTACT.email}
            </a>
          </div>
          <div className="topbar-right">
            <span className="hide-sm">Service in English, Punjabi &amp; Hindi</span>
            <div className="topbar-soc">
              {SOCIAL.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS]
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap navrow">
          <Link href="/" className="brand" aria-label={`${SITE.legalName} home`}>
            <span className="brand-leaf">
              <Image
                src="/preeti-logo.png"
                alt=""
                width={4025}
                height={2622}
                priority
              />
            </span>
            <span className="brand-word">
              <span className="name">{SITE.name}</span>
              <span className="sub">{SITE.tagline}</span>
            </span>
          </Link>

          <nav aria-label="Main">
            <ul className="mainnav">
              <li>
                <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" aria-current={isActive('/about') ? 'page' : undefined}>
                  About
                </Link>
              </li>
              <li
                className={megaOpen ? 'open' : undefined}
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  Insurance &amp; Investments
                  <IconChevron className="chev" />
                </button>

                <div className="mega" role="menu">
                  <div className="mega-grid">
                    {CATEGORIES.map((cat) => (
                      <div className="mega-col" key={cat.key}>
                        <h5>{cat.title}</h5>
                        {productsByCategory(cat.key).map((p) => (
                          <Link key={p.slug} href={`/products/${p.slug}`} role="menuitem">
                            {p.shortName}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega-foot">
                    <p>Not sure which plan fits? A 15-minute call usually settles it.</p>
                    <Link href="/contact#quote" className="btn btn-primary btn-sm">
                      Get a free quote
                      <IconArrow />
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/gallery" aria-current={isActive('/gallery') ? 'page' : undefined}>
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/join-our-team"
                  aria-current={isActive('/join-our-team') ? 'page' : undefined}
                >
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact#quote" aria-current={isActive('/contact') ? 'page' : undefined}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Both icons render; CSS shows the one that matches data-theme.
                The label stays constant so it cannot mismatch either. */}
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Switch between light and dark theme"
            >
              <IconMoon className="icon-light" aria-hidden="true" />
              <IconSun className="icon-dark" aria-hidden="true" />
            </button>
            <Link href="/contact#quote" className="btn btn-primary btn-sm">
              Free Quote
            </Link>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer ---- */}
      <div
        className={`drawer-mask${drawerOpen ? ' on' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`drawer${drawerOpen ? ' on' : ''}`} aria-label="Mobile navigation">
        <div className="drawer-head">
          <span className="brand">
            <span className="brand-leaf">
              <Image src="/preeti-logo.png" alt="" width={4025} height={2622} />
            </span>
            <span className="brand-word">
              <span className="name">{SITE.name}</span>
              <span className="sub">{SITE.tagline}</span>
            </span>
          </span>
          <button
            type="button"
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <IconX />
          </button>
        </div>

        <div className="drawer-body">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className={`drawer-acc${openAcc === cat.key ? ' open' : ''}`}
            >
              <button
                type="button"
                aria-expanded={openAcc === cat.key}
                onClick={() => setOpenAcc(openAcc === cat.key ? null : cat.key)}
              >
                {cat.title}
                <IconChevron />
              </button>
              <div className="drawer-acc-body">
                {productsByCategory(cat.key).map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`}>
                    {p.shortName}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link href="/gallery">Offers</Link>
          <Link href="/join-our-team">Join Our Team</Link>
          <Link href="/contact#quote">Contact</Link>
        </div>

        <div className="drawer-foot">
          <a href={CONTACT.phoneHref} className="btn btn-ghost btn-block">
            <IconPhone />
            {CONTACT.phone}
          </a>
          <Link href="/contact#quote" className="btn btn-primary btn-block">
            Get a Free Quote
            <IconArrow />
          </Link>
        </div>
      </aside>
    </>
  )
}
