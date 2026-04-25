'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'

/* ─── Data ──────────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    num: '01',
    title: 'Performance Marketing',
    copy: 'Meta, Google, YouTube — wherever your customers live online, we own that space for you.',
    copyItalic: 'We\'ve managed ₹10Cr+ in ad spend. Every rupee tracked. Every campaign optimised. Zero guesswork.',
    badge: 'Avg. 30% CPL reduction',
    stats: [
      { val: '₹10Cr+', label: 'Ad Spend' },
      { val: '30%',    label: 'CPL Reduction' },
      { val: '2.5x',   label: 'ROAS Growth' },
    ],
    featured: true,
    iconKey: 'perf',
  },
  {
    num: '02',
    title: 'Personal Branding',
    copy: 'Your face is your brand. We make sure the internet knows exactly who you are — and why you matter.',
    badge: '400% follower growth',
    featured: false,
    iconKey: 'brand',
  },
  {
    num: '03',
    title: 'Funnel Marketing',
    copy: 'Every touchpoint engineered. Cold stranger to loyal buyer, fully automated.',
    badge: '3.2x lead-to-sale conversion',
    featured: false,
    iconKey: 'funnel',
  },
  {
    num: '04',
    title: 'Website Development',
    copy: 'Fast. Conversion-optimised. Built to rank, built to sell, built to last.',
    badge: '67% faster page speed',
    featured: false,
    iconKey: 'web',
  },
  {
    num: '05',
    title: 'Social Media Marketing',
    copy: 'Content that stops the scroll. Strategy that builds the audience. Consistency that builds empires.',
    badge: '300% more engagement',
    featured: false,
    iconKey: 'social',
  },
  {
    num: '06',
    title: 'Branding & Identity',
    copy: 'Visual identity that commands attention and builds lasting brand equity across every touchpoint.',
    badge: '100+ identities delivered',
    featured: false,
    iconKey: 'identity',
  },
  {
    num: '07',
    title: 'SEO',
    copy: 'Rank for what your customers are already searching. Own the SERP, own the market.',
    badge: 'Page 1 in 4 months',
    featured: false,
    iconKey: 'seo',
  },
]

/* ─── Animated SVG Icons ─────────────────────────────────────────── */
function IconPerf({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline
        points="3,17 8,11 13,14 21,5"
        style={{
          strokeDasharray: 32,
          strokeDashoffset: hovered ? 0 : 32,
          transition: 'stroke-dashoffset 0.6s ease',
        }}
      />
      <polyline points="16,5 21,5 21,10" />
    </svg>
  )
}

