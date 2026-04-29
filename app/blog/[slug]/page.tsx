import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
  formatPostDate,
  type Post,
} from '@/lib/blog'
import styles from './post.module.css'
import indexStyles from '../page.module.css'

/* ── Static params: prerender every post at build time ───────────────── */
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

/* ── Per-post metadata: title, description, OG, canonical ────────────── */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return { title: 'Not found' }
  return {
    title: `${post.title} — Growth Escalators`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

/* ── JSON-LD: Article schema for rich-results eligibility ────────────── */
function ArticleJsonLd({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Growth Escalators',
      logo: {
        '@type': 'ImageObject',
        url: 'https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.growthescalators.com/blog/${post.slug}`,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  const related = getRelatedPosts(post, 2)

  return (
    <div className={indexStyles.page}>
      <ArticleJsonLd post={post} />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className={indexStyles.header}>
        <div className={`${indexStyles.headerInner} container-x`}>
          <Link href="/" className={indexStyles.logo} aria-label="Growth Escalators home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://growthescalators.com/wp-content/uploads/2023/10/growth-escalator-logo.png"
              alt="Growth Escalators"
              loading="eager"
            />
          </Link>
          <Link href="/contact" className={`btn-primary ${indexStyles.headerCta}`}>
            Book a Free Call
          </Link>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className={`${styles.hero} ${indexStyles[`grad_${post.gradient ?? 'mixed'}`]}`}>
        <div className={`${styles.heroInner} container-x`}>
          <Link href="/blog" className={styles.backLink}>
            ← All posts
          </Link>
          <div className={styles.heroTags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.heroTag}>{t}</span>
            ))}
          </div>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <div className={styles.heroMeta}>
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatPostDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTimeMins} min read</span>
          </div>
        </div>
      </section>

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <article className={styles.body}>
        <div className={`${styles.bodyInner} container-x`}>
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          {/* Inline CTA at end of post */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Want help applying this to your business?</h3>
            <p className={styles.ctaSub}>
              Book a free, no-obligation strategy call. We&apos;ll review what you&apos;re doing today
              and tell you the three highest-ROI fixes — whether you hire us or not.
            </p>
            <Link
              href={post.ctaHref ?? '/contact'}
              className="btn-primary"
            >
              {post.ctaLabel ?? 'Book a free strategy call'}
            </Link>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container-x">
            <h2 className={styles.relatedHeadline}>Keep reading</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={indexStyles.card}>
                  <div className={`${indexStyles.thumb} ${indexStyles[`grad_${p.gradient ?? 'mixed'}`]}`}>
                    <span className={indexStyles.thumbTitle}>{p.title}</span>
                  </div>
                  <div className={indexStyles.meta}>
                    <h3 className={indexStyles.cardTitle}>{p.title}</h3>
                    <p className={indexStyles.cardDesc}>{p.description}</p>
                    <div className={indexStyles.metaBottom}>
                      <span>{formatPostDate(p.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{p.readingTimeMins} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
