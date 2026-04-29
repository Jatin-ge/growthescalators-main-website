import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketing for Doctors & Clinics',
  description:
    "More patients. Less ad spend. AI-first performance marketing, content, and conversion-focused websites built specifically for doctors, clinics, and hospitals.",
  alternates: { canonical: '/doctors' },
  openGraph: {
    title: 'Marketing for Doctors & Clinics — Growth Escalators',
    description:
      'More patients. Less ad spend. AI-first marketing built specifically for doctors and clinics.',
    url: '/doctors',
    type: 'website',
  },
}

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
