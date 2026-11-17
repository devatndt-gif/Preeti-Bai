import Image from 'next/image'
import { PARTNERS } from '@/lib/site'

/**
 * Infinite logo strip. The list is rendered twice so the CSS translate of -50%
 * lands exactly on a seam and loops without a jump.
 */
export function PartnerMarquee() {
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <Image
            key={`${p.file}-${i}`}
            src={`/partners/${p.file}`}
            alt={i < PARTNERS.length ? p.name : ''}
            aria-hidden={i >= PARTNERS.length}
            width={p.w}
            height={p.h}
            sizes="180px"
            style={{ height: '44px', width: 'auto' }}
          />
        ))}
      </div>
    </div>
  )
}
