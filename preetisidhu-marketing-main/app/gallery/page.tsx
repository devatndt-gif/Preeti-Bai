import Link from 'next/link'
import type { Metadata } from 'next'
import { CreativeGrid } from '@/components/creative-grid'
import { Reveal } from '@/components/reveal'
import { IconArrow, IconInstagram, IconPhone } from '@/components/icons'
import { getCreatives } from '@/lib/creatives'
import { INSTAGRAM } from '@/lib/social'
import { CONTACT, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Offers and campaign graphics',
  description:
    'Current insurance offers and explainers from Preeti Sidhu Insurance and Investments — mortgage, term life, critical illness and travel cover, with the detail behind every graphic.',
  alternates: { canonical: `${SITE.url}/gallery` },
}

export default async function GalleryPage() {
  const creatives = await getCreatives()

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Offers &amp; explainers</span>
          <h1>What we are posting</h1>
          <p>
            Every graphic below links to the product behind it. Premiums shown are
            illustrations for the age and health class named on the artwork — yours is
            confirmed by the insurer once an application is underwritten.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {creatives.length > 0 ? (
            <Reveal>
              <CreativeGrid items={creatives} />
            </Reveal>
          ) : (
            <Reveal>
              <p className="lede" style={{ textAlign: 'center' }}>
                Nothing posted here yet. Follow along on Instagram for the latest, or
                call for a quote today.
              </p>
            </Reveal>
          )}

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 40,
            }}
          >
            <Link href="/contact#quote" className="btn btn-primary">
              Get a free quote
              <IconArrow />
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-ghost">
              <IconPhone />
              {CONTACT.phone}
            </a>
            <a
              className="btn btn-ghost"
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />@{INSTAGRAM.handle}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
