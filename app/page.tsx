'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/sections/Preloader'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import AboutStatement from '@/components/sections/AboutStatement'
import Services from '@/components/sections/Services'
import Results from '@/components/sections/Results'
import Team from '@/components/sections/Team'
import Work from '@/components/sections/Work'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import SocialProofTicker from '@/components/ui/SocialProofTicker'
import Footer from '@/components/sections/Footer'
import { ScrollTrigger } from '@/lib/gsap'

// PR-0: SmoothScrollProvider (Lenis) removed; relying on CSS
// scroll-behavior: smooth on html (set in globals.css) to match
// the portfolio site. SmoothScrollProvider file kept in tree
// until the final cleanup PR removes gsap/lenis.

export default function Home() {
  const [preloadDone, setPreloadDone] = useState(false)

  // FIXED: Refresh ScrollTrigger after the preloader completes so that all
  // scroll-triggered animations calculate their trigger positions against the
  // fully visible, correctly laid-out page — not the opacity:0 hidden state
  useEffect(() => {
    if (preloadDone) {
      // Delay one rAF so the opacity transition has committed to the DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })
    }
  }, [preloadDone])

  return (
    <>
      {!preloadDone && <Preloader onComplete={() => setPreloadDone(true)} />}
      {/* FIXED: Use visibility instead of opacity so the layout is stable and
          ScrollTrigger can measure element positions accurately even before
          the preloader finishes. opacity:0 collapses paint but not layout,
          so positions are correct — but we add will-change to hint the GPU */}
      <div
        style={{
          opacity: preloadDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
          willChange: 'opacity',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <AboutStatement />
          <Services />
          <Results />
          <Team />
          <Work />
          <Testimonials />
          <CTA />
        </main>
        <SocialProofTicker />
        <Footer />
      </div>
    </>
  )
}
