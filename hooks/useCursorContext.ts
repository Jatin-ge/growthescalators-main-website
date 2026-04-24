'use client'

import { useContext } from 'react'
import { CursorContext } from '@/components/ui/CustomCursor'

export function useCursorContext() {
  return useContext(CursorContext)
}
