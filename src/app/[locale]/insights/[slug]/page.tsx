import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { getInsightBySlug } from '@/models/insights';

interface InsightDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: InsightDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight || insight.status !== 'published') return {};

  const title = locale === 'ar' ? insight.titleAr : insight.titleEn;
  const excerpt = locale === 'ar' ? insight.excerptAr : insight.excerptEn;

  return { title: `${title} | Value Plus Egypt`, description: excerpt };
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight || insight.status !== 'published') notFound();

  const t = await getTranslations('insights');
  const locale = await getLocale();
  const isAr = locale === 'ar';

  const title = isAr ? insight.titleAr : insight.titleEn;
  const body = isAr ? insight.bodyAr : insight.bodyEn;

  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <Link href="/insights" className="text-sm font-medium text-navy-500 hover:text-gold-500">
          ← {t('backToInsights')}
        </Link>

        <span className="mt-6 inline-block rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-navy-600">
          {insight.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold text-navy-900">{title}</h1>
        {insight.publishedAt && (
          <p className="mt-2 text-sm text-navy-400">
            {t('publishedOn')} {new Date(insight.publishedAt).toLocaleDateString(locale)}
          </p>
        )}

        <div className="mt-8 whitespace-pre-wrap leading-relaxed text-navy-700">{body}</div>

        {insight.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-1.5 border-t border-navy-100 pt-6">
            {insight.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
                {t('relatedTag')}: {tag}
              </span>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
