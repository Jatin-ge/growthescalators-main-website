'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { TEAM_MEMBERS } from '@/lib/constants'

export default function Team() {
  const sectionRef  = useRef<HTMLElement>(null)
  const quoteRef    = useRef<HTMLParagraphElement>(null)
  const nameRef     = useRef<HTMLDivElement>(null)
  const roleRef     = useRef<HTMLDivElement>(null)
  const initRef     = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const indexRef    = useRef(0)
  const busyRef     = useRef(false)
  // FIXED: Store the active transition function in a ref so the ScrollTrigger
  // onUpdate closure always calls the latest version without going stale.
  // Previously transition() was defined outside useEffect and captured in the
  // closure, meaning indexRef/busyRef updates inside it were invisible to
  // subsequent onUpdate calls on the same frame.
  const transitionRef = useRef<(nextIdx: number, dir: 1 | -1) => void>(() => {})
  const pendingRef = useRef<{ idx: number; dir: 1 | -1 } | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const showMember = (idx: number, animate: boolean, direction: 1 | -1 = 1) => {
    const member = TEAM_MEMBERS[idx]
    setActiveIdx(idx)

    if (!quoteRef.current) return

    quoteRef.current.innerHTML = member.quote
      .split(' ')
      .map(
        (w) =>
          `<span class="qw" style="display:inline-block;margin-right:0.28em;transform-origin:50% 0%;will-change:transform,opacity;">${w}</span>`
      )
      .join('')

    if (nameRef.current) nameRef.current.textContent = member.name
    if (roleRef.current) roleRef.current.textContent = member.role
    if (initRef.current) initRef.current.textContent = member.initials

    const wordEls    = quoteRef.current.querySelectorAll<HTMLSpanElement>('.qw')
    const fromY      = direction > 0 ?  20 : -20
    const fromRotate = direction > 0 ?  70 : -70

    if (!animate) {
      gsap.set(wordEls, { opacity: 1, rotateX: 0, y: 0 })
      gsap.set([nameRef.current, roleRef.current, initRef.current], { opacity: 1, y: 0 })
      busyRef.current = false
      return
    }

    gsap.fromTo(wordEls,
      { opacity: 0, rotateX: fromRotate, y: fromY },
      {
        opacity: 1, rotateX: 0, y: 0,
        duration: 0.45,
        stagger: 0.028,
        ease: 'power3.out',
        overwrite: true,
        onComplete: () => {
          busyRef.current = false
          // Drain the pending queue — jump to wherever scroll now says
          if (pendingRef.current !== null) {
            const { idx: pIdx, dir: pDir } = pendingRef.current
            pendingRef.current = null
            transitionRef.current(pIdx, pDir)
          }
        },
      }
    )
    gsap.fromTo(
      [initRef.current, nameRef.current, roleRef.current],
      { opacity: 0, y: fromY * 0.6 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power3.out', overwrite: true }
    )
  }

  useEffect(() => {
    if (!sectionRef.current) return
    showMember(0, false)

    const TOTAL  = TEAM_MEMBERS.length
    const PER    = window.innerHeight * 1.8
    const PIN_H  = PER * (TOTAL - 1)

    // FIXED: Define transition inside useEffect so it closes over the correct
    // refs and is always current. Stored in transitionRef so onUpdate can call
    // it without going stale across re-renders.
    const transition = (nextIdx: number, direction: 1 | -1) => {
      if (nextIdx === indexRef.current) return
      if (nextIdx < 0 || nextIdx >= TEAM_MEMBERS.length) return

      // If mid-animation, record the latest target and let onComplete drain it
      if (busyRef.current) {
        pendingRef.current = { idx: nextIdx, dir: direction }
        return
      }

      busyRef.current = true
      pendingRef.current = null
      const toY      = direction > 0 ? -14 :  14
      const toRotate = direction > 0 ? -70 :  70
      const wordEls  = quoteRef.current?.querySelectorAll<HTMLSpanElement>('.qw')

      if (wordEls && wordEls.length > 0) {
        gsap.to(wordEls, {
          opacity: 0, rotateX: toRotate, y: toY,
          duration: 0.18,
          stagger: 0.01,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => {
            indexRef.current = nextIdx
            showMember(nextIdx, true, direction)
          },
        })
        gsap.to([nameRef.current, roleRef.current, initRef.current], {
          opacity: 0, y: toY * 0.6, duration: 0.15, ease: 'power2.in', overwrite: true,
        })
      } else {
        indexRef.current = nextIdx
        showMember(nextIdx, true, direction)
      }
    }
    transitionRef.current = transition

    const ctx = gsap.context(() => {
      gsap.fromTo('.team-label',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      let lastProgress = 0

      ScrollTrigger.create({
        trigger: sectionRef.current,
        // FIXED: Account for the 68px fixed navbar so the section pins flush
        // with the bottom of the nav bar, not behind it. Previously 'top top'
        // caused the first ~68px of the pinned section to be hidden under nav.
        start: 'top top+=68',
        end: `+=${PIN_H}`,
        pin: true,
        pinSpacing: true,
        // FIXED: invalidateOnRefresh recalculates pin height on resize so the
        // section doesn't under/over-scroll on window resize
        invalidateOnRefresh: true,
        onUpdate(self) {
          const progress  = self.progress
          // FIXED: clamp direction to 1 | -1 explicitly to satisfy TypeScript
          const direction: 1 | -1 = progress >= lastProgress ? 1 : -1
          lastProgress    = progress

          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 100}%`
          }

          const segment  = 1 / TOTAL
          const newIdx   = Math.min(Math.floor(progress / segment), TOTAL - 1)

          // Always call — transition() will queue the target if busy,
          // ensuring fast scrolls never skip a member permanently
          if (newIdx !== indexRef.current) {
            transitionRef.current(newIdx, direction)
          }
        },
      })
    }, sectionRef.current)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      data-animate="team"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}
    >
      {/* Top progress line */}
      <div className="absolute top-0 left-0 right-0 h-px z-20" style={{ background: 'var(--border-subtle)' }}>
        <div
          ref={progressRef}
          className="h-full transition-none"
          style={{ width: '0%', background: 'var(--orange)', transition: 'width 0.08s linear' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(255,101,0,0.06) 0%, transparent 60%)' }} />

      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col justify-center"
        style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '5rem' }}
      >
        <span className="team-label font-outfit text-[10px] tracking-[0.4em] uppercase block mb-6"
          style={{ color: 'var(--orange)' }}>
          Our Team
        </span>

        {/* Dot indicators */}
        <div className="flex gap-2 mb-10">
          {TEAM_MEMBERS.map((_, i) => (
            <div key={i}
              className="rounded-full transition-all duration-600"
              style={{
                width:      activeIdx === i ? '28px' : '6px',
                height:     '6px',
                background: activeIdx === i ? 'var(--orange)' : 'rgba(255,101,0,0.18)',
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
              }}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Left — identity */}
          <div className="flex md:flex-col items-start gap-5 shrink-0 md:pt-2" style={{ width: '180px' }}>
            <div
              ref={initRef}
              className="w-14 h-14 rounded-full flex items-center justify-center font-syne font-bold text-lg shrink-0"
              style={{ background: 'linear-gradient(135deg,#FF6500,#FF3D00)', color: '#fff' }}
            />
            <div className="flex flex-col gap-1">
              <div ref={nameRef} className="font-syne font-bold text-sm leading-snug"
                style={{ color: 'var(--text-primary)' }} />
              <div ref={roleRef} className="font-outfit text-xs"
                style={{ color: 'var(--orange)' }} />
            </div>
            <div className="hidden md:block w-px mt-4"
              style={{ background: 'var(--border)', height: '60px' }} />
          </div>

          {/* Right — giant quote */}
          <div className="flex-1 flex flex-col justify-between gap-12" style={{ marginTop: '-80px' }}>
            {/* FIXED: perspective must be on the parent element of the rotateX
                targets, not on the targets themselves. The quote words use
                rotateX so perspective here makes the 3D flip visible */}
            <p
              ref={quoteRef}
              className="font-syne font-extrabold leading-tight"
              style={{
                fontSize:    'clamp(22px, 3.5vw, 50px)',
                lineHeight:  1.22,
                perspective: '900px',
                color:       'var(--text-primary)',
              }}
            />

            {/* Counter + hint */}
            <div className="flex items-center gap-4">
              <span className="font-bebas text-5xl leading-none" style={{ color: 'var(--orange)' }}>
                0{activeIdx + 1}
              </span>
              <div className="w-px h-7" style={{ background: 'var(--border)' }} />
              <span className="font-outfit text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}>
                of 0{TEAM_MEMBERS.length}
              </span>

              {activeIdx < TEAM_MEMBERS.length - 1 && (
                <span
                  className="font-outfit text-[10px] tracking-[0.28em] uppercase ml-4"
                  style={{ color: 'var(--text-muted)', opacity: 0.4 }}
                >
                  Scroll ↓
                </span>
              )}
              {activeIdx === TEAM_MEMBERS.length - 1 && (
                <span
                  className="font-outfit text-[10px] tracking-[0.28em] uppercase ml-4"
                  style={{ color: 'var(--orange)', opacity: 0.7 }}
                >
                  Continue ↓
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
