import Link from 'next/link'
import { IconArrow, IconPhone, ProductIcon } from '@/components/icons'
import { FEATURED_PRODUCTS } from '@/lib/products'
import { CONTACT } from '@/lib/site'

export default function NotFound() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">404</span>
          <h1>We couldn&rsquo;t find that page</h1>
          <p>
            The link may be out of date, or the page may have moved. Here are the products
            people usually come here for.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">
              Back to home
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
        <div className="wrap">
          <div className="grid grid-3">
            {FEATURED_PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="scard">
                <span className="icon-badge">
                  <ProductIcon name={p.icon} />
                </span>
                <span>
                  <h3>{p.shortName}</h3>
                  <p>{p.summary}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
