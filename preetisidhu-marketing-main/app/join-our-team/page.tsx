import Link from 'next/link'
import type { Metadata } from 'next'
import { Reveal } from '@/components/reveal'
import { CareersForm } from '@/components/careers-form'
import { IconArrow, IconCheckCircle, IconPhone, ProductIcon } from '@/components/icons'
import { CONTACT, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Join Our Team',
  description:
    'Build an insurance and investment practice with Preeti Sidhu in Brampton, Ontario. Contracts with 23+ Canadian insurers, mentorship through licensing, and a warm client base across the GTA.',
  alternates: { canonical: `${SITE.url}/join-our-team` },
}

const BENEFITS = [
  {
    icon: 'handshake',
    title: 'Contracts with 23+ insurers',
    body: 'Write business with Canada Life, Manulife, Sun Life, RBC, BMO, Desjardins and more from day one, rather than being tied to a single carrier.',
  },
  {
    icon: 'compass',
    title: 'Mentorship through licensing',
    body: 'Support through LLQP and the provincial licensing process, then supervised case work until you are writing confidently on your own.',
  },
  {
    icon: 'growth',
    title: 'Real earning potential',
    body: 'Competitive commission splits with renewals that accumulate, so the book you build keeps paying after the sale.',
  },
  {
    icon: 'globe',
    title: 'A community that needs you',
    body: 'Serve the South Asian community across the GTA. Punjabi or Hindi is a genuine advantage here, not a nice-to-have.',
  },
  {
    icon: 'bolt',
    title: 'Work on your terms',
    body: 'Full-time, part-time or alongside existing work. Several of our advisors started evenings and weekends while employed elsewhere.',
  },
  {
    icon: 'layers',
    title: 'Systems that do the admin',
    body: 'CRM, quoting tools, e-application and compliance support are provided, so your time goes into clients rather than paperwork.',
  },
]

const LOOKING_FOR = [
  'Licensed life agents (LLQP) looking for better contracts and support',
  'Career changers willing to complete licensing with our mentorship',
  'Anyone fluent in Punjabi, Hindi or Gujarati alongside English',
  'People with a genuine network in their community and the patience to serve it well',
  'Mortgage agents, accountants and realtors wanting to add insurance to their practice',
]

export default function JoinOurTeamPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">Careers</span>
          <h1>Build your own practice, with a team behind you</h1>
          <p>
            We are growing, and we are looking for advisors who would rather explain a
            policy properly than close a sale quickly. Licensed or not yet licensed, if
            that sounds like you, we should talk.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="#apply" className="btn btn-primary">
              Apply now
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
          <Reveal className="sec-head center">
            <span className="eyebrow center">What we offer</span>
            <h2>The support we wish we had starting out</h2>
          </Reveal>
          <div className="grid grid-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className="card">
                  <span className="icon-badge">
                    <ProductIcon name={b.icon} />
                  </span>
                  <h3 style={{ fontSize: '1.1rem' }}>{b.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginTop: 10 }}>
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">Who we are looking for</span>
            <h2 style={{ fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', marginTop: 14 }}>
              You do not need experience. You do need patience.
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              The advisors who do well here are the ones who take the time to understand a
              family before recommending anything. The product knowledge we can teach.
            </p>
            <ul className="checklist">
              {LOOKING_FOR.map((l) => (
                <li key={l}>
                  <IconCheckCircle />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="split-media from-right">
            <div
              className="card"
              style={{ padding: 32, background: 'var(--surface)' }}
            >
              <h3 style={{ fontSize: '1.2rem' }}>How the process works</h3>
              <div className="steps" style={{ gridTemplateColumns: '1fr', marginTop: 20, gap: 20 }}>
                {[
                  ['01', 'Send your details', 'Use the form below or call. A CV is welcome but not required.'],
                  ['02', 'An honest conversation', 'We will walk you through the realities of the role, including the first six months.'],
                  ['03', 'Licensing, if needed', 'We guide you through LLQP and provincial registration.'],
                  ['04', 'Start writing business', 'Contracts are set up, and your first cases are worked alongside a mentor.'],
                ].map(([num, title, body]) => (
                  <div className="step lit" key={num}>
                    <span className="num">{num}</span>
                    <h3 style={{ fontSize: '1rem' }}>{title}</h3>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">Apply</span>
            <h2 style={{ fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', marginTop: 14 }}>
              Tell us about yourself
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Tell us where you are with licensing, the languages you advise in and how
              much time you can give it. We read everything that comes in and reply to all
              of it.
            </p>
            <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: '.93rem' }}>
              Prefer email? Send your CV to{' '}
              <a href={CONTACT.emailHref} style={{ color: 'var(--red)', fontWeight: 600 }}>
                {CONTACT.email}
              </a>{' '}
              with &ldquo;Join the team&rdquo; in the subject line.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <CareersForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
