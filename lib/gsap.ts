'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // FIXED: Prevent redundant callback firing on rapid scroll; ignore mobile
  // orientation-change resize events that would cause jank
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })

  // FIXED: Lenis handles scroll normalisation — let it own the scroll position
  // instead of GSAP fighting it with its own normaliser
  ScrollTrigger.normalizeScroll(false)

  // FIXED: Enable GPU-accelerated transforms by default on all tweens
  gsap.defaults({ force3D: true, overwrite: 'auto' })
}

export { gsap, ScrollTrigger }

export function createTimeline(defaults?: gsap.TweenVars) {
  return gsap.timeline({ defaults: { ease: 'power3.out', ...defaults } })
}

export function fadeInUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', ...vars }
  )
}

export function staggerFadeInUp(
  targets: gsap.TweenTarget,
  stagger = 0.1,
  vars?: gsap.TweenVars
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger, ease: 'power3.out', ...vars }
  )
}
