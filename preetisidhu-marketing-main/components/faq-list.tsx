'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/products'
import { IconPlus } from './icons'

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.q}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <IconPlus />
            </button>
            <div className="faq-a" id={`faq-panel-${i}`} role="region">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
