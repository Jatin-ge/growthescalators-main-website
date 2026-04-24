'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

export function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!ref.current) return

    triggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => {
      triggerRef.current?.kill()
    }
  }, [ref])

  return progress
}
