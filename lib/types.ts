export interface Service {
  id: number
  title: string
  description: string
  icon: string
  size: 'large' | 'tall' | 'medium' | 'wide' | 'standard'
}

export interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface WorkItem {
  id: number
  name: string
  category: string
  result: string
  gradient: string
}

export interface CaseStudyResult {
  metric: string
  value?: string
  from?: string
  to?: string
  icon: string
}

export interface CaseStudy {
  id: number
  slug: string
  name: string
  industry: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  tags: string[]
  gradient: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  rating: number
}

export interface NavLink {
  label: string
  href: string
}

export type CursorState = 'idle' | 'hover' | 'drag' | 'text'
