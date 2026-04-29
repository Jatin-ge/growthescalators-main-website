'use client'

import Link from 'next/link'
import styles from './Footer.module.css'

const SERVICES = [
  'Performance Marketing',
  'Funnel Marketing',
  'Website Development',
  'SEO & Growth',
  'Personal Branding',
  'Social Media',
  'Branding & Identity',
]

const QUICK_LINKS: { label: string; href: string }[] = [
  { label: 'About Us',     href: '/about'     },
  { label: 'Our Work',     href: '/work'      },
  { label: 'Portfolio',    href: '/portfolio' },
  { label: 'Services',     href: '/services'  },
  { label: 'Blog',         href: '/blog'      },
  { label: 'Contact',      href: '/contact'   },
]

/* Industry landing pages — surfaced in the footer so they're crawlable
   from anywhere on the site (otherwise they're orphan pages SEO-wise). */
const INDUSTRIES: { label: string; href: string }[] = [
  { label: 'For Doctors',     href: '/doctors'     },
  { label: 'For Roofers',     href: '/roofing'     },
  { label: 'For Restaurants', href: '/restaurants' },
  { label: 'For Real Estate', href: '/real-estate' },
]

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className={`${styles.grid} container-x`}>
          {/* Col 1 — Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Growth Escalators home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png"
                alt="Growth Escalators logo"
                height={36}
                loading="lazy"
              />
            </Link>
            <p className={styles.tagline}>Your Growth, Our Mission</p>
            <p className={styles.blurb}>
              Jaipur&apos;s most results-obsessed performance marketing agency. We help brands across India scale through data, creativity, and execution.
            </p>
            <div className={styles.socials}>
              <a
                href="https://facebook.com/growthescalators"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialPill} glass-pill`}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com/growthescalators"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialPill} glass-pill`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com/company/growth-escalators"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialPill} glass-pill`}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.links}>
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick Links + Industries */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.links}>
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className={styles.colTitle} style={{ marginTop: 28 }}>Industries</h3>
            <ul className={styles.links}>
              {INDUSTRIES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Get In Touch</h3>
            <ul className={styles.contactList}>
              <li>
                <span aria-hidden="true">📞</span>
                <a href="tel:+917733888883">+91 77338 88883</a>
              </li>
              <li>
                <span aria-hidden="true">✉️</span>
                <a href="mailto:Info@growthescalators.com">Info@growthescalators.com</a>
              </li>
              <li>
                <span aria-hidden="true">📍</span>
                <address style={{ fontStyle: 'normal' }}>
                  264/103-104, Sector 26, Sanganer,
                  <br />
                  Pratap Nagar, Jaipur, Rajasthan 302033
                </address>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=264/103-104+Sector+26+Sanganer+Pratap+Nagar+Jaipur+Rajasthan+302033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.mapsPill} glass-pill`}
                >
                  🗺️ View on Google Maps ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomInner} container-x`}>
          {/* Hardcoded year to avoid SSR/CSR hydration mismatch on year-rollover. */}
          <p className={styles.copy}>© 2026 Growth Escalators, Jaipur. All Rights Reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
