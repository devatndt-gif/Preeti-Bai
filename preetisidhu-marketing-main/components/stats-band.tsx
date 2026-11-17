'use client'

import { useEffect, useRef } from 'react'
import { STATS } from '@/lib/site'

/**
 * Counts a number up once its tile scrolls into view.
 *
 * The final value is rendered server-side, so the correct number is shown
 * without JavaScript and to crawlers. The animation is a pure DOM effect — it
 * writes textContent directly rather than round-tripping through state, which
 * avoids a re-render per frame.
 */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') return

    el.textContent = `0${suffix}`
    let frame = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const duration = 1100
        const start = performance.now()

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          // ease-out cubic, so the number settles rather than stopping dead
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = `${Math.round(to * eased)}${suffix}`
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = `${to}${suffix}`
    }
  }, [to, suffix])

  return (
    <strong ref={ref} suppressHydrationWarning>
      {to}
      {suffix}
    </strong>
  )
}

export function StatsBand() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <Counter to={s.value} suffix={s.suffix} />
          <span>{s.label}</span>
          <small>{s.note}</small>
        </div>
      ))}
    </div>
  )
}
