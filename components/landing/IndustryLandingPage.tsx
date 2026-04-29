'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import VideoTestimonialsShorts, {
  type VideoTestimonial,
} from '@/components/landing/VideoTestimonialsShorts'
import LeadForm from '@/components/landing/LeadForm'
import styles from './IndustryLandingPage.module.css'

/* ── Typed content shape that every industry page must provide ───────────── */
export type LandingContent = {
  hero: {
    badge: string
    headlineLines: [string, string]
    cyclingWords: string[]
    subhead: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    statPills: { emoji: string; value: string; label: string }[]
  }
  painPoints: { emoji: string; title: string; body: string }[]
  painPointsTag?: string
  painPointsHeadline?: string
  aiAdvantage?: {
    tag: string
    headline: string
    subhead?: string
    cards: { emoji: string; title: string; body: string }[]
  }
  services: { title: string; body: string }[]
  servicesTag?: string
  servicesHeadline?: string
  servicesSubhead?: string
  resultHighlight: {
    label?: string
    name: string
    detail: string
    quote: string
    metrics: { value: string; label: string }[]
  }
  resultsTag?: string
  resultsHeadline?: string
  process: { step: string; title: string; body: string }[]
  processTag?: string
  processHeadline?: string
  whyUs: { title: string; body: string }[]
  whyUsTag?: string
  whyUsHeadline?: string
  faqs: { q: string; a: string }[]
  faqsTag?: string
  faqsHeadline?: string
  finalCta: { title: string; subhead: string; ctaLabel: string }
  videoTestimonials: VideoTestimonial[]
  videoTestimonialsTag?: string
  videoTestimonialsHeadline?: string
  videoTestimonialsSubhead?: string
  leadForm: {
    recipient?: string
    subjectPrefix?: string
    headline?: string
    subhead?: string
    tag?: string
  }
  /** Used in the mailto subject + a tiny header chip if you want it. */
  industryLabel?: string
}

/* ── Cycling word hook ── */
function useCyclingWord(words: string[], intervalMs = 2400) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (words.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(t)
  }, [words, intervalMs])
  return words[idx] ?? ''
}

/* ── FAQ accordion item ── */
function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button
        type="button"
        className={styles.faqHead}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <span className={styles.faqIcon} aria-hidden>+</span>
      </button>
      {open && <div className={styles.faqBody}>{a}</div>}
    </div>
  )
}

/* ── JSON-LD FAQPage schema — emits the industry's FAQs as structured data
   so they're eligible for FAQ rich-results in Google, which significantly
   increases SERP click-through rate. */
function FaqPageJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (faqs.length === 0) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function IndustryLandingPage({ content }: { content: LandingContent }) {
  const cycle = useCyclingWord(content.hero.cyclingWords)

  return (
    <div className={styles.page}>
      <FaqPageJsonLd faqs={content.faqs} />

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
          <a href="#lead-form" className={`btn-primary ${styles.headerCta}`}>
            Book a Free Call
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroAurora} aria-hidden>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
        </div>
        <div className={`${styles.heroInner} container-x`}>
          <motion.span
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.hero.badge}
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            {content.hero.headlineLines[0]}
            <br />
            {content.hero.headlineLines[1]}
          </motion.h1>

          <motion.div
            className={styles.heroCycle}
            key={cycle}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {cycle}
          </motion.div>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.hero.subhead}
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href={content.hero.primaryCta.href} className="btn-primary">
              {content.hero.primaryCta.label}
            </a>
            <a href={content.hero.secondaryCta.href} className="btn-outline">
              {content.hero.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            className={styles.heroPills}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {content.hero.statPills.map((p) => (
              <span key={p.label} className={`glass-pill ${styles.heroPill}`}>
                <span className={styles.heroPillEmoji}>{p.emoji}</span>
                <span className={styles.heroPillValue}>{p.value}</span>
                <span>{p.label}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="Pain points">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.painPointsTag ?? 'SOUND FAMILIAR?'}</span>
            <h2 className={styles.sectionHeadline}>
              {content.painPointsHeadline ?? "What's really holding you back"}
            </h2>
          </div>
          <div className={styles.painGrid}>
            {content.painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.painCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className={styles.painEmoji}>{p.emoji}</div>
                <h3 className={styles.painTitle}>{p.title}</h3>
                <p className={styles.painBody}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ADVANTAGE (optional) ───────────────────────────────────── */}
      {content.aiAdvantage && (
        <section className={styles.aiSection} aria-label="AI advantage">
          <div className={styles.aiAurora} aria-hidden>
            <div className={styles.aiOrb1} />
            <div className={styles.aiOrb2} />
          </div>
          <div className={`${styles.aiInner} container-x`}>
            <div className={styles.sectionHeader}>
              <span className={`section-tag ${styles.aiTag}`}>{content.aiAdvantage.tag}</span>
              <h2 className={styles.sectionHeadline}>{content.aiAdvantage.headline}</h2>
              {content.aiAdvantage.subhead && (
                <p className={styles.sectionSub}>{content.aiAdvantage.subhead}</p>
              )}
            </div>
            <div className={styles.aiGrid}>
              {content.aiAdvantage.cards.map((c, i) => (
                <motion.div
                  key={c.title}
                  className={styles.aiCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div className={styles.aiCardEmoji}>{c.emoji}</div>
                  <h3 className={styles.aiCardTitle}>{c.title}</h3>
                  <p className={styles.aiCardBody}>{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="Services">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.servicesTag ?? 'WHAT WE DO'}</span>
            <h2 className={styles.sectionHeadline}>
              {content.servicesHeadline ?? 'Everything you need, under one roof'}
            </h2>
            {content.servicesSubhead && (
              <p className={styles.sectionSub}>{content.servicesSubhead}</p>
            )}
          </div>
          <div className={styles.svcGrid}>
            {content.services.map((s, i) => (
              <motion.div
                key={s.title}
                className={styles.svcCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              >
                <h3 className={styles.svcTitle}>{s.title}</h3>
                <p className={styles.svcBody}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULT HIGHLIGHT ───────────────────────────────────────────── */}
      <section className={styles.section} id="results" aria-label="Featured result">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.resultsTag ?? 'REAL RESULTS'}</span>
            <h2 className={styles.sectionHeadline}>
              {content.resultsHeadline ?? 'Clients we&rsquo;ve helped grow'}
            </h2>
          </div>
          <motion.div
            className={styles.resultBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className={styles.resultMeta}>{content.resultHighlight.label ?? 'FEATURED CLIENT'}</p>
              <h3 className={styles.resultDoctor}>{content.resultHighlight.name}</h3>
              <p className={styles.resultSpec}>{content.resultHighlight.detail}</p>
              <blockquote className={styles.resultQuote}>{content.resultHighlight.quote}</blockquote>
            </div>
            <div className={styles.resultMetrics}>
              {content.resultHighlight.metrics.map((m) => (
                <div key={m.label} className={styles.metric}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ─────────────────────────────────────────── */}
      <VideoTestimonialsShorts
        videos={content.videoTestimonials}
        tag={content.videoTestimonialsTag ?? 'HEAR FROM OUR CLIENTS'}
        headline={content.videoTestimonialsHeadline ?? 'Real clients, real outcomes'}
        subhead={content.videoTestimonialsSubhead}
      />

      {/* ── PROCESS ────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="Process">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.processTag ?? 'HOW IT WORKS'}</span>
            <h2 className={styles.sectionHeadline}>
              {content.processHeadline ?? 'Four steps, zero guesswork'}
            </h2>
          </div>
          <div className={styles.procGrid}>
            {content.process.map((p, i) => (
              <motion.div
                key={p.step}
                className={styles.procCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className={styles.procStep}>{p.step}</div>
                <h3 className={styles.procTitle}>{p.title}</h3>
                <p className={styles.procBody}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="Why us">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.whyUsTag ?? 'WHY GROWTH ESCALATORS'}</span>
            <h2 className={styles.sectionHeadline}>
              {content.whyUsHeadline ?? 'Not your average agency'}
            </h2>
          </div>
          <div className={styles.whyGrid}>
            {content.whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                className={styles.whyCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.07 }}
              >
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ──────────────────────────────────────────────────── */}
      <LeadForm
        recipient={content.leadForm.recipient ?? 'Info@growthescalators.com'}
        subjectPrefix={content.leadForm.subjectPrefix ?? `New ${content.industryLabel ?? 'Industry'} Lead`}
        headline={content.leadForm.headline}
        subhead={content.leadForm.subhead}
        tag={content.leadForm.tag}
      />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="FAQ">
        <div className="container-x">
          <div className={styles.sectionHeader}>
            <span className="section-tag">{content.faqsTag ?? 'QUESTIONS, ANSWERED'}</span>
            <h2 className={styles.sectionHeadline}>{content.faqsHeadline ?? 'Frequently asked'}</h2>
          </div>
          <div className={styles.faqList}>
            {content.faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className={styles.ctaBanner} aria-label="Final call to action">
        <div className="container-x">
          <h2 className={styles.ctaTitle}>{content.finalCta.title}</h2>
          <p className={styles.ctaSub}>{content.finalCta.subhead}</p>
          <a href="#lead-form" className="btn-primary">
            {content.finalCta.ctaLabel}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
