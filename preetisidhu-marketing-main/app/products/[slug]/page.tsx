import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FaqList } from '@/components/faq-list'
import { QuoteForm } from '@/components/quote-form'
import { Reveal } from '@/components/reveal'
import {
  IconArrow, IconCheckCircle, IconChevron, IconMail, IconPhone, IconWhatsapp,
  ProductIcon,
} from '@/components/icons'
import { CreativeGrid } from '@/components/creative-grid'
import { creativeForProduct } from '@/lib/creatives'
import {
  CATEGORIES, PRODUCTS, getProduct, relatedProducts,
} from '@/lib/products'
import { CONTACT, SITE } from '@/lib/site'

/** Pre-renders every product page at build time. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<'/products/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) return { title: 'Product not found' }

  const url = `${SITE.url}/products/${product.slug}`
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | ${SITE.name} Insurance`,
      description: product.summary,
      url,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage(props: PageProps<'/products/[slug]'>) {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) notFound()

  const category = CATEGORIES.find((c) => c.key === product.category)
  const related = relatedProducts(product)
  // The campaign graphic for this product, when one has been posted.
  const creative = await creativeForProduct(product.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: product.name,
        serviceType: category?.title,
        description: product.summary,
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'Canada' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: product.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: product.name,
            item: `${SITE.url}/products/${product.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="page-hero has-image">
        <Image src={product.image} alt="" fill sizes="100vw" priority />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <IconChevron style={{ transform: 'rotate(-90deg)' }} />
            <span>{category?.title}</span>
            <IconChevron style={{ transform: 'rotate(-90deg)' }} />
            <span style={{ color: '#fff' }}>{product.shortName}</span>
          </nav>
          <h1>{product.name}</h1>
          <p>{product.summary}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="#get-quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-light">
              <IconPhone />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap prod-layout">
          <div className="prod-body">
            <p className="lede">{product.intro}</p>
            <p>{product.detail}</p>

            <h2>Who this is for</h2>
            <ul className="checklist">
              {product.whoFor.map((w) => (
                <li key={w}>
                  <IconCheckCircle />
                  <span>{w}</span>
                </li>
              ))}
            </ul>

            <h2>What you get</h2>
            <div className="hl-grid">
              {product.highlights.map((h) => (
                <div className="hl" key={h.title}>
                  <h4>
                    <IconCheckCircle />
                    {h.title}
                  </h4>
                  <p>{h.body}</p>
                </div>
              ))}
            </div>

            <h2>Questions we get asked</h2>
            <FaqList items={product.faqs} />
          </div>

          <aside>
            <div className="aside-card">
              <span className="icon-badge">
                <ProductIcon name={product.icon} />
              </span>
              <h3>Talk it through first</h3>
              <p>
                Send your details and we will come back with real numbers, usually the
                same day. No cost, and no obligation to buy.
              </p>
              <Link href="#get-quote" className="btn btn-primary btn-block">
                Request a quote
                <IconArrow />
              </Link>

              <div className="aside-contact">
                <a href={CONTACT.phoneHref}>
                  <IconPhone />
                  {CONTACT.phone}
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <IconWhatsapp />
                  Chat on WhatsApp
                </a>
                <a href={CONTACT.emailHref}>
                  <IconMail />
                  {CONTACT.email}
                </a>
              </div>
            </div>

            {creative && (
              <div className="aside-creative">
                <span className="eyebrow">From our feed</span>
                <CreativeGrid items={[creative]} />
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── Quote form ──────────────────────────────────────────────────── */}
      <section className="section section-alt" id="get-quote">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">{product.shortName}</span>
            <h2 style={{ fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', marginTop: 14 }}>
              Get a {product.shortName.toLowerCase()} quote
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Tell us a little about who needs covering. We will compare the market and
              come back with two or three options worth considering, with the trade-offs
              spelled out.
            </p>
            <ul className="checklist">
              <li>
                <IconCheckCircle />
                <span>Advice and paperwork cost you nothing</span>
              </li>
              <li>
                <IconCheckCircle />
                <span>Available in English, Punjabi and Hindi</span>
              </li>
              <li>
                <IconCheckCircle />
                <span>Most quotes returned the same business day</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <QuoteForm defaultProduct={product.name} />
          </Reveal>
        </div>
      </section>

      {/* ── Related ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">You may also need</span>
            <h2 style={{ fontSize: 'clamp(1.5rem,2.6vw,2rem)' }}>Related cover</h2>
          </Reveal>
          <div className="grid grid-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
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
    </>
  )
}
