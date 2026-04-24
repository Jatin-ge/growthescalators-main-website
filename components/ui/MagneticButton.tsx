'use client'

import { useRef, useState } from 'react'
import { useCursor } from './CustomCursor'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  strength?: number
  as?: 'button' | 'a'
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  style: styleProp,
  onClick,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  strength = 0.4,
  as: Tag = 'button',
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const { setState } = useCursor()
  const [transform, setTransform] = useState('translate(0px, 0px)')

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    setTransform(`translate(${dx}px, ${dy}px)`)
  }

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px)')
    setState('idle')
    onMouseLeaveProp?.()
  }

  const handleMouseEnter = () => {
    setState('hover')
    onMouseEnterProp?.()
  }

  const props = {
    ref,
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    style: {
      ...styleProp,
      transform,
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    },
  }

  if (Tag === 'a') {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button {...props} type="button">
      {children}
    </button>
  )
}
