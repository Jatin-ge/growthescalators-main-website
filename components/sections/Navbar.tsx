'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { NAV_LINKS } from '@/lib/constants'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 })
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center select-none">
            <span
              className="font-syne font-extrabold"
              style={{ fontSize: '1.15rem', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text-primary)' }}
            >
              <span style={{ color: 'var(--orange)' }}>G</span>rowth Escalators
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-outfit text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--orange)' : 'var(--text-muted)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] transition-all duration-300 ease-out origin-left"
                    style={{ width: isActive ? '100%' : '0%', background: 'var(--orange)' }}
                  />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="a"
              href="/contact"
              className="hidden md:inline-flex font-outfit font-semibold text-sm px-5 py-2.5"
              style={{ border: '1.5px solid var(--orange)', color: 'var(--orange)', background: 'transparent' }}
            >
              Get Free Audit →
            </MagneticButton>

            <button
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    background: 'var(--text-primary)',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform: i === 0 && menuOpen ? 'rotate(45deg) translateY(6px)'
                      : i === 2 && menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500"
        style={{
          background: 'var(--bg-primary)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-16px)',
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-syne font-bold text-4xl transition-all duration-300"
              style={{
                color: pathname === link.href ? 'var(--orange)' : 'var(--text-primary)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
