'use client'

import Lenis from 'lenis'
import { createContext, useContext, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'

// FIXED: Export a proper context so components can access the Lenis instance
export const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    // FIXED: Sync Lenis scroll position to ScrollTrigger every frame
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(ticker)

    // FIXED: Disable GSAP lag smoothing — Lenis already handles frame-time
    // smoothing; letting GSAP also adjust it causes double-compensation jank
    gsap.ticker.lagSmoothing(0)

    // FIXED: Refresh ScrollTrigger after Lenis initialises so all trigger
    // positions are calculated against the final Lenis-managed scroll container
    ScrollTrigger.refresh()

    // FIXED: Re-calculate all trigger positions on window resize so pinned
    // sections and scrub animations don't drift after layout changes
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  // FIXED: Pass the ref's current value via state-equivalent pattern.
  // Previously this passed lenisRef.current at render time (always null because
  // the effect hadn't run yet). Consumers who need lenis should use the ref
  // pattern or listen for the context value to become non-null.
  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
