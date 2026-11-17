import type { Metadata } from 'next'
import { QuoteForm } from '@/components/quote-form'
import { Reveal } from '@/components/reveal'
import {
  IconClock, IconGlobe, IconMail, IconPhone, IconPin, IconWhatsapp,
} from '@/components/icons'
import { CONTACT, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & Free Quote',
  description:
    'Request a free, no-obligation insurance quote from Preeti Sidhu in Brampton, Ontario. Call +1 (416) 427-3232, message on WhatsApp, or send the form. English, Punjabi and Hindi.',
  alternates: { canonical: `${SITE.url}/contact` },
}

const CHANNELS = [
  {
    icon: IconPhone,
    label: 'Call us',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: 'Fastest for anything urgent',
  },
  {
    icon: IconWhatsapp,
    label: 'WhatsApp',
    value: 'Start a chat',
    href: CONTACT.whatsapp,
    note: 'Send documents and photos',
    external: true,
  },
  {
    icon: IconMail,
    label: 'Email',
    value: CONTACT.email,
    href: CONTACT.emailHref,
    note: 'We reply within one business day',
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Contact</span>
          <h1>Get a free quote, or just ask a question</h1>
          <p>
            There is no cost for advice and no obligation to buy. Tell us what you are
            trying to protect and we will come back with real options, usually the same
            business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid-3" style={{ marginBottom: 56 }}>
            {CHANNELS.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.label} delay={i * 70}>
                  <a
                    href={c.href}
                    className="card"
                    style={{ display: 'block' }}
                    {...(c.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className="icon-badge">
                      <Icon />
                    </span>
                    <h3 style={{ fontSize: '1.05rem' }}>{c.label}</h3>
                    <p
                      style={{
                        color: 'var(--red)',
                        fontWeight: 600,
                        marginTop: 8,
                        fontSize: '.98rem',
                      }}
                    >
                      {c.value}
                    </p>
                    <p style={{ color: 'var(--muted)', fontSize: '.87rem', marginTop: 4 }}>
                      {c.note}
                    </p>
                  </a>
                </Reveal>
              )
            })}
          </div>

          <div className="split">
            <Reveal>
              <span className="eyebrow">Send a request</span>
              <h2 style={{ fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', marginTop: 14 }}>
                Tell us what you need covered
              </h2>
              <p className="lede" style={{ marginTop: 16 }}>
                The more you can tell us up front — ages, travel dates, existing coverage,
                budget — the closer the first quote will be to the final one.
              </p>

              <div
                className="card"
                style={{ marginTop: 28, display: 'grid', gap: 16 }}
              >
                <div style={{ display: 'flex', gap: 13 }}>
                  <IconPin style={{ width: 19, height: 19, color: 'var(--red)', flex: 'none', marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '.95rem' }}>
                      Head office
                    </strong>
                    <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                      {CONTACT.street}
                      <br />
                      {CONTACT.city}, {CONTACT.regionLong}, {CONTACT.country}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 13 }}>
                  <IconClock style={{ width: 19, height: 19, color: 'var(--red)', flex: 'none', marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '.95rem' }}>Hours</strong>
                    <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                      {CONTACT.hours}
                      <br />
                      Evening and weekend calls by arrangement
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 13 }}>
                  <IconGlobe style={{ width: 19, height: 19, color: 'var(--red)', flex: 'none', marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '.95rem' }}>
                      Languages
                    </strong>
                    <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                      {CONTACT.languages.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/*
              Target for every "Free Quote" link on the site. The id sits on the
              form itself rather than the surrounding row: stacked on a phone the
              row begins with the address card, which left the first field at the
              very bottom of the screen.
            */}
            <Reveal delay={80} id="quote">
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingBottom: 'clamp(56px,8vw,96px)' }}>
        <div className="wrap">
          <Reveal>
            <div
              style={{
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                lineHeight: 0,
              }}
            >
              <iframe
                title={`Map showing ${CONTACT.addressLine}`}
                src="https://www.google.com/maps?q=Unit+209,+60+Lacoste+Boulevard,+Brampton,+Ontario&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
