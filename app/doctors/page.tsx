'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import MagneticButton from '@/components/ui/MagneticButton'
import VerticalVideoTestimonials from '@/components/sections/VerticalVideoTestimonials'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import { doctorTestimonials } from '@/components/data/doctorTestimonials'

const TRUST_ITEMS = [
  '220% APPOINTMENT BOOKINGS ↑',
  'FULLY BOOKED 3 WEEKS OUT',
  '12 INBOUND CONSULTS / MONTH',
  '5x WALK-INS FROM LOCAL ADS',
  'CPL ₹420 → ₹88',
  '40 MEMBERSHIPS SOLD IN 30 DAYS',
]

const HERO_STATS = [
  { value: '220%', label: 'Avg. booking growth' },
  { value: '5x', label: 'More walk-ins' },
  { value: '₹88', label: 'Avg. cost per lead' },
  { value: '90 days', label: 'To full calendar' },
]

const PROBLEMS = [
  {
    title: 'Empty afternoon OPD slots',
    body: 'Mornings are packed, afternoons are dead. You\'re paying full staff cost for half a day of patients.',
  },
  {
    title: 'Word-of-mouth has plateaued',
    body: 'Referrals are great — until they cap out. New patients in your area don\'t even know your clinic exists.',
  },
  {
    title: 'You tried Meta ads. They flopped.',
    body: 'Either the agency burned ₹50K with nothing to show, or the leads were tyre-kickers who never showed up.',
  },
  {
    title: 'The clinic next door is everywhere',
    body: 'They\'re on Instagram, on Google Maps reviews, on local searches. You\'re invisible.',
  },
]

const SYSTEM_STEPS = [
  {
    number: '01',
    title: 'Local Patient Acquisition Engine',
    body:
      'Hyper-targeted Meta and Google ads aimed at people within 5–10 km of your clinic actively searching for your specialty. Every rupee tracked to a booked appointment.',
    proof: 'Avg. CPL ₹88. 4–6× appointment volume in 90 days.',
  },
  {
    number: '02',
    title: 'WhatsApp & Call Booking Funnel',
    body:
      'Leads land on a clean booking page, get an instant WhatsApp confirmation, and a reminder before their slot. We cut no-shows in half.',
    proof: 'Show-up rate from 38% → 78% on average.',
  },
  {
    number: '03',
    title: 'Doctor Personal Brand',
    body:
      'Reels, LinkedIn posts, and short explainers featuring you. Patients trust faces, not logos. This is what fills your OPD without paid ads.',
    proof: '0 → 8K+ followers and 10+ inbound consults/month.',
  },
  {
    number: '04',
    title: 'Reviews & Local SEO',
    body:
      'Google Business profile optimisation, an automated review-collection system, and local SEO so you rank when people search "best [specialty] near me".',
    proof: '4.9★ rating average. 3× more profile views.',
  },
]

const FOR_WHOM = [
  'Multispeciality clinics & hospitals',
  'Dental clinics & dental surgeons',
  'Dermatologists & aesthetic practices',
  'IVF & fertility centres',
  'Orthopaedic & physio clinics',
  'Paediatric & women\'s health clinics',
  'Wellness, ayurveda & physio studios',
  'Diagnostic centres',
]

const FAQS = [
  {
    q: 'How quickly will my OPD volume actually go up?',
    a: 'Most clinics see qualified appointment requests within the first 7–10 days of going live. The full system — ads, funnel, follow-up, reviews — typically hits scale by day 60–90. We share weekly numbers, so you\'re never guessing.',
  },
  {
    q: 'Will the leads be the right kind of patients?',
    a: 'Yes. We don\'t chase cheap clicks. Targeting is built around procedure-specific intent, location, and demographic. We can also gate enquiries with qualification questions so your front desk only deals with serious bookings.',
  },
  {
    q: 'Is this compliant with medical advertising guidelines?',
    a: 'Every creative we ship is reviewed against NMC and MCI guidelines — no false claims, no comparative advertising, no patient-data misuse. We\'ve run compliant campaigns for 20+ healthcare clients.',
  },
  {
    q: 'What about my staff handling all these new enquiries?',
    a: 'Our funnel automates the first 3 touchpoints (instant WhatsApp confirmation, booking link, reminder). Your team only steps in once a patient is genuinely ready to book. Most clinics handle the new volume with their existing front desk.',
  },
  {
    q: 'Do I need a website before starting?',
    a: 'No. We build a high-converting landing page tuned for your speciality as part of onboarding. If you already have a site, we keep it and bolt the funnel onto it.',
  },
  {
    q: 'What does it cost?',
    a: 'It depends on your city, specialty, and current setup. We quote a flat monthly retainer (no hidden fees) plus your ad budget. The free clinic audit gives you exact numbers tailored to your practice.',
  },
]

