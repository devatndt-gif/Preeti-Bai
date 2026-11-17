'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

/**
 * Fades content up the first time it scrolls into view. Falls back to visible
 * when IntersectionObserver is unavailable, so content is never hidden.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  id,
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  /** Lets a revealed block double as a scroll anchor. */
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${shown ? ' shown' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
