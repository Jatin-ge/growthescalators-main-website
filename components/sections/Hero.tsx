'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import CyclingWord from '@/components/ui/CyclingWord'
import Link from 'next/link'

const HERO_STATS = [
  { value: '10,000+', label: 'Campaigns' },
  { value: '₹10Cr+',  label: 'Ad Spend'  },
  { value: '97%',     label: 'Retention' },
  { value: '4.9★',   label: 'Google Rating' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // FIXED: Use gsap.set to hide elements before animating so that during SSR
    // and initial paint the elements are visible (no flash of hidden content),
    // but are immediately hidden once JS runs before the timeline fires
    const targets = [
      '.hero-label',
      '.hero-line-1',
      '.hero-line-2',
      '.hero-sub',
      '.hero-ctas',
      '.hero-stat',
    ]
    gsap.set(targets, { opacity: 0 })

    const ctx = gsap.context(() => {
      // FIXED: Increased delay to 0.3s to ensure the preloader slide-up
      // transition (0.9s) has fully completed before hero elements animate in.
      // Previously delay:0.1 caused elements to animate while still behind
      // the preloader overlay
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.hero-label',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo('.hero-line-1',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('.hero-line-2',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('.hero-sub',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-ctas',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo('.hero-stat',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
    // FIXED: Scope context to sectionRef so class selectors like '.hero-label'
    // only match elements inside this section, preventing cross-section
    // selector collisions if Hero is ever mounted more than once
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-animate="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-20"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,101,0,0.11) 0%, transparent 68%)' }} />
      <div className="absolute bottom-0 left-0 w-[450px] h-[280px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(255,101,0,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[380px] h-[280px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(255,101,0,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        <div className="hero-label mb-8 inline-flex items-center gap-2 px-4 py-1.5"
          style={{ border: '1px solid rgba(255,101,0,0.3)', background: 'rgba(255,101,0,0.06)', borderRadius: '100px' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--orange)' }} />
          <span className="font-outfit text-[11px] tracking-[0.35em] uppercase" style={{ color: 'var(--orange)' }}>
            Your Growth Partner
          </span>
        </div>

        <h1
          className="hero-line-1 font-syne font-extrabold leading-none mb-2"
          style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          We Don&apos;t Just Market.
        </h1>

        <h1
          className="hero-line-2 font-syne font-extrabold leading-none mb-9"
          style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          We <CyclingWord />.
        </h1>

        <p className="hero-sub font-outfit font-light max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'var(--text-muted)' }}>
          10,000+ campaigns run. ₹10Cr+ in ad spend managed. 97% client retention.{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            This isn&apos;t marketing talk — it&apos;s our track record.
          </strong>
        </p>

        <div className="hero-ctas flex flex-wrap items-center justify-center gap-4 mb-16">
          <MagneticButton as="a" href="/contact"
            className="font-outfit font-semibold px-8 py-4 text-sm"
            style={{ background: 'var(--orange)', color: '#fff' }}>
            Start Your Ascent →
          </MagneticButton>
          <Link href="/work"
            className="font-outfit font-medium px-8 py-4 text-sm"
            style={{ border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)' }}>
            See Our Work
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="hero-stat flex flex-col items-center gap-1">
              <span className="font-bebas tracking-wide"
                style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', color: 'var(--text-primary)', lineHeight: 1 }}>
                {stat.value}
              </span>
              <span className="font-outfit text-[10px] uppercase tracking-[0.25em]"
                style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
