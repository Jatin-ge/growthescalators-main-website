'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const STEPS = [
  { number: '01', tag: 'Discovery', headline: 'We find exactly where your growth is leaking.', body: 'We audit your brand, competitors, and market before running a single ad. We find the gap — then build the system to exploit it.', stat1: { value: '48hrs', label: 'Full brand audit' }, stat2: { value: '100%', label: 'Custom strategy' } },
  { number: '02', tag: 'Strategy', headline: 'A 90-day growth blueprint built only for you.', body: 'No templates. No recycled playbooks. A custom growth system mapped to your revenue goals.', stat1: { value: '90-day', label: 'Growth roadmap' }, stat2: { value: 'Zero', label: 'Guesswork' } },
  { number: '03', tag: 'Execution', headline: 'We deploy across every channel. Simultaneously.', body: 'Meta. Google. SEO. Content. Funnels. All running in parallel, all feeding each other. Speed is the strategy.', stat1: { value: '7+', label: 'Channels activated' }, stat2: { value: 'Week 1', label: 'Live & running' } },
  { number: '04', tag: 'Optimisation', headline: 'Weekly reporting. Real-time adjustments.', body: 'Every Monday you get a report. Every week we make it better. We chase performance like our own money is on the line.', stat1: { value: 'Weekly', label: 'Performance calls' }, stat2: { value: '24hr', label: 'Response time' } },
  { number: '05', tag: 'Escalation', headline: 'When results hit, we double down hard.', body: "Scale what works. Kill what doesn't. When ROAS climbs and CPL drops — we reinvest and accelerate.", stat1: { value: '10,000+', label: 'Campaigns scaled' }, stat2: { value: '₹10Cr+', label: 'Ad spend managed' } },
]

const SCROLL_PER_CARD = 700
const CARD_W = 'min(1100px, calc(100vw - 80px))'
const CARD_H = '72vh'

