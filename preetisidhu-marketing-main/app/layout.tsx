import { ViewTransition } from 'react'
import type { Metadata, Viewport } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsappFloat } from '@/components/whatsapp-float'
import { PoweredBy } from '@/components/powered-by'
import { SITE, CONTACT } from '@/lib/site'

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} — Super Visa, Life & Travel Insurance in Canada`,
    template: `%s | ${SITE.name} Insurance`,
  },
  description:
    'Independent insurance and investment advice in Brampton, Ontario. Super Visa, visitor, travel, life, critical illness and disability insurance, plus RESP, RRSP, TFSA and FHSA. Service in English, Punjabi and Hindi.',
  keywords: [
    'Super Visa insurance',
    'visitor insurance Canada',
    'travel insurance',
    'life insurance Brampton',
    'critical illness insurance',
    'RESP',
    'RRSP',
    'TFSA',
    'FHSA',
    'insurance advisor Brampton',
    'Punjabi insurance advisor',
  ],
  authors: [{ name: SITE.advisor }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE.url,
    siteName: SITE.legalName,
    title: `${SITE.legalName} — Protecting What Matters Most`,
    description:
      'Super Visa, visitor, travel, life and critical illness insurance, plus RESP, RRSP, TFSA and FHSA. Independent advice from 23+ Canadian insurers.',
    images: [{ url: '/preeti-logo.png', width: 1200, height: 782, alt: SITE.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.legalName}`,
    description: 'Independent insurance and investment advice for Canadian families.',
    images: ['/preeti-logo.png'],
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
  icons: { icon: '/preeti-logo.png', apple: '/preeti-logo.png' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#121316' },
  ],
}

/**
 * Applies the saved (or system) theme while the browser is still parsing the
 * head, so the first paint is already correct. See the Next.js guide on
 * preventing flash before hydration.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("ps-theme");if(!t)t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/preeti-logo.png`,
  image: `${SITE.url}/preeti-logo-square.jpg`,
  description:
    'Independent insurance and investment advisor serving Canadian families with Super Visa, visitor, travel, life, critical illness and disability insurance, and registered savings plans.',
  founder: { '@type': 'Person', name: SITE.advisor },
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    addressCountry: 'CA',
  },
  telephone: '+1-416-427-3232',
  email: CONTACT.email,
  areaServed: { '@type': 'Country', name: 'Canada' },
  availableLanguage: ['English', 'Punjabi', 'Hindi'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSONLD).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {/* Crossfades page content on navigation. The header, footer and the
            floating button stay put, so only the body of the page moves. */}
        <main>
          <ViewTransition enter="page-enter" exit="page-exit">{children}</ViewTransition>
        </main>
        <SiteFooter />
        <PoweredBy />
        <WhatsappFloat />
      </body>
    </html>
  )
}
