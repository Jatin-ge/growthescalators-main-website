'use client'

import { useContext } from 'react'
import { LenisContext } from '@/components/ui/SmoothScrollProvider'

export function useLenis() {
  return useContext(LenisContext)
}
