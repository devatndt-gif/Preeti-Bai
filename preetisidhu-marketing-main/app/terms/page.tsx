import type { Metadata } from 'next'
import { CONTACT, SITE } from '@/lib/site'
import { LegalBody } from '@/components/legal-body'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms governing use of the ${SITE.legalName} website.`,
  alternates: { canonical: `${SITE.url}/terms` },
}

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Legal</span>
          <h1>Terms &amp; Conditions</h1>
          <p>The terms on which this website is made available to you.</p>
        </div>
      </section>

      <LegalBody>
        <p className="lede">
          By accessing or using this website you agree to these terms. If you do not agree
          with them, please do not use the site.
        </p>

        <h2>Information is general, not advice</h2>
        <p>
          The content on this site is general information about insurance and investment
          products available in Canada. It is not personal financial, insurance, tax or
          legal advice, and it does not take your circumstances into account. Nothing here
          is an offer to sell or a solicitation to buy any product. You should obtain
          advice specific to your situation before acting on anything you read here.
        </p>

        <h2>No contract of insurance</h2>
        <p>
          Product descriptions on this site are summaries. They are not a contract of
          insurance and they do not modify any policy. Coverage, eligibility, benefits,
          exclusions, limitations and premiums are determined solely by the issuing
          insurer and the policy wording actually issued to you. Where anything on this
          site conflicts with a policy document, the policy document prevails.
        </p>

        <h2>Rates and availability</h2>
        <p>
          Any premium or rate shown is an estimate for illustration only and is not a
          guaranteed quotation. Rates depend on underwriting and can change without
          notice. Where a figure shown here differs from an insurer&rsquo;s own quotation
          system, the insurer&rsquo;s figure prevails. Products and features are subject to
          availability and may not be offered in every province or territory.
        </p>

        <h2>Registered plans and government programmes</h2>
        <p>
          Contribution limits, grant rates, eligibility rules and tax treatment for
          registered plans such as the RESP, RRSP, TFSA and FHSA are set by the Government
          of Canada and may change. Immigration requirements, including those for Super
          Visa insurance, are set by Immigration, Refugees and Citizenship Canada and are
          subject to change. Always confirm current requirements before relying on them.
        </p>

        <h2>Intended audience</h2>
        <p>
          This site is intended for residents of Canada and for visitors to Canada. It is
          not directed at residents of any jurisdiction where publishing or making the
          content available would be contrary to local law.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, layout and design of this site, other than third-party logos and
          marks, belong to {SITE.legalName}. Insurer names and logos are the property of
          their respective owners and are shown to identify the carriers with whom we hold
          contracts. You may view and print pages for your own reference, but you may not
          reproduce or republish them commercially without our written permission.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site may link to websites operated by others, including insurers. We do not
          control those sites and are not responsible for their content, availability or
          privacy practices. A link is not an endorsement.
        </p>

        <h2>Availability and limitation of liability</h2>
        <p>
          We work to keep this site accurate and available, but we do not warrant that it
          will be uninterrupted, error-free, or that the information is complete or current
          at any given moment. To the extent permitted by law, we are not liable for any
          loss arising from use of, or reliance on, this site. Nothing in these terms
          limits liability that cannot be limited by law.
        </p>

        <h2>Privacy</h2>
        <p>
          Personal information submitted through this site is handled in accordance with
          our privacy policy.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the Province of Ontario and the federal
          laws of Canada applicable there.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms may be sent to{' '}
          <a href={CONTACT.emailHref}>{CONTACT.email}</a> or {CONTACT.phone}.
        </p>
      </LegalBody>
    </>
  )
}
