import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work — Case Studies',
  description:
    "100+ brands scaled across healthcare, e-commerce, real estate, education, and hospitality. Real metrics, real revenue, real outcomes from our performance marketing campaigns.",
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Our Work — Case Studies — Growth Escalators',
    description: '100+ brands scaled across healthcare, e-commerce, real estate, education, and hospitality.',
    url: '/work',
    type: 'website',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
