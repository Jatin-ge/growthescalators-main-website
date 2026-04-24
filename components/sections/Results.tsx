'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import CountUp from '@/components/ui/CountUp'
import { STATS } from '@/lib/constants'

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-block', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          // FIXED: explicit toggleActions so animation doesn't re-play on
          // scroll-back (which would fight the CountUp tween already running)
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo('.results-heading', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.results-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.fromTo('.results-divider', { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.results-divider',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-animate="results"
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(255,101,0,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="results-heading text-center mb-16">
          <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--orange)' }}>
            Results
          </span>
          <h2 className="font-syne font-bold leading-none" style={{ fontSize: 'clamp(28px, 5vw, 60px)', color: 'var(--text-primary)' }}>
            The Numbers Don&apos;t Lie
          </h2>
          <div className="results-divider w-16 h-0.5 mx-auto mt-6 origin-left" style={{ background: 'var(--orange)' }} />
        </div>

        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-block text-center">
              <div
                className="font-bebas leading-none mb-3"
                style={{ fontSize: 'clamp(72px, 13vw, 150px)', color: 'var(--orange)' }}
              >
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.2}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <p
                className="font-outfit text-xs uppercase tracking-widest leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
