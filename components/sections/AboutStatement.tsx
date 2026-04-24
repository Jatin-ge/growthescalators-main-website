'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { AGENCY_FACTS } from '@/lib/constants'

const COPY =
  'Growth Escalators is not your average agency. We are a results-obsessed growth team that treats your brand like our own — building systems, not just campaigns. Every rupee you spend, we make work harder.'

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return

    const words = COPY.split(' ')
    textRef.current.innerHTML = words
      .map((w) => `<span class="word-muted inline-block mr-[0.28em]">${w}</span>`)
      .join('')

    const spans = Array.from(
      textRef.current.querySelectorAll<HTMLSpanElement>('.word-muted')
    )

    const ctx = gsap.context(() => {
      // FIXED: Replaced N individual ScrollTrigger instances (one per word) with
      // a single scrub timeline. The previous approach created 30+ ScrollTrigger
      // objects each targeting a tiny span element — unreliable with Lenis because
      // Lenis translates the page with transforms so individual span viewport
      // positions can flicker. A single scrub ST on the section is stable.
      // Also added invalidateOnRefresh so positions recalculate on resize.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
          invalidateOnRefresh: true, // FIXED: recalculate on resize/refresh
        },
      })

      // FIXED: Animate all words in a single staggered tween inside the scrub
      // timeline so colour reveal is tied to scroll progress, not individual
      // viewport entry events which fire unreliably for inline elements
      tl.fromTo(
        spans,
        { color: 'var(--text-muted)', opacity: 0.35 },
        {
          color: 'var(--text-primary)',
          opacity: 1,
          stagger: {
            each: 0.06,
            from: 'start',
          },
          ease: 'none',
        }
      )

      gsap.fromTo(
        '.about-fact',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-facts',
            start: 'top 82%',
            // FIXED: toggleActions explicit — only play forward, don't reverse
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.about-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-divider',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      data-animate="about-statement"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Vertical label */}
          <div className="flex md:flex-col items-start gap-4 shrink-0">
            <span
              className="font-outfit text-[10px] tracking-[0.4em] uppercase"
              style={{ color: 'var(--orange)' }}
            >
              About Us
            </span>
            <div
              className="hidden md:block w-px h-32"
              style={{ background: 'var(--border)' }}
            />
          </div>

          <div className="flex-1">
            {/* FIXED: Added perspective on the parent container so that any
                rotateX animations on child words render correctly in 3D space */}
            <p
              ref={textRef}
              className="font-syne font-bold leading-tight mb-14"
              style={{
                fontSize: 'clamp(22px, 3.8vw, 50px)',
                lineHeight: 1.3,
                perspective: '1000px',
              }}
            >
              {COPY}
            </p>

            {/* Divider line */}
            <div
              className="about-divider w-full h-px mb-10 origin-left"
              style={{ background: 'var(--border)' }}
            />

            {/* Agency facts */}
            <div className="about-facts grid grid-cols-2 md:grid-cols-4 gap-6">
              {AGENCY_FACTS.map((fact) => (
                <div key={fact.label} className="about-fact">
                  <div
                    className="font-bebas text-3xl md:text-4xl mb-1"
                    style={{ color: 'var(--orange)' }}
                  >
                    {fact.value}
                  </div>
                  <div
                    className="font-outfit text-xs uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
