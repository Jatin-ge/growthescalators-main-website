'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

export default function CursorWrapper() {
  return <CustomCursor />
}
