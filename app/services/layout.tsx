import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    "Performance marketing, AI-powered lead response, conversion-focused websites, personal branding, local SEO, and reputation management. Built for doctors, roofers, restaurants, and growing brands.",
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Our Services — Growth Escalators',
    description: 'Performance marketing, AI lead response, websites, personal branding, local SEO, and reputation management.',
    url: '/services',
    type: 'website',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
