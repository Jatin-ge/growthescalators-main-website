import type { Metadata } from 'next'
import { Syne, Outfit, Bebas_Neue } from 'next/font/google'
import './globals.css'
import CursorWrapper from '@/components/ui/CursorWrapper'
import dynamic from 'next/dynamic'

const GrowthBot = dynamic(() => import('@/components/ui/GrowthBot'), { ssr: false })

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'Growth Escalators — Your Growth Partner',
  description: '10,000+ campaigns run. ₹10Cr+ in ad spend managed. 97% client retention.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${syne.variable} ${outfit.variable} ${bebas.variable}`}>
        <CursorWrapper />
        {children}
        <GrowthBot />
      </body>
    </html>
  )
}
