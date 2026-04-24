'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CTA from '@/components/sections/CTA'
import Team from '@/components/sections/Team'
import Link from 'next/link'

const TIMELINE = [
  { year: '2021', event: 'Founded in Jaipur with 2 clients and one mission: make every rupee work harder.' },
  { year: '2022', event: 'First ₹1Cr in ad spend managed. Proof that the system works.' },
  { year: '2023', event: '50+ brands served. First enterprise client. Team grows to 5.' },
  { year: '2024', event: '100+ brands. ₹10Cr+ in ad spend. Team of 8. Jaipur\'s fastest-growing growth agency.' },
  { year: '2025', event: 'Expanding beyond Rajasthan. Becoming India\'s go-to growth partner.' },
]

const VALUES = [
  { title: 'Results First', desc: 'We don\'t celebrate effort. We celebrate outcomes. Every strategy is measured against one question: did it grow the business?' },
  { title: 'Radical Transparency', desc: 'You\'ll always know exactly what we\'re doing and why. No black boxes. No guessing. Full visibility, always.' },
  { title: 'Growth is a System', desc: 'We don\'t run one-off campaigns. We build growth machines that compound over time and work while you sleep.' },
  { title: 'Your Brand is Our Brand', desc: 'We treat your business like it\'s ours. Your wins are our wins. Your losses are lessons we fix immediately.' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-content > *', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2,
      })
    }, heroRef.current)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!timelineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
      })
      gsap.fromTo('.value-card', { y: 36, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.values-grid', start: 'top 80%' },
      })
      gsap.fromTo('.about-line', { scaleX: 0 }, {
        scaleX: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-line', start: 'top 85%' },
      })
    }, timelineRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — split layout */}
        <section ref={heroRef} className="pt-36 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className="about-hero-content">
                <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-5" style={{ color: 'var(--orange)' }}>
                  Our Story
                </span>
                <h1 className="font-syne font-extrabold leading-none mb-6" style={{ fontSize: 'clamp(40px, 6.5vw, 82px)', color: 'var(--text-primary)' }}>
                  We Started With<br />One Belief.
                </h1>
                <p className="font-outfit font-light text-xl mb-8" style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
                  That every brand — no matter how small — deserves world-class marketing. Not someday. Right now.
                </p>
                <Link href="/contact" className="inline-block font-outfit font-semibold px-8 py-4 transition-colors duration-300" style={{ background: 'var(--orange)', color: '#06060A' }}>
                  Work With Us →
                </Link>
              </div>

              {/* Right: animated geometric visual */}
              <div className="relative h-80 lg:h-[480px] flex items-center justify-center">
                {/* Rotating rings */}
                {[1, 0.7, 0.45].map((scale, i) => (
                  <div
                    key={i}
                    className="absolute border rounded-full"
                    style={{
                      width: 320 * scale, height: 320 * scale,
                      borderColor: `rgba(255,101,0,${0.08 + i * 0.1})`,
                      animation: `blob${i + 1} ${8 + i * 2}s ease-in-out infinite`,
                    }}
                  />
                ))}
                {/* Orange dot grid */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'var(--orange)',
                      opacity: 0.15 + (i % 4) * 0.1,
                      left: `${20 + (i % 4) * 20}%`,
                      top: `${20 + Math.floor(i / 4) * 20}%`,
                    }}
                  />
                ))}
                {/* Center piece */}
                <div className="w-20 h-20 flex items-center justify-center font-syne font-extrabold text-2xl" style={{ background: 'var(--orange)', color: '#06060A' }}>
                  GE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section ref={timelineRef} className="py-24 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--orange)' }}>Our Journey</span>
            <h2 className="font-syne font-bold mb-14" style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--text-primary)' }}>
              From 2 Clients to 100+ Brands
            </h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[68px] top-0 bottom-0 w-px hidden md:block" style={{ background: 'var(--border)' }} />

              <div className="space-y-10">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="timeline-item flex gap-6 md:gap-10 items-start">
                    <div className="shrink-0 w-16 md:w-[68px] text-right">
                      <span className="font-bebas text-2xl" style={{ color: 'var(--orange)' }}>{item.year}</span>
                    </div>
                    <div className="relative flex-1 ge-card p-5">
                      {/* Dot on line */}
                      <div className="absolute -left-[42px] top-5 w-3 h-3 rounded-full border-2 hidden md:block" style={{ background: 'var(--bg-primary)', borderColor: 'var(--orange)' }} />
                      <p className="font-outfit text-base" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto">
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--orange)' }}>Our Values</span>
            <h2 className="font-syne font-bold mb-14" style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', color: 'var(--text-primary)' }}>
              What We Stand For
            </h2>
            <div className="about-line w-16 h-0.5 mb-14 origin-left" style={{ background: 'var(--orange)' }} />

            <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <div key={i} className="value-card ge-card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="font-bebas text-5xl mb-4 leading-none" style={{ color: 'rgba(255,101,0,0.12)' }}>0{i + 1}</div>
                  <h3 className="font-syne font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <p className="font-outfit font-light text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Jaipur */}
        <section className="py-20 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--orange)' }}>Why Jaipur</span>
            <h2 className="font-syne font-bold mb-6" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', color: 'var(--text-primary)' }}>
              The Pink City. Unexpected Origin. Unmatched Results.
            </h2>
            <p className="font-outfit font-light text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Building a world-class marketing agency in Jaipur wasn&apos;t the conventional choice — it was the smart one. Lower overheads mean we pass genuine value to our clients. A tight, loyal team means every brief is handled with full attention. And a hunger to prove that India-tier-2 cities can produce global-standard work drives everything we do. We&apos;re not from Mumbai or Delhi. We&apos;re from Jaipur. And we&apos;re coming for the top.
            </p>
          </div>
        </section>

        {/* Team — full bios */}
        <Team />

        <CTA />
      </main>
      <Footer />
    </>
  )
}
