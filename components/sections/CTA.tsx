'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import Link from 'next/link'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *', { y: 36, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      data-animate="cta"
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] opacity-10" style={{ background: '#FF6500', top: '-15%', left: '15%', filter: 'blur(100px)', animation: 'blob1 8s ease-in-out infinite', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        <div className="absolute w-[400px] h-[400px] opacity-08" style={{ background: '#FF3D00', bottom: '-15%', right: '10%', filter: 'blur(90px)', animation: 'blob2 10s ease-in-out infinite', borderRadius: '40% 60% 60% 40%' }} />
      </div>

      <div className="cta-content relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <span className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)' }}>
          Let&apos;s Work Together
        </span>

        <h2 className="font-syne font-extrabold leading-none" style={{ fontSize: 'clamp(40px, 8vw, 96px)', color: 'var(--text-primary)', lineHeight: 1.0 }}>
          Ready To Stop<br />
          <span style={{ color: 'var(--orange)' }}>Playing Small?</span>
        </h2>

        <p className="font-outfit font-light text-lg max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
          Book a free 30-minute growth audit. We&apos;ll show you exactly where your brand is leaking money and how to fix it — for free.
        </p>

        <div className="relative mt-2">
          <div className="absolute inset-0 border pointer-events-none" style={{ borderColor: 'var(--orange)', animation: 'pulse-ring 2s ease-out infinite' }} />
          <div className="absolute inset-0 border pointer-events-none" style={{ borderColor: 'var(--orange)', animation: 'pulse-ring 2s ease-out infinite 1s' }} />
          <MagneticButton
            as="a"
            href="/contact"
            className="relative font-outfit font-semibold px-10 py-5 text-base z-10 transition-colors duration-300"
            style={{ background: 'var(--orange)', color: '#06060A' }}
          >
            Claim Your Free Audit →
          </MagneticButton>
        </div>

        <p className="font-outfit font-light text-sm" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          No contracts. No fluff. Just results.
        </p>
      </div>
    </section>
  )
}
