'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
  splitBy?: 'chars' | 'words'
  stagger?: number
  delay?: number
  trigger?: 'scroll' | 'immediate'
  y?: number
}

export default function AnimatedText({
  text,
  className = '',
  tag: Tag = 'p',
  splitBy = 'words',
  stagger = 0.05,
  delay = 0,
  trigger = 'scroll',
  y = 60,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const items = splitBy === 'words' ? text.split(' ') : text.split('')

    el.innerHTML = items
      .map((item) =>
        `<span class="overflow-clip inline-block"><span class="inline-block will-change-transform">${item}${splitBy === 'words' ? '&nbsp;' : ''}</span></span>`
      )
      .join('')

    const spans = el.querySelectorAll<HTMLSpanElement>('span > span')

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        spans,
        { y: y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger,
          delay,
          ease: 'power3.out',
          ...(trigger === 'scroll' && {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }),
        }
      )
      return tween
    }, el)

    return () => ctx.revert()
  }, [text, splitBy, stagger, delay, trigger, y])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
