import Image from 'next/image'
import Link from 'next/link'
import { CATEGORIES, productsByCategory } from '@/lib/products'
import { SITE, CONTACT, SOCIAL } from '@/lib/site'
import { IconClock, IconMail, IconPhone, IconPin, SOCIAL_ICONS } from './icons'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/preeti-logo.png"
              alt={SITE.legalName}
              width={4025}
              height={2622}
              sizes="200px"
              style={{ height: '64px', width: 'auto' }}
            />
            <p>
              Independent insurance and investment advice for Canadian families. We
              compare 23+ insurers so you do not have to, and we explain the
              difference in plain language.
            </p>
            <div className="footer-soc">
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

          <div>
            <h4>{CATEGORIES[0].title}</h4>
            <ul className="footer-links">
              {productsByCategory('visitors').map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Life &amp; Savings</h4>
            <ul className="footer-links">
              {[...productsByCategory('life').slice(0, 4), ...productsByCategory('savings')].map(
                (p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`}>{p.shortName}</Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <div className="footer-contact">
              <a href={CONTACT.phoneHref}>
                <IconPhone />
                <span>{CONTACT.phone}</span>
              </a>
              <a href={CONTACT.emailHref}>
                <IconMail />
                <span>{CONTACT.email}</span>
              </a>
              <div>
                <IconPin />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}, {CONTACT.regionLong}
                </span>
              </div>
              <div>
                <IconClock />
                <span>{CONTACT.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="disclaimer">
          Disclaimer: this website is intended for residents of Canada and visitors to
          Canada. Product descriptions are general summaries and are not a contract of
          insurance. Coverage, eligibility, exclusions and premiums are determined solely
          by the issuing insurer and the policy wording. Quoted rates are estimates; where
          a rate shown here differs from the insurer&rsquo;s own quotation software, the
          insurer&rsquo;s figure prevails. Registered plan rules, contribution limits and
          government grants are set by the Government of Canada and may change.
        </p>
      </div>

      <div className="wrap">
        <div className="footer-bottom">
          <span>
            &copy; {year} {SITE.legalName}. All rights reserved.
          </span>
          <nav aria-label="Legal">
            <Link href="/about">About</Link>
            <Link href="/gallery">Offers</Link>
            <Link href="/contact#quote">Contact</Link>
            <Link href="/join-our-team">Careers</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
