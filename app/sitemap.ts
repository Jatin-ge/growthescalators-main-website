import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const SITE = 'https://www.growthescalators.com'

/* Static routes — keep in sync when new top-level pages are added.
   Industry landing pages and blog posts are added programmatically below. */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/',                       priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services',               priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work',                   priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/portfolio',              priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/about',                  priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact',                priority: 0.8, changeFrequency: 'yearly'  },
  { path: '/blog',                   priority: 0.9, changeFrequency: 'weekly'  },
  // Industry landing pages — high priority, conversion-focused
  { path: '/doctors',                priority: 0.9, changeFrequency: 'monthly' },
  { path: '/roofing',                priority: 0.9, changeFrequency: 'monthly' },
  { path: '/restaurants',            priority: 0.9, changeFrequency: 'monthly' },
  { path: '/real-estate',            priority: 0.9, changeFrequency: 'monthly' },
  // Legal — keep crawlable but low priority
  { path: '/privacy-policy',         priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/terms-and-conditions',   priority: 0.3, changeFrequency: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  // Blog posts are picked up automatically — drop a new .md file in
  // content/blog/ and it appears here on the next build.
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...postEntries]
}
