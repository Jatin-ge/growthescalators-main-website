import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Growth Escalators',
  description:
    "We're an AI-first performance marketing agency built for doctors, roofers, restaurants, and growing brands. ₹10Cr+ in ad spend managed, 97% client retention, and a healthcare-, roofing-, and hospitality-trained team.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Growth Escalators',
    description: 'AI-first performance marketing agency. ₹10Cr+ in ad spend managed, 97% client retention.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
