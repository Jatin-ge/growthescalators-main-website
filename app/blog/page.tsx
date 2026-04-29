import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { getAllPosts, formatPostDate } from '@/lib/blog'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog — Growth Escalators',
  description:
    "AI-first marketing playbooks for doctors, roofers, restaurants, and growing brands. Hard-won lessons, no fluff.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Growth Escalators',
    description: 'AI-first marketing playbooks for doctors, roofers, restaurants, and growing brands.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className={styles.page}>
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={`${styles.headerInner} container-x`}>
          <Link href="/" className={styles.logo} aria-label="Growth Escalators home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png"
              alt="Growth Escalators"
              loading="eager"
            />
          </Link>
          <Link href="/contact" className={`btn-primary ${styles.headerCta}`}>
            Book a Free Call
          </Link>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroAurora} aria-hidden>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
        </div>
        <div className={`${styles.heroInner} container-x`}>
          <span className="section-tag">PLAYBOOKS &amp; FIELD NOTES</span>
          <h1 className={styles.heroTitle}>The Growth Escalators Blog</h1>
          <p className={styles.heroSub}>
            AI-first marketing playbooks for doctors, roofers, restaurants, and growing brands. Hard-won
            lessons from running over ₹10Cr in ad spend, not regurgitated theory.
          </p>
        </div>
      </section>

      {/* ── POST GRID ──────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container-x">
          {posts.length === 0 ? (
            <p className={styles.emptyState}>
              No posts yet — the first ones are being written. Check back soon.
            </p>
          ) : (
            <div className={styles.grid}>
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.card}>
                  <div className={`${styles.thumb} ${styles[`grad_${p.gradient ?? 'mixed'}`]}`}>
                    <span className={styles.thumbTitle}>{p.title}</span>
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.metaTags}>
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <p className={styles.cardDesc}>{p.description}</p>
                    <div className={styles.metaBottom}>
                      <span>{formatPostDate(p.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{p.readingTimeMins} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
