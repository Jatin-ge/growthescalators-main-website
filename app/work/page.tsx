'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CTA from '@/components/sections/CTA'
import { CASE_STUDIES } from '@/lib/constants'

const FILTERS = ['All', 'Performance', 'Social', 'Web', 'Branding', 'Funnels']

const TAG_FILTER_MAP: Record<string, string[]> = {
  All: [],
  Performance: ['Performance Marketing', 'Creative Strategy'],
  Social: ['Social Media Marketing'],
  Web: ['Web Development', 'SEO'],
  Branding: ['Branding'],
  Funnels: ['Funnel Marketing', 'WhatsApp Automation', 'B2B Funnels', 'Email Automation', 'Funnel Optimisation'],
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((cs) =>
        cs.tags.some((tag) => TAG_FILTER_MAP[activeFilter]?.some((f) => tag.includes(f)))
      )

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-hero-content > *', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2,
      })
    }, heroRef.current)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.case-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      })
    }, gridRef.current)
    return () => ctx.revert()
  }, [activeFilter])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="pt-36 pb-20 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto work-hero-content">
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-5" style={{ color: 'var(--orange)' }}>
              Case Studies
            </span>
            <h1 className="font-syne font-extrabold leading-none mb-5" style={{ fontSize: 'clamp(44px, 8vw, 100px)', color: 'var(--text-primary)' }}>
              Work That Speaks<br />For Itself
            </h1>
            <p className="font-outfit font-light text-xl max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              Results are the only language we speak. Here&apos;s proof.
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="px-6 md:px-12 lg:px-24 pb-6" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="relative font-outfit text-sm px-5 py-2 transition-all duration-300"
                  style={{
                    background: activeFilter === f ? 'var(--orange)' : 'var(--bg-card)',
                    color: activeFilter === f ? '#06060A' : 'var(--text-muted)',
                    border: `1px solid ${activeFilter === f ? 'var(--orange)' : 'var(--border-subtle)'}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies grid */}
        <section className="px-6 md:px-12 lg:px-24 pb-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {filtered.map((cs) => (
                <div key={cs.id} className="case-card ge-card p-8 group hover:-translate-y-1 transition-transform duration-300">
                  {/* Top bar */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-syne font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                        {cs.name}
                      </h3>
                      <span
                        className="font-outfit text-[10px] uppercase tracking-widest px-2 py-1"
                        style={{ color: 'var(--orange)', background: 'rgba(255,101,0,0.08)' }}
                      >
                        {cs.industry}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-syne font-bold shrink-0" style={{ background: cs.gradient, fontSize: 14, color: '#F0EDE8' }}>
                      {cs.name[0]}
                    </div>
                  </div>

                  {/* Challenge / Solution */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="font-outfit text-[10px] uppercase tracking-widest block mb-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Challenge</span>
                      <p className="font-outfit text-sm" style={{ color: 'var(--text-muted)' }}>{cs.challenge}</p>
                    </div>
                    <div>
                      <span className="font-outfit text-[10px] uppercase tracking-widest block mb-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Solution</span>
                      <p className="font-outfit text-sm" style={{ color: 'var(--text-muted)' }}>{cs.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {cs.results.map((r, i) => {
                      const displayVal = r.from ? `${r.from}→${r.to}` : (r.value ?? r.metric)
                      return (
                        <div key={i} className="p-3 text-center" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                          <div className="font-bebas text-xl leading-none mb-1" style={{ color: 'var(--orange)' }}>
                            {displayVal}
                          </div>
                          <div className="font-outfit text-[10px] uppercase tracking-wider leading-tight" style={{ color: 'var(--text-muted)' }}>
                            {r.metric}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="font-outfit text-[10px] uppercase tracking-wider px-2 py-1" style={{ color: 'var(--orange)', border: '1px solid rgba(255,101,0,0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="font-outfit text-sm transition-colors duration-300" style={{ color: 'var(--orange)' }}>
                    Read Full Case Study →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="py-12 px-6 md:px-12 text-center" style={{ background: 'var(--bg-secondary)' }}>
          <p className="font-outfit text-sm" style={{ color: 'var(--text-muted)' }}>
            Trusted by <strong style={{ color: 'var(--text-primary)' }}>100+ brands</strong> across India.{' '}
            <strong style={{ color: 'var(--text-primary)' }}>₹10Cr+</strong> in ad spend managed.{' '}
            <strong style={{ color: 'var(--text-primary)' }}>10,000+</strong> campaigns run.
          </p>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
