import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { Reveal } from '@/components/reveal'
import { StatsBand } from '@/components/stats-band'
import { PartnerMarquee } from '@/components/partner-marquee'
import { QuoteForm } from '@/components/quote-form'
import { FaqList } from '@/components/faq-list'
import { GoogleReviews } from '@/components/google-reviews'
import { InstagramFeed } from '@/components/instagram-feed'
import {
  IconArrow, IconCheckCircle, IconMail, IconPhone, IconPin, ProductIcon,
} from '@/components/icons'
import { CATEGORIES, FEATURED_PRODUCTS, productsByCategory } from '@/lib/products'
import { CONTACT, PROCESS, SITE, WHY_US } from '@/lib/site'

export const metadata: Metadata = {
  title: `${SITE.legalName} — Super Visa, Life & Travel Insurance in Canada`,
  description:
    'Independent insurance and investment advice from Brampton, Ontario. Super Visa, visitor, travel, life, critical illness and disability insurance, plus RESP, RRSP, TFSA and FHSA. Served in English, Punjabi and Hindi.',
  alternates: { canonical: SITE.url },
}

/** A short set of cross-cutting questions, distinct from the per-product FAQs. */
const HOME_FAQS = [
  {
    q: 'What does it cost to work with you?',
    a: 'Nothing. As a licensed broker we are paid a commission by the insurer whose policy you choose, so our advice, quotes and the application paperwork cost you nothing. The premium is the same whether you buy through us or direct.',
  },
  {
    q: 'How quickly can coverage start?',
    a: 'Travel and visitor policies can be issued the same day, often within the hour. Life and critical illness applications that need no medical exam are commonly approved in two to five business days; a fully underwritten policy takes longer.',
  },
  {
    q: 'Do you only work with families in Brampton?',
    a: 'No. The office is in Brampton, but we advise clients across Ontario and the rest of Canada. Most of our work is done by phone, video call and secure e-signature.',
  },
  {
    q: 'Which insurers do you represent?',
    a: 'We place business with more than 23 Canadian carriers, including Canada Life, Manulife, Sun Life, RBC Insurance, BMO Insurance, Desjardins, Empire Life, iA Financial, Beneva, TuGo and Travelance. Because we are independent, we recommend whichever fits you best.',
  },
  {
    q: 'Can you help in Punjabi or Hindi?',
    a: 'Yes. Every conversation, and the walkthrough of your policy wording, can be done in English, Punjabi or Hindi — whichever you are most comfortable making a decision in.',
  },
]

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Hero />

      {/* ── Quote strip ─────────────────────────────────────────────────── */}
      <div className="wrap">
        <div className="quote-strip">
          <div>
            <h3>Not sure where to start?</h3>
            <p>
              Tell us who needs covering and we will come back with two or three real
              options, priced, with the trade-offs explained.
            </p>
          </div>
          <div className="quote-strip-actions">
            <Link href="/contact#quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-ghost">
              <IconPhone />
              Call now
            </a>
          </div>
        </div>
      </div>

      {/* ── Featured products ───────────────────────────────────────────── */}
      <section className="section" id="products">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What we arrange</span>
            <h2>Cover for the moments you cannot plan for</h2>
            <p>
              Seventeen products across insurance and registered savings. Each one is
              placed with the insurer that suits your situation, not the one that pays
              us most.
            </p>
          </Reveal>

          <div className="grid grid-3">
            {FEATURED_PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link href={`/products/${p.slug}`} className="pcard">
                  <div className="pcard-media">
                    <Image
                      src={p.image}
                      alt=""
                      width={800}
                      height={500}
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    <span className="pcard-tag">
                      {CATEGORIES.find((c) => c.key === p.category)?.title}
                    </span>
                  </div>
                  <div className="pcard-body">
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                    <span className="link-arrow">
                      Learn more
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── All products by category ────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The full list</span>
            <h2>Everything under one roof</h2>
            <p>
              From a two-week visitor policy to a lifelong estate plan, you deal with one
              advisor who already knows your file.
            </p>
          </Reveal>

          {CATEGORIES.map((cat, ci) => (
            <div key={cat.key} style={{ marginTop: ci === 0 ? 0 : 44 }}>
              <Reveal className="cat-head">
                <h3>
                  <ProductIcon name={cat.icon} />
                  {cat.title}
                </h3>
                <p>{cat.blurb}</p>
              </Reveal>

              <div className="grid grid-3">
                {productsByCategory(cat.key).map((p, i) => (
                  <Reveal key={p.slug} delay={i * 50}>
                    <Link href={`/products/${p.slug}`} className="scard">
                      <span className="icon-badge">
                        <ProductIcon name={p.icon} />
                      </span>
                      <span>
                        <h3>{p.shortName}</h3>
                        <p>{p.summary}</p>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / why us ──────────────────────────────────────────────── */}
      <section className="section" id="about">
        <div className="wrap split">
          <Reveal className="split-media from-left">
            <div className="brand-panel portrait">
              <Image
                src="/preeti-portrait.png"
                alt={`${SITE.advisor}, licensed insurance and investment advisor`}
                width={501}
                height={498}
                sizes="(max-width: 900px) 60vw, 30vw"
              />
            </div>
            {/* The promise line is carried by the hero here, so this panel takes
                the insurer count instead and leaves the quote to the About page. */}
            <div className="badge-float">
              <strong>23+</strong>
              <span>Canadian insurers compared on every quote</span>
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow">Why families choose us</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.4vw,2.6rem)', marginTop: 14 }}>
              An advisor who explains the wording, not just the price
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Insurance is only worth what it pays when you claim. We read the exclusions
              with you before you sign, so there are no surprises at the moment your family
              can least afford one.
            </p>
            <ul className="checklist">
              {WHY_US.slice(0, 4).map((w) => (
                <li key={w.title}>
                  <IconCheckCircle />
                  <span>
                    <strong>{w.title}.</strong> {w.body}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="btn btn-primary"
              style={{ marginTop: 28 }}
            >
              More about {SITE.advisor}
              <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">How it works</span>
            <h2>Four steps, and we do most of them</h2>
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

      {/* ── Remaining reasons ───────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">What you get</span>
            <h2>More than a quote</h2>
          </Reveal>
          <div className="grid grid-3">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="card">
                  <span className="icon-badge">
                    <ProductIcon name={w.icon} />
                  </span>
                  <h3 style={{ fontSize: '1.1rem' }}>{w.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginTop: 10 }}>
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ────────────────────────────────────────────────────── */}
      <section className="section-tight section-alt">
        <div className="wrap">
          <Reveal className="sec-head center" >
            <span className="eyebrow center">Our partners</span>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)' }}>
              We place business with Canada&rsquo;s leading insurers
            </h2>
          </Reveal>
        </div>
        <PartnerMarquee />
      </section>

      {/* ── Google reviews ──────────────────────────────────────────────── */}
      <GoogleReviews />

      {/* ── Quote form ──────────────────────────────────────────────────── */}
      <section className="section section-alt" id="quote">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">Free, no obligation</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.4vw,2.5rem)', marginTop: 14 }}>
              Tell us what you need covered
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Send the form and we will call you back, usually the same day. If it is
              urgent — a Super Visa deadline or a flight this week — call us directly and
              we will deal with it on the spot.
            </p>

            <div className="aside-contact" style={{ marginTop: 26, borderTop: 'none', paddingTop: 0 }}>
              <a href={CONTACT.phoneHref}>
                <IconPhone />
                {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref}>
                <IconMail />
                {CONTACT.email}
              </a>
              <a href="/contact">
                <IconPin />
                {CONTACT.addressLine}
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap-narrow">
          <Reveal className="sec-head center">
            <span className="eyebrow center">Common questions</span>
            <h2>Before you call</h2>
          </Reveal>
          <Reveal>
            <FaqList items={HOME_FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ── Instagram ───────────────────────────────────────────────────── */}
      <InstagramFeed />

      {/* ── CTA band ────────────────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Let&rsquo;s get your family covered properly</h2>
                <p>
                  A short conversation is usually enough to tell you whether your current
                  coverage is doing its job. There is no cost and no obligation, in
                  English, Punjabi or Hindi.
                </p>
              </div>
              <div className="cta-band-actions">
                <Link href="/contact#quote" className="btn btn-primary">
                  Request a free quote
                  <IconArrow />
                </Link>
                <a href={CONTACT.whatsapp} className="btn btn-light" target="_blank" rel="noopener noreferrer">
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
