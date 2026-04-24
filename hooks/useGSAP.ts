'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function useGSAP(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!)
    })

    return () => {
      contextRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return contextRef
}
