import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-Powered Marketing for Real Estate Developers',
  description:
    "More site visits with higher-quality buyers, faster bookings on premium projects, and lower cost per qualified lead. AI-first performance marketing built for real estate developers and builders selling residential, commercial, and luxury properties.",
  alternates: { canonical: '/real-estate' },
  openGraph: {
    title: 'AI-Powered Marketing for Real Estate Developers — Growth Escalators',
    description:
      'AI-first performance marketing for real estate developers. Premium-buyer targeting, AI lead-scoring, 6-month nurture funnels.',
    url: '/real-estate',
    type: 'website',
  },
}

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