function IconBrand({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <circle
        cx="12" cy="8" r="7"
        style={{
          opacity: hovered ? 1 : 0,
          strokeDasharray: 44,
          strokeDashoffset: hovered ? 0 : 44,
          transition: 'stroke-dashoffset 0.5s ease, opacity 0.3s ease',
        }}
      />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

function IconFunnel({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round">
      <path d="M3 4h18l-7 8v7l-4-2v-5Z" />
      <circle
        cx="12" cy="19" r="1.2"
        fill="var(--orange)"
        style={{
          transform: hovered ? 'translateY(0px)' : 'translateY(-6px)',
          opacity: hovered ? 1 : 0,
          transition: 'transform 0.4s ease 0.1s, opacity 0.3s ease',
        }}
      />
    </svg>
  )
}

function IconWeb({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round">
      {/* FIX: was wrapped in <span> which is invalid inside <svg> and caused
          a server/client hydration mismatch. SVG <g> is the valid grouping. */}
      <g>
        <polyline
          points="16,18 22,12 16,6"
          style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        />
        <polyline
          points="8,6 2,12 8,18"
          style={{ transform: hovered ? 'translateX(-3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        />
        <line x1="19" y1="12" x2="5" y2="12" strokeOpacity="0.4" />
      </g>
    </svg>
  )
}

function IconSocial({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line
        x1="8.59" y1="13.51" x2="15.42" y2="17.49"
        style={{
          strokeDasharray: 8,
          strokeDashoffset: hovered ? 0 : 8,
          transition: 'stroke-dashoffset 0.35s ease',
        }}
      />
      <line
        x1="15.41" y1="6.51" x2="8.59" y2="10.49"
        style={{
          strokeDasharray: 8,
          strokeDashoffset: hovered ? 0 : 8,
          transition: 'stroke-dashoffset 0.35s ease 0.1s',
        }}
      />
    </svg>
  )
}

function IconIdentity({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
      <polygon
        points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
        style={{
          transform: hovered ? 'rotate(30deg)' : 'rotate(0deg)',
          transformOrigin: '12px 12px',
          transition: 'transform 0.5s ease',
        }}
      />
      <polygon
        points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'rotate(-15deg)' : 'rotate(0deg)',
          transformOrigin: '12px 12px',
          transition: 'transform 0.5s ease, opacity 0.3s ease',
        }}
      />
    </svg>
  )
}

function IconSEO({ hovered }: { hovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line
        x1="21" y1="21" x2="16.65" y2="16.65"
        style={{
          transform: hovered ? 'translateX(2px) translateY(-2px)' : 'translateX(0) translateY(0)',
          transition: 'transform 0.3s ease',
        }}
      />
    </svg>
  )
}

const ICON_MAP: Record<string, React.ComponentType<{ hovered: boolean }>> = {
  perf: IconPerf,
  brand: IconBrand,
  funnel: IconFunnel,
  web: IconWeb,
  social: IconSocial,
  identity: IconIdentity,
  seo: IconSEO,
}

/* ─── Spotlight hook ─────────────────────────────────────────────── */
function useSpotlight(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
}

/* ─── Card component ─────────────────────────────────────────────── */
function ServiceCard({
  s,
  spotlightSize = 300,
}: {
  s: typeof SERVICES_DATA[0]
  spotlightSize?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  useSpotlight(cardRef)
  const Icon = ICON_MAP[s.iconKey]

  return (
    <div
      ref={cardRef}
      className="service-card relative overflow-hidden flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 36,
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(255,101,0,0.45)' : 'var(--border)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(255,101,0,0.08)'
          : '0 2px 20px rgba(0,0,0,0.06)',
        cursor: 'default',
        ['--mouse-x' as string]: '50%',
        ['--mouse-y' as string]: '50%',
      }}
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 16,
          background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x) var(--mouse-y), rgba(255,101,0,0.07), transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 18,
          height: 18,
          borderTop: '2px solid var(--orange)',
          borderRight: '2px solid var(--orange)',
          borderRadius: '0 4px 0 0',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Background number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: s.featured ? 'auto' : 12,
          bottom: s.featured ? 24 : 'auto',
          right: s.featured ? 24 : 16,
          fontFamily: 'var(--font-bebas)',
          fontSize: s.featured ? 180 : 80,
          lineHeight: 1,
          color: 'var(--text-primary)',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        {s.num}
      </div>

      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(255,101,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon hovered={hovered} />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-syne font-bold relative z-10"
        style={{
          fontSize: s.featured ? 'clamp(20px,2.2vw,28px)' : 'clamp(16px,1.6vw,20px)',
          color: 'var(--text-primary)',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {s.title}
      </h3>

      {/* Copy */}
      <p
        className="font-outfit font-light relative z-10"
        style={{
          fontSize: 14,
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          marginBottom: s.featured ? 10 : 20,
        }}
      >
        {s.copy}
      </p>

      {/* Featured italic sub-copy */}
      {s.featured && s.copyItalic && (
        <p
          className="font-outfit relative z-10"
          style={{
            fontSize: 13,
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: 24,
            opacity: 0.85,
          }}
        >
          {s.copyItalic}
        </p>
      )}

      {/* Featured micro-stats */}
      {s.featured && s.stats && (
        <div
          className="relative z-10 flex gap-6 mb-6"
          style={{
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
          }}
        >
          {s.stats.map((st) => (
            <div key={st.label} className="flex flex-col gap-0.5">
              <span
                className="font-bebas"
                style={{ fontSize: 28, color: 'var(--orange)', lineHeight: 1 }}
              >
                {st.val}
              </span>
              <span
                className="font-outfit"
                style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}
              >
                {st.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Badge + Arrow row */}
      <div className="relative z-10 flex items-end justify-between mt-4">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,101,0,0.1)',
            border: '1px solid rgba(255,101,0,0.2)',
            borderRadius: 999,
            padding: '4px 14px',
            color: 'var(--orange)',
            fontSize: 12,
            fontFamily: 'var(--font-outfit)',
            fontWeight: 500,
          }}
        >
          {s.badge}
        </div>

        {/* Arrow */}
        <span
          className="font-outfit font-medium"
          style={{
            fontSize: 13,
            color: 'var(--orange)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          Explore →
        </span>
      </div>
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────────────── */
export default function Services() {
  const sectionRef   = useRef<HTMLElement>(null)
  // FIXED: Use a ref for the header element so the ScrollTrigger trigger is
  // a DOM node, not a class string. Class-string selectors inside gsap.context
  // are scoped to the context root, but if the component ever remounts a
  // stale trigger can match the wrong element. A ref is always unambiguous.
  const headerRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // ── Header: single ScrollTrigger, chained timeline ──────────
      const headerTl = gsap.timeline({
        scrollTrigger: {
          // FIXED: Use ref node instead of '.svc-header' class selector to
          // avoid matching a stale or sibling element on remount
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none', // FIXED: explicit, replaces once:true
          invalidateOnRefresh: true,
        },
      })
      headerTl
        .fromTo('.svc-label',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
        .fromTo('.svc-line1',
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.15'
        )
        .fromTo('.svc-line2',
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('.svc-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.65, ease: 'power3.inOut' },
          '-=0.3'
        )
        .fromTo('.svc-subtext',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )

      // ── Cards: each triggers on its own scroll position ─────────
      sectionRef.current!.querySelectorAll<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
            delay: i === 0 ? 0 : (i % 3) * 0.08,
          }
        )
      })
    }, sectionRef.current)
    return () => ctx.revert()
  }, [])

  const featured = SERVICES_DATA[0]
  const row2 = SERVICES_DATA.slice(2, 5)   // Funnel, Web, Social
  const sideCard = SERVICES_DATA[1]         // Personal Branding (tall right)
  const row3 = SERVICES_DATA.slice(5, 7)   // Branding, SEO

  return (
    <section
      id="services"
      ref={sectionRef}
      data-animate="services"
      className="py-20 md:py-28 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="svc-header mb-10 md:mb-14">

          {/* Label + divider row */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="svc-label font-outfit"
              style={{
                fontSize: 10,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                whiteSpace: 'nowrap',
              }}
            >
              What We Do
            </span>
            <div
              className="svc-divider flex-1"
              style={{
                height: 1,
                background: 'linear-gradient(to right, var(--orange), transparent)',
                transformOrigin: 'left center',
                maxWidth: 280,
              }}
            />
          </div>

          {/* Heading + subtext side-by-side on desktop */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              {/* Line 1 — clip reveal */}
              <div style={{ overflow: 'hidden', lineHeight: 1 }}>
                <h2
                  className="svc-line1 font-syne font-extrabold"
                  style={{
                    fontSize: 'clamp(36px, 5.5vw, 78px)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    display: 'block',
                  }}
                >
                  Seven Weapons.
                </h2>
              </div>
              {/* Line 2 — clip reveal, orange accent */}
              <div style={{ overflow: 'hidden', lineHeight: 1 }}>
                <h2
                  className="svc-line2 font-syne font-extrabold"
                  style={{
                    fontSize: 'clamp(36px, 5.5vw, 78px)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    display: 'block',
                    WebkitTextStroke: '1.5px var(--orange)',
                    color: 'transparent',
                  }}
                >
                  One Mission.
                </h2>
              </div>
            </div>

            {/* Subtext */}
            <p
              className="svc-subtext font-outfit font-light"
              style={{
                fontSize: 13.5,
                color: 'var(--text-muted)',
                maxWidth: 210,
                lineHeight: 1.75,
                paddingBottom: 6,
              }}
            >
              Every service is a growth lever. Pull the right ones and your brand stops growing — it compounds.
            </p>
          </div>
        </div>

        {/* ── Desktop Grid ── */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
          }}
        >
          {/* Row 1: Featured (8 cols) + Personal Branding (4 cols) */}
          <div style={{ gridColumn: 'span 8' }}>
            <ServiceCard s={featured} spotlightSize={500} />
          </div>
          <div style={{ gridColumn: 'span 4' }}>
            <ServiceCard s={sideCard} />
          </div>

          {/* Row 2: 3 equal cards (4 cols each) */}
          {row2.map((s) => (
            <div key={s.num} style={{ gridColumn: 'span 4' }}>
              <ServiceCard s={s} />
            </div>
          ))}

          {/* Row 3: 2 cards (6 cols each) */}
          {row3.map((s) => (
            <div key={s.num} style={{ gridColumn: 'span 6' }}>
              <ServiceCard s={s} />
            </div>
          ))}
        </div>

        {/* ── Mobile: single column ── */}
        <div className="md:hidden flex flex-col gap-4">
          {SERVICES_DATA.map((s) => (
            <ServiceCard key={s.num} s={s} />
          ))}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 40,
          }}
        >
          <div>
            <p
              className="font-syne font-bold"
              style={{
                fontSize: 'clamp(18px, 2vw, 26px)',
                color: 'var(--text-primary)',
                marginBottom: 6,
              }}
            >
              Not sure which service fits your brand?
            </p>
            <p
              className="font-outfit font-light"
              style={{ fontSize: 14, color: 'var(--text-muted)' }}
            >
              Let&apos;s map your growth together.
            </p>
          </div>

          <MagneticButton
            as="a"
            href="/contact"
            className="font-outfit font-semibold text-sm px-7 py-4 shrink-0 md:self-auto self-stretch text-center"
            style={{ background: 'var(--orange)', color: '#fff' }}
          >
            Book a Free Strategy Call →
          </MagneticButton>
        </div>

      </div>
    </section>
  )
}
