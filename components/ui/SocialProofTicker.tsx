'use client'

import { useEffect, useRef, useState } from 'react'
import { SOCIAL_PROOF_TICKER } from '@/lib/constants'

export default function SocialProofTicker() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % SOCIAL_PROOF_TICKER.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full py-3 flex items-center justify-center gap-3"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
      }}
    >
      <span
        className="font-outfit text-[10px] uppercase tracking-[0.3em] shrink-0"
        style={{ color: 'var(--orange)' }}
      >
        Client Win
      </span>
      <span className="w-px h-3 shrink-0" style={{ background: 'var(--border)' }} />
      <span
        className="font-outfit text-xs"
        style={{
          color: 'var(--text-muted)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {SOCIAL_PROOF_TICKER[index]}
      </span>
    </div>
  )
}