export default function Process() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!outerRef.current || !stickyRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.proc-head',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proc-head',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // FIXED: Use pinSpacing: true (not false) so the outer scroll container
      // gets proper spacing added after it. pinSpacing:false + a manually set
      // height was causing the scroll amount to be double-counted — the pinned
      // element's scroll distance was added on top of the outer div's height,
      // making the page too tall and the cards over-scrolling.
      // FIXED: start includes top+=68 to account for the fixed navbar
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top+=68',
        end: `+=${SCROLL_PER_CARD * (STEPS.length - 1)}`,
        pin: stickyRef.current,
        pinSpacing: false, // outer div already has explicit height
        invalidateOnRefresh: true, // FIXED: recalc on resize
      })

      // Slide each subsequent card up from 120% below sticky container
      STEPS.forEach((_, i) => {
        if (i === 0) return
        const card = cardRefs.current[i]
        const prev = cardRefs.current[i - 1]
        if (!card) return

        // FIXED: Use gsap.set to establish the initial yPercent instead of
        // relying on the inline React style transform:'translateY(120%)'.
        // When GSAP and React both set transform on the same element they
        // fight each other — React's style prop wins on re-render, resetting
        // GSAP's animated value mid-animation. gsap.set writes to GSAP's
        // internal cache and won't be overwritten by React's reconciler.
        gsap.set(card, { yPercent: 120 })

        gsap.fromTo(card,
          { yPercent: 120 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: outerRef.current,
              start: `top+=${SCROLL_PER_CARD * (i - 1)} top+=68`,
              end:   `top+=${SCROLL_PER_CARD * i} top+=68`,
              scrub: 1.2,
              invalidateOnRefresh: true, // FIXED: recalc on resize
            },
          }
        )

        // Scale previous card down as new one arrives
        if (prev) {
          gsap.to(prev, {
            scale: 0.92,
            transformOrigin: 'center center',
            ease: 'none',
            scrollTrigger: {
              trigger: outerRef.current,
              start: `top+=${SCROLL_PER_CARD * (i - 1)} top+=68`,
              end:   `top+=${SCROLL_PER_CARD * i} top+=68`,
              scrub: 1.2,
              invalidateOnRefresh: true, // FIXED: recalc on resize
            },
          })
        }
      })
    }, outerRef.current)

    return () => ctx.revert()
  }, [])

  const totalHeight = SCROLL_PER_CARD * (STEPS.length - 1)

  return (
    <div style={{ background: 'var(--bg-secondary)' }} data-animate="process">

      {/* Centred compact header */}
      <div className="pt-16 pb-10 px-6 text-center mx-auto" style={{ maxWidth: '600px' }}>
        <span className="proc-head font-outfit text-[10px] tracking-[0.4em] uppercase block mb-3"
          style={{ color: 'var(--orange)' }}>How We Work</span>
        <h2 className="proc-head font-syne font-extrabold leading-snug"
          style={{ fontSize: 'clamp(17px, 2vw, 28px)', color: 'var(--text-primary)' }}>
          How we work?{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
            We turn your marketing into a compounding growth system.
          </span>
        </h2>
      </div>

      {/* Outer scroll container */}
      <div
        ref={outerRef}
        style={{ position: 'relative', height: `calc(${CARD_H} + ${totalHeight}px)` }}
      >
        {/* Sticky — NO overflow hidden, cards slide up from below viewport */}
        <div
          ref={stickyRef}
          style={{
            position: 'relative',
            height: CARD_H,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                borderRadius: '20px',
                overflow: 'hidden',
                zIndex: 10 + i,
                boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
                // FIXED: Removed the inline transform for cards i>0.
                // GSAP now sets yPercent:120 via gsap.set() in the effect,
                // so React's style prop no longer fights GSAP's transform matrix
              }}
            >
              {/* Card bg */}
              <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', position: 'relative' }}>
                {/* Right gradient */}
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%', background: 'linear-gradient(135deg,#fff0e8 0%,#fdd8c0 35%,#f8b898 65%,#f09870 100%)', borderRadius: '0 20px 20px 0' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '44%', width: '12%', background: 'linear-gradient(to right,#fff,transparent)', zIndex: 2 }} />

                <div className="relative z-10 w-full grid md:grid-cols-2" style={{ height: '100%' }}>
                  {/* LEFT */}
                  <div className="flex flex-col justify-center px-8 md:px-10 py-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#f5f5f5', border: '1px solid #e8e8e8' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#aaa' }} />
                        <span className="font-outfit text-[11px]" style={{ color: '#666' }}>{step.tag}</span>
                      </div>
                    </div>
                    <h3 className="font-syne font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(18px,2.2vw,34px)', color: '#0D0D0F', letterSpacing: '-0.02em' }}>
                      {step.headline}
                    </h3>
                    <p className="font-outfit font-light leading-relaxed mb-5" style={{ fontSize: '13px', color: '#888', maxWidth: '340px', lineHeight: 1.75 }}>
                      {step.body}
                    </p>
                    <div className="flex gap-6 items-center mb-5">
                      <div>
                        <div className="font-bebas text-xl leading-none mb-0.5" style={{ color: '#FF6500' }}>{step.stat1.value}</div>
                        <div className="font-outfit text-[9px] uppercase tracking-widest" style={{ color: '#aaa' }}>{step.stat1.label}</div>
                      </div>
                      <div className="w-px h-6" style={{ background: '#e8e8e8' }} />
                      <div>
                        <div className="font-bebas text-xl leading-none mb-0.5" style={{ color: '#FF6500' }}>{step.stat2.value}</div>
                        <div className="font-outfit text-[9px] uppercase tracking-widest" style={{ color: '#aaa' }}>{step.stat2.label}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {STEPS.map((_, j) => (
                        <div key={j} className="rounded-full" style={{ width: j === i ? '16px' : '5px', height: '5px', background: j <= i ? '#FF6500' : '#e0e0e0' }} />
                      ))}
                      <span className="font-outfit text-[9px] ml-1.5" style={{ color: '#bbb' }}>{i + 1} / {STEPS.length}</span>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="hidden md:flex items-center justify-center px-6 py-8 relative z-10">
                    <div className="w-full max-w-xs flex flex-col gap-2.5">
                      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', boxShadow: '0 6px 28px rgba(0,0,0,0.09)', border: '1px solid rgba(255,255,255,0.95)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: '#FF6500' }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /></svg>
                          </div>
                          <span className="font-outfit text-xs font-semibold" style={{ color: '#222' }}>{step.tag}</span>
                        </div>
                        {[{ label: 'Campaign Performance', val: 92 }, { label: 'Audience Match', val: 78 }, { label: 'Creative Score', val: 85 }, { label: 'Funnel Conversion', val: 67 }].map((bar, j) => (
                          <div key={j} className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span className="font-outfit text-[10px]" style={{ color: '#999' }}>{bar.label}</span>
                              <span className="font-outfit text-[10px] font-semibold" style={{ color: '#FF6500' }}>{bar.val}%</span>
                            </div>
                            <div className="h-1 rounded-full" style={{ background: '#f0f0f0' }}>
                              <div className="h-full rounded-full" style={{ width: `${bar.val}%`, background: j === 0 ? '#FF6500' : `rgba(255,101,0,${0.3 + j * 0.15})` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                        <div>
                          <div className="font-outfit text-xs font-semibold" style={{ color: '#222' }}>Stage {step.number} Active</div>
                          <div className="font-outfit text-[10px]" style={{ color: '#aaa' }}>Growth Escalators · Live</div>
                        </div>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 left-8 font-bebas pointer-events-none select-none" style={{ fontSize: 'clamp(50px,8vw,110px)', color: 'rgba(0,0,0,0.04)', lineHeight: 0.85 }}>
                  {step.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '60px', background: 'var(--bg-secondary)' }} />
    </div>
  )
}
