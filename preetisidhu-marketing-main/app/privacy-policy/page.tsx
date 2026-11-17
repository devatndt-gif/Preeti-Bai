import type { Metadata } from 'next'
import { CONTACT, SITE } from '@/lib/site'
import { LegalBody } from '@/components/legal-body'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE.legalName} collects, uses, discloses and protects personal information under PIPEDA.`,
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Legal</span>
          <h1>Privacy Policy</h1>
          <p>
            How we collect, use, disclose and protect your personal information, and the
            rights you have over it.
          </p>
        </div>
      </section>

      <LegalBody>
        <p className="lede">
          {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting
          the privacy of the people we advise. This policy explains our practices under
          Canada&rsquo;s Personal Information Protection and Electronic Documents Act
          (PIPEDA) and applicable provincial privacy legislation.
        </p>

        <h2>Information we collect</h2>
        <p>
          We collect only the personal information needed to give you advice and to place
          and service an insurance or investment product. Depending on what you ask us
          for, that may include:
        </p>
        <ul>
          <li>Contact details such as your name, address, phone number and email address</li>
          <li>Date of birth, marital status, dependants and immigration or residency status</li>
          <li>Medical and health history, where an insurer requires it to underwrite an application</li>
          <li>Financial information such as income, assets, liabilities and existing coverage</li>
          <li>Travel dates and destinations, for travel and visitor products</li>
          <li>Beneficiary details you provide for a policy</li>
          <li>
            Technical information collected automatically when you use this website,
            including IP address, browser type, pages viewed and referring URL
          </li>
        </ul>

        <h2>How we use it</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Understand your needs and recommend suitable products</li>
          <li>Obtain quotations from insurers and submit applications on your behalf</li>
          <li>Service your policy, including changes, renewals and claims</li>
          <li>Contact you about your coverage and, where you have agreed, about other products</li>
          <li>Meet our legal, regulatory and record-keeping obligations</li>
        </ul>
        <p>
          We do not sell personal information, and we do not rent or trade contact lists.
        </p>

        <h2>Who we share it with</h2>
        <p>
          To do the work you ask of us, we share information with the insurers and
          financial institutions you apply to, and with their reinsurers, underwriters and
          administrators. We may also share information with:
        </p>
        <ul>
          <li>Managing general agencies through which a contract is held</li>
          <li>Service providers who host our systems, under confidentiality obligations</li>
          <li>Regulators, or anyone else, where disclosure is required or permitted by law</li>
        </ul>

        <h2>Consent</h2>
        <p>
          We collect, use and disclose personal information with your consent, except where
          the law allows or requires otherwise. Submitting an enquiry form or asking us for
          a quotation is consent for us to contact you and to approach insurers on your
          behalf. You may withdraw consent at any time, subject to legal and contractual
          restrictions and reasonable notice. Withdrawing consent may mean we can no longer
          service a policy.
        </p>

        <h2>Safeguards and retention</h2>
        <p>
          We protect personal information with physical, organisational and technological
          safeguards appropriate to its sensitivity, and we restrict access to those who
          need it to do their work. We keep information only as long as necessary for the
          purposes described here or as required by law and insurer record-keeping rules,
          after which it is securely destroyed or anonymised.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This website uses cookies and similar technologies to operate the site, remember
          your display preferences and understand how the site is used. You can block or
          delete cookies in your browser settings; some parts of the site may not work
          correctly if you do. Where we use analytics, it is to understand aggregate usage
          rather than to identify individuals.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask to see the personal information we hold about you, ask us to correct
          anything inaccurate, or ask how it has been used and to whom it has been
          disclosed. We will respond within the timeframes set by law. In limited
          circumstances the law allows us to withhold information; if that happens we will
          tell you why.
        </p>

        <h2>Contact and complaints</h2>
        <p>
          Questions, access requests and complaints should go to our Privacy Officer at{' '}
          <a href={CONTACT.emailHref}>{CONTACT.email}</a> or {CONTACT.phone}, or by post to{' '}
          {CONTACT.street}, {CONTACT.city}, {CONTACT.regionLong}. If you are not satisfied
          with our response, you may contact the Office of the Privacy Commissioner of
          Canada.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The version published on this page
          is the current one, and material changes will be reflected here.
        </p>
      </LegalBody>
    </>
  )
}
