import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'

const GrowthBot = dynamic(() => import('@/components/ui/GrowthBot'), { ssr: false })
const CursorGlow = dynamic(() => import('@/components/portfolio/CursorGlow'), { ssr: false })

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Growth Escalators — Your Growth Partner',
  description: '10,000+ campaigns run. ₹10Cr+ in ad spend managed. 97% client retention.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.variable}>
        <CursorGlow />
        {children}
        <GrowthBot />
      </body>
    </html>
  )
}
