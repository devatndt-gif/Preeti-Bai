import type { MetadataRoute } from 'next'
import { getCreatives } from '@/lib/creatives'
import { PRODUCTS } from '@/lib/products'
import { SITE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  // /gallery is only worth listing once there is artwork on it.
  const hasCreatives = (await getCreatives()).length > 0

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/products`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE.url}/contact`, changeFrequency: 'yearly', priority: 0.9 },
    ...(hasCreatives
      ? ([{ url: `${SITE.url}/gallery`, changeFrequency: 'weekly', priority: 0.7 }] as const)
      : []),
    { url: `${SITE.url}/join-our-team`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    changeFrequency: 'monthly',
    priority: p.featured ? 0.9 : 0.7,
  }))

  return [...staticRoutes, ...productRoutes].map((entry) => ({
    ...entry,
    lastModified: now,
  }))
}