export default function DoctorsPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.set(['.doc-label', '.doc-h1', '.doc-h2', '.doc-sub', '.doc-ctas', '.doc-stat'], {
        opacity: 0,
      })
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo('.doc-label', { y: 16 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.doc-h1', { y: 36 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.doc-h2', { y: 36 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo('.doc-sub', { y: 20 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .fromTo('.doc-ctas', { y: 20 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.35')
        .fromTo(
          '.doc-stat',
          { y: 16 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: 'power3.out' },
          '-=0.3',
        )

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          },
        )
      })
    }, sectionRef.current)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main ref={sectionRef}>
        {/* HERO */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-24 pb-12"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.13) 0%, transparent 68%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[450px] h-[280px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 0% 100%, rgba(108,99,255,0.10) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
            <div
              className="doc-label mb-7 inline-flex items-center gap-2 px-4 py-1.5"
              style={{
                border: '1px solid rgba(255,107,53,0.30)',
                background: 'rgba(255,107,53,0.06)',
                borderRadius: '100px',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--orange)' }}
              />
              <span
                className="font-outfit text-[11px] tracking-[0.35em] uppercase"
                style={{ color: 'var(--orange)' }}
              >
                Built for Doctors & Clinics
              </span>
            </div>

            <h1
              className="doc-h1 font-syne font-extrabold leading-[1.02] mb-3"
              style={{
                fontSize: 'clamp(32px, 5.5vw, 72px)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              More OPD. More Walk-ins.
            </h1>

            <h1
              className="doc-h2 font-syne font-extrabold leading-[1.02] mb-8"
              style={{
                fontSize: 'clamp(32px, 5.5vw, 72px)',
                letterSpacing: '-0.02em',
                color: 'var(--orange)',
              }}
            >
              Without Begging For Referrals.
            </h1>

            <p
              className="doc-sub font-outfit font-light max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'var(--text-muted)' }}
            >
              We help clinics, hospitals and consultants{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                fill empty OPD slots
              </strong>
              , triple walk-ins, and build a personal brand that brings patients in on autopilot —
              all from your local catchment.
            </p>

            <div className="doc-ctas flex flex-wrap items-center justify-center gap-4 mb-14">
              <MagneticButton
                as="a"
                href="/contact"
                className="font-outfit font-semibold px-8 py-4 text-sm"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                Book A Free Clinic Audit →
              </MagneticButton>
              <Link
                href="#video-testimonials"
                className="font-outfit font-medium px-8 py-4 text-sm"
                style={{
                  border: '1.5px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                Watch Doctor Stories
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="doc-stat flex flex-col items-center gap-1">
                  <span
                    className="font-bebas tracking-wide"
                    style={{
                      fontSize: 'clamp(22px, 2.4vw, 30px)',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-outfit text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section
          className="py-5 overflow-hidden"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
          }}
        >
          <MarqueeStrip items={TRUST_ITEMS} speed={28} direction="left" separator="·" />
        </section>

        {/* PROBLEM SECTION */}
        <section
          className="py-24 md:py-32 px-6 md:px-12"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="max-w-6xl mx-auto" data-reveal>
            <div className="text-center mb-14 md:mb-20">
              <span
                className="font-outfit text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'var(--orange)' }}
              >
                The Honest Truth
              </span>
              <h2
                className="font-syne font-extrabold mt-4 leading-[1.05]"
                style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Your Clinic Isn&apos;t Empty Because You&apos;re A Bad Doctor.
                <br />
                <span style={{ color: 'var(--orange)' }}>It&apos;s Empty Because You&apos;re Invisible.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {PROBLEMS.map((p) => (
                <div
                  key={p.title}
                  className="p-7 md:p-8"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3"
                    style={{ fontSize: '20px', color: 'var(--text-primary)' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-outfit"
                    style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE SYSTEM */}
        <section
          className="py-24 md:py-32 px-6 md:px-12"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="max-w-6xl mx-auto" data-reveal>
            <div className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4">
              <span
                className="font-outfit text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'var(--orange)' }}
              >
                The Patient Growth System
              </span>
              <h2
                className="font-syne font-extrabold leading-[1.05]"
                style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  maxWidth: '900px',
                }}
              >
                The 4-Part Engine That Fills Your <span style={{ color: 'var(--orange)' }}>OPD Calendar</span>
              </h2>
              <p
                className="font-outfit font-light max-w-2xl"
                style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7 }}
              >
                Each piece works on its own. Together, they compound. This is how a quiet clinic
                becomes a 3-week-waitlist clinic in under 90 days.
              </p>
            </div>

            <div className="space-y-5 md:space-y-6">
              {SYSTEM_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid md:grid-cols-[120px,1fr,260px] gap-6 md:gap-10 p-7 md:p-10 items-start"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  <div
                    className="font-bebas"
                    style={{
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      color: 'var(--orange)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3
                      className="font-syne font-bold mb-3"
                      style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: 'var(--text-primary)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-outfit"
                      style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                    >
                      {step.body}
                    </p>
                  </div>
                  <div
                    className="p-4"
                    style={{
                      borderLeft: '2px solid var(--orange)',
                      background: 'rgba(255,107,53,0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      className="font-outfit text-[10px] tracking-[0.3em] uppercase mb-2"
                      style={{ color: 'var(--orange)' }}
                    >
                      Real Result
                    </div>
                    <div
                      className="font-syne font-semibold"
                      style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.4 }}
                    >
                      {step.proof}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO TESTIMONIALS */}
        <VerticalVideoTestimonials testimonials={doctorTestimonials} />

        {/* FOR WHOM */}
        <section
          className="py-24 md:py-32 px-6 md:px-12"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="max-w-5xl mx-auto text-center" data-reveal>
            <span
              className="font-outfit text-[10px] tracking-[0.4em] uppercase"
              style={{ color: 'var(--orange)' }}
            >
              Who This Is For
            </span>
            <h2
              className="font-syne font-extrabold mt-4 mb-10 leading-[1.05]"
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              If You Run A <span style={{ color: 'var(--orange)' }}>Practice</span>, This Was Built For You.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {FOR_WHOM.map((item) => (
                <span
                  key={item}
                  className="font-outfit font-medium text-sm px-5 py-2.5"
                  style={{
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-pill)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-card)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="py-24 md:py-32 px-6 md:px-12"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="max-w-3xl mx-auto" data-reveal>
            <div className="text-center mb-12">
              <span
                className="font-outfit text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'var(--orange)' }}
              >
                Doctor FAQ
              </span>
              <h2
                className="font-syne font-extrabold mt-4 leading-[1.05]"
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                The Questions Every Doctor Asks Us First
              </h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details
                  key={i}
                  className="group p-6"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  <summary
                    className="font-syne font-semibold cursor-pointer list-none flex justify-between items-center gap-4"
                    style={{ color: 'var(--text-primary)', fontSize: '17px' }}
                  >
                    {f.q}
                    <span
                      className="transition-transform duration-300 group-open:rotate-45 shrink-0"
                      style={{ color: 'var(--orange)', fontSize: '24px', lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="font-outfit mt-4"
                    style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-[500px] h-[500px] opacity-[0.10]"
              style={{
                background: 'var(--orange)',
                top: '-15%',
                left: '15%',
                filter: 'blur(100px)',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <span
              className="font-outfit text-[10px] tracking-[0.4em] uppercase"
              style={{ color: 'var(--orange)' }}
            >
              Free Clinic Audit
            </span>
            <h2
              className="font-syne font-extrabold leading-[1.02]"
              style={{
                fontSize: 'clamp(36px, 7vw, 80px)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Stop Watching Empty Slots.<br />
              <span style={{ color: 'var(--orange)' }}>Start Filling Your OPD.</span>
            </h2>
            <p
              className="font-outfit font-light text-lg max-w-2xl"
              style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}
            >
              Book a free 30-minute audit. We&apos;ll review your current patient flow, your local
              competition, and walk you through exactly how to get to a fully-booked calendar.
            </p>
            <div className="mt-2">
              <MagneticButton
                as="a"
                href="/contact"
                className="font-outfit font-semibold px-10 py-5 text-base"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                Book My Free Audit →
              </MagneticButton>
            </div>
            <p className="font-outfit font-light text-sm" style={{ color: 'var(--text-muted)' }}>
              No commitment. No sales pitch. Just an honest look at your practice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
