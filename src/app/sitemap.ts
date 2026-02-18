import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.valuepluseg.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '',          priority: 1.0, changeFrequency: 'weekly'  as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about',    priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact',  priority: 0.7, changeFrequency: 'yearly'  as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ['en', 'ar']) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
