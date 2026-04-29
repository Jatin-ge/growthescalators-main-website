import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-Powered Marketing for US Roofing Contractors',
  description:
    'More booked replacement jobs, lower cost per lead, and crews booked weeks out. AI-first performance marketing built for US roofing contractors — Google, Meta, LSA, and storm-restoration funnels.',
  alternates: { canonical: '/roofing' },
  openGraph: {
    title: 'AI-Powered Marketing for US Roofing Contractors — Growth Escalators',
    description:
      'AI-first performance marketing built for US roofing contractors. More booked replacements, lower cost per lead.',
    url: '/roofing',
    type: 'website',
  },
}

export default function RoofingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
