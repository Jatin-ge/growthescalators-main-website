'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!containerRef.current || !strokeRef.current || !fillRef.current) return
    document.body.style.overflow = 'hidden'
    const strokeEl = strokeRef.current
    const length = strokeEl.getTotalLength()
    gsap.set(strokeEl, { strokeDasharray: length, strokeDashoffset: length })
    gsap.set(fillRef.current, { opacity: 0 })
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      },
    })
    tl.to(strokeEl, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' })
      .to(fillRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.1')
      .to(containerRef.current, { yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.25 })
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ background: '#06060A' }}
    >
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,101,0,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <svg width="140" height="72" viewBox="0 0 140 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path
          ref={strokeRef}
          d="M34 8C18 8 6 20 6 36C6 52 18 64 34 64C44 64 52 59 56 52L56 34L34 34L34 44L44 44C42 49 39 52 34 52C22 52 18 44 18 36C18 28 24 20 34 20C40 20 45 23 48 28L58 22C53 13 44 8 34 8Z M72 8L72 64L116 64L116 53L84 53L84 43L110 43L110 32L84 32L84 19L116 19L116 8Z"
          stroke="#FF6500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={fillRef}
          d="M34 8C18 8 6 20 6 36C6 52 18 64 34 64C44 64 52 59 56 52L56 34L34 34L34 44L44 44C42 49 39 52 34 52C22 52 18 44 18 36C18 28 24 20 34 20C40 20 45 23 48 28L58 22C53 13 44 8 34 8Z M72 8L72 64L116 64L116 53L84 53L84 43L110 43L110 32L84 32L84 19L116 19L116 8Z"
          fill="#FF6500"
          opacity={0}
        />
      </svg>
      <p className="font-outfit text-xs tracking-[0.4em] uppercase relative z-10" style={{ color: 'rgba(255,101,0,0.5)' }}>
        Growth Escalators
      </p>
    </div>
  )
}
