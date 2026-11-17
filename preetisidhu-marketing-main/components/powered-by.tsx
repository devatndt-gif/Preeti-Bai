import Image from 'next/image'
import { ProductIcon } from './icons'
import { getBrandLogo } from '@/lib/brand-logos'
import { POWERED_BY } from '@/lib/site'

/**
 * Credit bar beneath the footer. The agency's service on the left, the two
 * agency wordmarks on the right against a tinted wedge.
 *
 * Each wordmark shows the real logo when a file exists in `public/brand/`, and
 * the brand name set in type until one does.
 */
export async function PoweredBy() {
  const brands = await Promise.all(
    POWERED_BY.brands.map(async (b) => ({ ...b, logo: await getBrandLogo(b.slug) }))
  )

  return (
    <aside className="powered" aria-label="Powered by">
      <div className="wrap powered-inner">
        <span className="powered-label">{POWERED_BY.label}</span>

        <ul className="powered-services">
          {POWERED_BY.services.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                <ProductIcon name={s.icon} aria-hidden="true" />
                <span>
                  <strong>{s.name}</strong>
                  <small>{s.tagline}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="powered-brands">
          {brands.map((b) => {
            const mark = b.logo ? (
              <Image
                src={b.logo.src}
                alt={b.name}
                width={b.logo.width}
                height={b.logo.height}
                sizes="180px"
              />
            ) : (
              <span className="powered-wordmark">{b.name}</span>
            )
            return b.href ? (
              <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
                {mark}
              </a>
            ) : (
              <span key={b.name}>{mark}</span>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
