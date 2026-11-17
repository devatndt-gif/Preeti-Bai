import type { ReactNode } from 'react'

/**
 * Shared reading column for the policy pages. Keeps the long-form type rules in
 * one place rather than repeating them per page.
 */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="section">
      <div className="wrap-narrow legal">{children}</div>
      <style>{`
        .legal h2 {
          font-size: 1.4rem;
          margin-top: 40px;
          margin-bottom: 12px;
        }
        .legal p { color: var(--ink-soft); margin-bottom: 14px; }
        .legal p.lede { color: var(--ink-soft); }
        .legal ul { margin: 0 0 18px; padding-left: 4px; }
        .legal li {
          position: relative;
          padding-left: 22px;
          margin-bottom: 9px;
          color: var(--ink-soft);
          font-size: .97rem;
        }
        .legal li::before {
          content: '';
          position: absolute;
          left: 2px;
          top: .65em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--red);
        }
        .legal a { color: var(--red); font-weight: 600; }
        .legal a:hover { text-decoration: underline; }
      `}</style>
    </section>
  )
}
