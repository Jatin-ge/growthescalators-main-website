'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { CursorState } from '@/lib/types'

interface CursorContextValue {
  state: CursorState
  setState: (s: CursorState) => void
}

export const CursorContext = createContext<CursorContextValue>({
  state: 'idle',
  setState: () => {},
})

export default function CustomCursor({ children }: { children?: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [state, setState] = useState<CursorState>('idle')

  const animate = useCallback(() => {
    dot.current.x += (mouse.current.x - dot.current.x) * 0.85
    dot.current.y += (mouse.current.y - dot.current.y) * 0.85
    ring.current.x += (mouse.current.x - ring.current.x) * 0.12
    ring.current.y += (mouse.current.y - ring.current.y) * 0.12

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${dot.current.x}px, ${dot.current.y}px)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-cursor="hover"]')) setState('hover')
    }
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-cursor="hover"]')) setState('idle')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  const isHover = state === 'hover'

  return (
    <CursorContext.Provider value={{ state, setState }}>
      {children}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          width: isHover ? 0 : 8,
          height: isHover ? 0 : 8,
          borderRadius: '50%',
          background: '#FF6500',
          marginLeft: isHover ? 0 : -4,
          marginTop: isHover ? 0 : -4,
          transition: 'width 0.2s, height 0.2s, margin 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          width: isHover ? 52 : 36,
          height: isHover ? 52 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${isHover ? '#FF6500' : 'rgba(13,13,15,0.35)'}`,
          marginLeft: isHover ? -26 : -18,
          marginTop: isHover ? -26 : -18,
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, margin 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
