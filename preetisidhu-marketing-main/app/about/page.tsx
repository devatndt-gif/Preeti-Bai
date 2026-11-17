import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Reveal } from '@/components/reveal'
import { StatsBand } from '@/components/stats-band'
import { PartnerMarquee } from '@/components/partner-marquee'
import { IconArrow, IconCheckCircle, IconPhone, ProductIcon } from '@/components/icons'
import { CONTACT, PROCESS, SITE, WHY_US } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Preeti Sidhu',
  description:
    'Preeti Sidhu is an independent insurance and investment advisor in Brampton, Ontario, serving Canadian families in English, Punjabi and Hindi across Super Visa, life, travel and registered savings plans.',
  alternates: { canonical: `${SITE.url}/about` },
}

const VALUES = [
  {
    icon: 'shield',
    title: 'Independence first',
    body: 'We are not tied to one insurer. Every recommendation is the product of a market comparison, and we will tell you when your existing coverage is already the right one.',
  },
  {
    icon: 'compass',
    title: 'Plain language',
    body: 'Policy wording is written by lawyers for lawyers. Our job is to translate it, including the parts that are not in your favour, before you sign anything.',
  },
  {
    icon: 'handshake',
    title: 'Here at claim time',
    body: 'Selling a policy is the easy part. We stay involved through the claim, because that is the only moment the coverage is actually tested.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">About us</span>
          <h1>Advice you can act on, from someone who knows the market</h1>
          <p>
            {SITE.legalName} helps families across Canada protect their income, their
            health and their plans — with coverage chosen on merit rather than on whoever
            called first.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal className="split-media from-left">
            <div className="brand-panel portrait">
              <Image
                src="/preeti-portrait.png"
                alt={`${SITE.advisor}, licensed insurance and investment advisor`}
                width={501}
                height={498}
                sizes="(max-width: 900px) 60vw, 30vw"
                loading="eager"
              />
              <span className="panel-rule" />
              <p>&ldquo;{SITE.promise}&rdquo;</p>
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow">Meet your advisor</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.4vw,2.5rem)', marginTop: 14 }}>
              {SITE.advisor}
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Preeti is a licensed insurance and investment advisor based in Brampton,
              Ontario, working with families across the country on the decisions that are
              easy to postpone and expensive to get wrong.
            </p>
            <p style={{ marginTop: 16, color: 'var(--ink-soft)' }}>
              Much of that work is with South Asian families in Canada — sponsoring
              parents on a Super Visa, insuring a first mortgage, opening an RESP for a
              child born here, or building the coverage a newly self-employed household
              suddenly needs. Those conversations go better in the language people think
              in, which is why every part of the process is available in English, Punjabi
              or Hindi.
            </p>
            <p style={{ marginTop: 16, color: 'var(--ink-soft)' }}>
              The practice is independent and contracted with more than twenty-three
              Canadian insurers. That matters for a simple reason: the same applicant can
              be assessed very differently by two carriers, and knowing which one to
              approach is often the difference between a decline and a standard rate.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href="/contact#quote" className="btn btn-primary">
                Book a conversation
                <IconArrow />
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn-ghost">
                <IconPhone />
                {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What we stand for</span>
            <h2>Three things we will not compromise on</h2>
          </Reveal>
          <div className="grid grid-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card">
                  <span className="icon-badge">
                    <ProductIcon name={v.icon} />
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.93rem', marginTop: 10 }}>
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">How we work</span>
            <h2>What happens after you get in touch</h2>
          </Reveal>
          <div className="steps">
            {PROCESS.map((s, i) => (
              <Reveal key={s.step} delay={i * 80} className="step lit">
                <span className="num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The difference</span>
            <h2>Why clients stay with us</h2>
          </Reveal>
          <div className="grid grid-2">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 50}>
                <div className="scard">
                  <span className="icon-badge">
                    <IconCheckCircle />
                  </span>
                  <span>
                    <h3>{w.title}</h3>
                    <p>{w.body}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">Our partners</span>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)' }}>
              Contracted with Canada&rsquo;s leading insurers
            </h2>
          </Reveal>
        </div>
        <PartnerMarquee />
      </section>

      <section className="section-tight" style={{ paddingBottom: 'clamp(56px,8vw,104px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Start with a conversation, not a quote</h2>
                <p>
                  Fifteen minutes is usually enough to tell whether your current coverage
                  is doing its job. If it is, we will say so.
                </p>
              </div>
              <div className="cta-band-actions">
                <Link href="/contact#quote" className="btn btn-primary">
                  Get in touch
                  <IconArrow />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  className="btn btn-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
