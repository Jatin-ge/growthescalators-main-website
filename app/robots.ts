import type { MetadataRoute } from 'next'

const SITE = 'https://www.growthescalators.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // No disallow rules currently — every public route should be indexable.
        // If you ever add /api/* server actions or draft routes, disallow them here.
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
