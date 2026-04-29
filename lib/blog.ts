/**
 * Blog data layer.
 *
 * Posts live as Markdown files in content/blog/<slug>.md with frontmatter.
 * This module is the single source of truth for reading them — page.tsx
 * files should import from here, not from the filesystem directly.
 *
 * All file IO happens at build time (Next.js App Router runs these
 * functions during static generation), so there's no runtime fs cost.
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostFrontmatter {
  title: string
  description: string
  /** ISO date string, e.g. "2026-04-30" */
  date: string
  author: string
  /** Tags shown on the post and used for related-post matching */
  tags: string[]
  /** Optional URL of an external page this post should funnel readers to */
  ctaHref?: string
  /** Optional CTA label (defaults to "Book a free strategy call") */
  ctaLabel?: string
  /** Hero gradient — "orange" | "violet" | "teal" | "mixed" */
  gradient?: 'orange' | 'violet' | 'teal' | 'mixed'
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTimeMins: number
}

export interface Post extends PostMeta {
  /** Rendered HTML body (already converted from markdown) */
  bodyHtml: string
  /** Raw markdown body, if you want to render it yourself */
  bodyMarkdown: string
}

/* ── Internal: read & parse a single .md file ────────────────────────── */
function readPostFile(slug: string): { fm: PostFrontmatter; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  return {
    fm: parsed.data as PostFrontmatter,
    content: parsed.content,
  }
}

function estimateReadingTime(markdown: string): number {
  // Simple ~225 wpm heuristic. Strip frontmatter-y noise just in case.
  const words = markdown.replace(/[#>*_`\-]/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
}

/* ── Public API ───────────────────────────────────────────────────────── */

/** All post slugs (no extension). Used by generateStaticParams + sitemap. */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

/** All post metadata, sorted by date descending (newest first). */
export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const file = readPostFile(slug)
      if (!file) return null
      return {
        slug,
        ...file.fm,
        readingTimeMins: estimateReadingTime(file.content),
      } satisfies PostMeta
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** Single post (with rendered HTML). Returns null for unknown slugs. */
export function getPost(slug: string): Post | null {
  const file = readPostFile(slug)
  if (!file) return null
  // marked.parse can be sync if we pass async:false (default). v14 returns string.
  const bodyHtml = marked.parse(file.content, { async: false }) as string
  return {
    slug,
    ...file.fm,
    readingTimeMins: estimateReadingTime(file.content),
    bodyHtml,
    bodyMarkdown: file.content,
  }
}

/** Up to N other posts that share at least one tag with `current`. */
export function getRelatedPosts(current: PostMeta, n = 2): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug)
  const scored = all.map((p) => {
    const overlap = p.tags.filter((t) => current.tags.includes(t)).length
    return { post: p, score: overlap }
  })
  scored.sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
  return scored.slice(0, n).map((s) => s.post)
}

/** Format an ISO date string as e.g. "April 30, 2026". */
export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
