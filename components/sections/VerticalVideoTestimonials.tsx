'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type DoctorTestimonial = {
  id: string
  name: string
  role: string
  location: string
  highlight: string
  accentGradient: string
  videoSrc: string
  posterSrc: string
  durationSec: number
}

interface Props {
  testimonials: DoctorTestimonial[]
}

export default function VerticalVideoTestimonials({ testimonials }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vvt-head > *',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        '.vvt-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef.current)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  // Pause every other video when one becomes active
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (!el) return
      if (id === activeId) {
        el.muted = false
        el.play().catch(() => {})
      } else {
        el.pause()
        el.currentTime = 0
        el.muted = true
      }
    })
  }, [activeId])

  // Pause all on unmount
  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach((el) => el?.pause())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="video-testimonials"
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[420px] h-[420px] opacity-[0.10]"
          style={{
            background: 'var(--orange)',
            top: '-10%',
            left: '-5%',
            filter: 'blur(110px)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        />
        <div
          className="absolute w-[360px] h-[360px] opacity-[0.08]"
          style={{
            background: 'var(--violet)',
            bottom: '-10%',
            right: '-5%',
            filter: 'blur(100px)',
            borderRadius: '40% 60% 60% 40%',
          }}
        />
      </div>

      <div className="vvt-head relative z-10 max-w-5xl mx-auto text-center mb-14 md:mb-20 flex flex-col items-center gap-5">
        <span
          className="font-outfit text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--orange)' }}
        >
          Real Doctors. Real Walk-ins.
        </span>
        <h2
          className="font-syne font-extrabold leading-[1.05]"
          style={{
            fontSize: 'clamp(34px, 5.5vw, 64px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Hear It From The <span style={{ color: 'var(--orange)' }}>Practice Owners</span>
        </h2>
        <p
          className="font-outfit font-light max-w-2xl"
          style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
          }}
        >
          No scripts. No reshoots. Just clinic owners and consultants who tripled their OPD,
          filled their calendars, and stopped depending on referrals.
        </p>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex gap-5 md:gap-6 overflow-x-auto md:overflow-x-visible md:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl mx-auto pb-6 md:pb-0 snap-x snap-mandatory md:snap-none"
        style={{ scrollbarWidth: 'thin' }}
      >
        {testimonials.map((t) => {
          const isActive = activeId === t.id
          const hasVideo = Boolean(t.videoSrc)
          return (
            <article
              key={t.id}
              className="vvt-card group relative shrink-0 snap-center w-[78vw] sm:w-[300px] md:w-auto"
              style={{ aspectRatio: '9 / 16' }}
            >
              <button
                type="button"
                onClick={() => hasVideo && setActiveId(isActive ? null : t.id)}
                className="absolute inset-0 w-full h-full overflow-hidden text-left"
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: t.accentGradient,
                  boxShadow: 'var(--glass-shadow)',
                  transition: 'transform var(--t-base), box-shadow var(--t-base)',
                  cursor: hasVideo ? 'pointer' : 'default',
                }}
                aria-label={
                  hasVideo
                    ? `Play testimonial from ${t.name}`
                    : `${t.name} testimonial — coming soon`
                }
              >
                {hasVideo ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[t.id] = el
                    }}
                    src={t.videoSrc}
                    poster={t.posterSrc || undefined}
                    playsInline
                    muted
                    preload="metadata"
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="font-outfit uppercase tracking-[0.3em] text-[10px]"
                      style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                      Video coming soon
                    </div>
                  </div>
                )}

                {/* Bottom gradient for legibility */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(15,15,26,0.85) 0%, rgba(15,15,26,0.55) 40%, rgba(15,15,26,0) 100%)',
                  }}
                />

                {/* Play button overlay */}
                {hasVideo && !isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ marginLeft: 3 }}
                      >
                        <path
                          d="M5 3l14 9-14 9V3z"
                          fill="var(--text-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Duration / live pill */}
                <div
                  className="absolute top-3 right-3 font-outfit text-[10px] tracking-[0.15em] uppercase px-2 py-1"
                  style={{
                    background: isActive ? 'var(--orange)' : 'rgba(15,15,26,0.55)',
                    color: '#fff',
                    borderRadius: 'var(--radius-pill)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {isActive ? '● Live' : `0:${String(t.durationSec).padStart(2, '0')}`}
                </div>

                {/* Card content */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 z-10">
                  <div
                    className="font-outfit text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    {t.location}
                  </div>
                  <h3
                    className="font-syne font-bold leading-tight mb-1"
                    style={{ color: '#fff', fontSize: 'clamp(16px, 1.4vw, 20px)' }}
                  >
                    {t.name}
                  </h3>
                  <div
                    className="font-outfit text-xs mb-3"
                    style={{ color: 'rgba(255,255,255,0.78)' }}
                  >
                    {t.role}
                  </div>
                  <div
                    className="font-outfit font-semibold text-[13px] leading-snug"
                    style={{ color: '#fff' }}
                  >
                    “{t.highlight}”
                  </div>
                </div>
              </button>
            </article>
          )
        })}
      </div>

      <p
        className="relative z-10 text-center font-outfit text-xs mt-10"
        style={{ color: 'var(--text-muted)' }}
      >
        Tap a card to play — sound on. Swipe to see more.
      </p>
    </section>
  )
}
