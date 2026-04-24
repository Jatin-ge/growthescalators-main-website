'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

const SERVICE_LINKS = [
  'Performance Marketing',
  'Funnel Marketing',
  'Website Development',
  'Personal Branding',
  'Social Media Marketing',
  'Branding & Identity',
  'SEO',
]

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const footerRef   = useRef<HTMLElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wordmarkRef.current || !footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0 },
        {
          opacity: 0.055,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    // FIXED: Pass footerRef as the scope so gsap.context scopes correctly to
    // the footer element. Previously called without a scope argument which
    // defaults to document — meaning cleanup on revert() would attempt to
    // revert tweens matched across the whole document, not just the footer.
    }, footerRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      data-animate="footer"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="font-syne font-extrabold text-xl mb-3 inline-block" style={{ color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--orange)' }}>G</span>rowth Escalators
            </Link>
            <p
              className="font-outfit font-light text-sm mb-6 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Your Growth, Our Mission. Jaipur-based digital marketing agency scaling brands across India and beyond.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4
              className="font-outfit text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: 'var(--orange)' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="font-outfit font-light text-sm transition-colors duration-300 hover:opacity-80"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <h4
              className="font-outfit text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: 'var(--orange)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-outfit font-light text-sm transition-colors duration-300 hover:opacity-80"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4
              className="font-outfit text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: 'var(--orange)' }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <div className="font-outfit text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Email</div>
                <a
                  href="mailto:Info@growthescalators.com"
                  className="font-outfit text-sm transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                >
                  Info@growthescalators.com
                </a>
              </div>
              <div>
                <div className="font-outfit text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Phone</div>
                <a
                  href="tel:+917733888883"
                  className="font-outfit text-sm transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                >
                  +91 77338 88883
                </a>
              </div>
              <div>
                <div className="font-outfit text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Location</div>
                <p className="font-outfit font-light text-sm" style={{ color: 'var(--text-muted)' }}>
                  Jaipur, Rajasthan, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className="mt-14 pt-8 text-center"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="font-outfit text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            © 2025 Growth Escalators. All Rights Reserved. Jaipur, Rajasthan.
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        ref={wordmarkRef}
        className="w-full overflow-hidden pb-2 opacity-0"
        aria-hidden="true"
      >
        <div
          className="font-syne font-extrabold text-center whitespace-nowrap leading-none select-none"
          style={{
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(28px, 7vw, 110px)',
          }}
        >
          GROWTH ESCALATORS
        </div>
      </div>
    </footer>
  )
}
