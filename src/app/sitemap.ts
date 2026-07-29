import { MetadataRoute } from 'next';
import { listInsights } from '@/models/insights';
import { listProperties } from '@/models/properties';

const BASE_URL = 'https://www.valuepluseg.org';
const locales = ['en', 'ar'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/',              priority: 1.0, changeFrequency: 'weekly'  as const },
    { path: '/services',      priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about',         priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects',      priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/properties',    priority: 0.8, changeFrequency: 'daily'   as const },
    { path: '/insights',      priority: 0.7, changeFrequency: 'daily'   as const },
    { path: '/consultation',  priority: 0.8, changeFrequency: 'yearly'  as const },
    { path: '/testimonials',  priority: 0.6, changeFrequency: 'weekly'  as const },
    { path: '/contact',       priority: 0.7, changeFrequency: 'yearly'  as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page.path}`,
            ar: `${BASE_URL}/ar${page.path}`,
          },
        },
      });
    }

    const { items: properties } = listProperties({ status: 'published', pageSize: 100 });
    for (const property of properties) {
      entries.push({
        url: `${BASE_URL}/${locale}/properties/${property.slug}`,
        lastModified: new Date(property.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }

    const { items: insights } = listInsights({ status: 'published', pageSize: 100 });
    for (const insight of insights) {
      entries.push({
        url: `${BASE_URL}/${locale}/insights/${insight.slug}`,
        lastModified: new Date(insight.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
