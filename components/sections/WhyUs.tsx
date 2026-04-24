'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Check } from 'lucide-react'

const REASONS = [
  { title: 'Data-First Decisions', desc: 'Every move is backed by analytics. We test, measure, and iterate — no guessing.' },
  { title: 'Full-Funnel Thinking', desc: 'We engineer the entire journey from awareness to purchase — not just one channel.' },
  { title: 'Owned by Results', desc: 'Our contracts are simple: perform or we fix it. No hiding behind vanity metrics.' },
  { title: 'Speed to Market', desc: 'Your strategy is live within 7 days. Startup speed with enterprise precision.' },
  { title: 'Transparent Reporting', desc: 'Real dashboards. Real numbers. Weekly calls. You always know where every rupee goes.' },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-item', { x: -28, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo('.metric-card', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.metrics-panel',
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo('.whyus-heading', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.whyus-heading',
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
      data-animate="why-us"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--orange)' }}>
              Why Us
            </span>
            <h2 className="whyus-heading font-syne font-bold leading-tight mb-12" style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', color: 'var(--text-primary)' }}>
              Why Brands Choose Growth Escalators
            </h2>

            <div className="why-list space-y-6">
              {REASONS.map((r, i) => (
                <div key={i} className="why-item flex gap-4">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,101,0,0.1)', border: '1px solid rgba(255,101,0,0.25)' }}
                  >
                    <Check size={10} style={{ color: 'var(--orange)' }} />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{r.title}</h4>
                    <p className="font-outfit font-light text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: metrics dashboard */}
          <div className="metrics-panel relative">
            <div className="ge-card p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-outfit text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Performance Dashboard</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--orange)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,101,0,0.3)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,101,0,0.12)' }} />
                </div>
              </div>

              <div className="flex items-end gap-1.5 h-28 mb-6">
                {[40, 65, 45, 80, 60, 95, 70, 100, 85, 110, 90, 130].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h * 0.7}%`,
                      background: i === 11 ? 'var(--orange)' : i > 7 ? 'rgba(255,101,0,0.4)' : 'rgba(255,101,0,0.12)',
                    }}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { label: 'ROAS', val: '4.2x', change: '+38%', up: true },
                  { label: 'CTR', val: '3.8%', change: '+21%', up: true },
                  { label: 'CPA', val: '₹180', change: '-14%', up: true },
                ].map((m) => (
                  <div key={m.label} className="metric-card flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <span className="font-outfit text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-syne font-bold" style={{ color: 'var(--text-primary)' }}>{m.val}</span>
                      <span className="font-outfit text-xs" style={{ color: '#4ADE80' }}>{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card absolute -top-5 -right-5 ge-card p-4 hidden lg:block">
              <div className="font-bebas text-3xl" style={{ color: 'var(--orange)' }}>97%</div>
              <div className="font-outfit text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Retention</div>
            </div>
            <div className="metric-card absolute -bottom-5 -left-5 ge-card p-4 hidden lg:block">
              <div className="font-bebas text-3xl" style={{ color: 'var(--orange)' }}>100+</div>
              <div className="font-outfit text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Brands</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
