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
  metadataBase: new URL('https://www.growthescalators.com'),
  title: {
    default: 'Growth Escalators — AI-First Performance Marketing Agency',
    template: '%s — Growth Escalators',
  },
  description:
    "AI-first performance marketing agency. 10,000+ campaigns run, ₹10Cr+ in ad spend managed, 97% client retention. Specialists for doctors, roofing contractors, restaurants, and growing brands.",
  keywords: [
    'performance marketing agency',
    'AI marketing agency',
    'marketing for doctors',
    'roofing contractor marketing',
    'restaurant marketing',
    'Meta ads agency',
    'Google ads agency',
    'Jaipur marketing agency',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Growth Escalators',
    title: 'Growth Escalators — AI-First Performance Marketing Agency',
    description: 'AI-first performance marketing for doctors, roofing contractors, restaurants, and growing brands.',
    url: 'https://www.growthescalators.com',
    images: [
      {
        url: 'https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png',
        width: 1200,
        height: 630,
        alt: 'Growth Escalators — AI-first performance marketing agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Escalators — AI-First Performance Marketing Agency',
    description: 'AI-first performance marketing for doctors, roofing contractors, restaurants, and growing brands.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

/* JSON-LD Organization schema — emitted on every page so search engines
   always see consistent business identity. Edit in one place. */
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Growth Escalators',
  url: 'https://www.growthescalators.com',
  logo: 'https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png',
  description: 'AI-first performance marketing agency. Specialists for doctors, roofing contractors, restaurants, and growing brands.',
  email: 'Info@growthescalators.com',
  telephone: '+91-77338-88883',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '264/103-104, Sector 26, Sanganer, Pratap Nagar',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302033',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/growthescalators',
    'https://www.instagram.com/growthescalators',
    'https://www.linkedin.com/company/growth-escalators',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body className={jakarta.variable}>
        <CursorGlow />
        {children}
        <GrowthBot />
      </body>
    </html>
  )
}
