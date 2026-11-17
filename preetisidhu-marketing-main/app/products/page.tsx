import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Reveal } from '@/components/reveal'
import { IconArrow, ProductIcon } from '@/components/icons'
import { CATEGORIES, FEATURED_PRODUCTS, productsByCategory } from '@/lib/products'
import { CONTACT, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Insurance & Investment Products',
  description:
    'Super Visa, visitor, travel and student insurance; life, critical illness, disability, no-medical and mortgage cover; drug and dental and group benefits; RESP, RRSP, TFSA and FHSA.',
  alternates: { canonical: `${SITE.url}/products` },
}

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Products</span>
          <h1>Insurance and investments, all in one place</h1>
          <p>
            Seventeen products across four families of cover. Whichever you start with,
            you deal with the same advisor who already knows your file.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow center">Most requested</span>
            <h2>Where most families start</h2>
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

      {CATEGORIES.map((cat, ci) => (
        <section
          key={cat.key}
          className={ci % 2 === 0 ? 'section section-alt' : 'section'}
        >
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{cat.title}</span>
              <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.1rem)' }}>{cat.blurb}</h2>
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
        </section>
      ))}

      <section className="section-tight" style={{ paddingBottom: 'clamp(56px,8vw,104px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Still not sure which one you need?</h2>
                <p>
                  That is the normal starting point. Tell us what you are worried about
                  and we will tell you which product actually addresses it.
                </p>
              </div>
              <div className="cta-band-actions">
                <Link href="/contact#quote" className="btn btn-primary">
                  Ask us
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
