'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ALL_TESTIMONIALS } from '@/lib/constants'

const CATEGORY_COLORS: Record<string, string> = {
  'Performance Marketing': '#FF6500',
  'Funnel Marketing':      '#e05500',
  'D2C eCommerce':         '#cc4400',
  'eCommerce':             '#cc4400',
  'SaaS Growth':           '#8b5cf6',
  'SaaS / EdTech':         '#7c3aed',
  'Real Estate':           '#059669',
  'Healthcare':            '#0891b2',
  'Personal Branding':     '#d97706',
  'B2B':                   '#2563eb',
  'Wellness':              '#10b981',
  'F&B / D2C':             '#f59e0b',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? '#FF6500' : 'rgba(255,101,0,0.2)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ background: 'rgba(255,101,0,0.08)', border: '1px solid rgba(255,101,0,0.2)' }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FF6500" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="font-outfit text-[9px] tracking-wider uppercase" style={{ color: 'var(--orange)' }}>
        Verified
      </span>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef   = useRef<HTMLElement>(null)
  const row1Ref      = useRef<HTMLDivElement>(null)
  const row2Ref      = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const row1 = ALL_TESTIMONIALS.slice(0, 8)
  const row2 = ALL_TESTIMONIALS.slice(7)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.test-heading',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef.current)

    const interval = setInterval(() => {
      setActive((i) => (i + 1) % ALL_TESTIMONIALS.length)
    }, 2200)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return
    const cards1 = row1Ref.current.querySelectorAll<HTMLElement>('.t-card')
    const cards2 = row2Ref.current.querySelectorAll<HTMLElement>('.t-card')

    cards1.forEach((card, i) => {
      const isActive = i === active % row1.length
      // FIXED: Added overwrite: 'auto' to prevent tween pile-up. The interval
      // fires every 2200ms and calls gsap.to on every card each tick. Without
      // overwrite, successive calls stack tweens — after a few cycles cards
      // are running 5+ simultaneous conflicting tweens causing scale jank.
      gsap.to(card, {
        scale:   isActive ? 1.03 : 1,
        opacity: isActive ? 1 : 0.55,
        borderColor: isActive ? 'rgba(255,101,0,0.45)' : 'var(--border)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
    cards2.forEach((card, i) => {
      const isActive = i === active % row2.length
      gsap.to(card, {
        scale:   isActive ? 1.03 : 1,
        opacity: isActive ? 1 : 0.55,
        borderColor: isActive ? 'rgba(255,101,0,0.45)' : 'var(--border)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto', // FIXED: same tween accumulation prevention
      })
    })
  }, [active, row1.length, row2.length])

  const renderCard = (t: typeof ALL_TESTIMONIALS[number], idx: number) => (
    <div
      key={t.id}
      className="t-card shrink-0 flex flex-col gap-4 p-6 rounded-sm"
      style={{
        width: '320px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <StarRating rating={t.rating} />
        <VerifiedBadge />
      </div>

      <span
        className="font-outfit text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full self-start"
        style={{
          background: `${CATEGORY_COLORS[t.category] || '#FF6500'}15`,
          color: CATEGORY_COLORS[t.category] || '#FF6500',
          border: `1px solid ${CATEGORY_COLORS[t.category] || '#FF6500'}30`,
        }}
      >
        {t.category}
      </span>

      <div
        className="font-outfit font-semibold text-xs px-3 py-1.5 rounded-sm self-start"
        style={{ background: 'rgba(255,101,0,0.08)', color: 'var(--orange)' }}
      >
        {t.highlight}
      </div>

      <p className="font-outfit font-light text-sm leading-relaxed flex-1"
        style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-xs shrink-0"
          style={{ background: 'linear-gradient(135deg,#FF6500,#FF3D00)', color: '#fff' }}
        >
          {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div className="font-syne font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
            {t.name}
          </div>
          <div className="font-outfit text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t.role}
          </div>
        </div>
        <div className="ml-auto">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill="#4285F4"/>
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      data-animate="testimonials"
      className="py-24 md:py-36 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="test-heading font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4"
              style={{ color: 'var(--orange)' }}>
              Client Reviews
            </span>
            <h2 className="test-heading font-syne font-extrabold leading-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 68px)', color: 'var(--text-primary)' }}>
              Brands That Grew With Us
            </h2>
          </div>
          <div className="test-heading flex items-center gap-3 shrink-0 px-5 py-3 rounded-sm"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill="#4285F4"/>
            </svg>
            <div>
              <div className="font-bebas text-2xl leading-none" style={{ color: 'var(--text-primary)' }}>4.9</div>
              <div className="flex gap-0.5 mt-0.5">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FF6500">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <div className="font-outfit text-[9px] uppercase tracking-widest mt-0.5"
                style={{ color: 'var(--text-muted)' }}>Google Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4 overflow-hidden">
        <div
          ref={row1Ref}
          className="flex gap-4 animate-marquee-left"
          style={{ width: 'max-content', animationDuration: '35s', paddingLeft: '1rem' }}
        >
          {[...row1, ...row1].map((t, i) => renderCard(t, i % row1.length))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-4 animate-marquee-right"
          style={{ width: 'max-content', animationDuration: '40s', paddingLeft: '1rem' }}
        >
          {[...row2, ...row2].map((t, i) => renderCard(t, i % row2.length))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      </div>

      {/* Bottom count */}
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mt-12 flex items-center gap-3">
        <span className="font-bebas text-3xl" style={{ color: 'var(--orange)' }}>
          4,212+
        </span>
        <span className="font-outfit text-sm" style={{ color: 'var(--text-muted)' }}>
          verified client reviews across India · Real brands · Real results
        </span>
      </div>
    </section>
  )
}
