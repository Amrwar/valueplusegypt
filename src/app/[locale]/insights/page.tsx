import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import InsightCard from '@/components/insights/InsightCard';
import { listInsights } from '@/models/insights';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('insights');
  return {
    title: `${t('pageTitle')} | Value Plus Egypt`,
    description: t('pageSubtitle'),
  };
}

export default async function InsightsPage() {
  const t = await getTranslations('insights');
  const result = listInsights({ status: 'published', pageSize: 48 });

  return (
    <>
      <section className="bg-navy-900 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{t('pageTitle')}</h1>
            <p className="mt-3 text-lg text-navy-200">{t('pageSubtitle')}</p>
            <div className="mx-auto mt-4 h-1 w-20 rounded bg-gold-400" />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>

          {result.items.length === 0 && (
            <p className="py-12 text-center text-navy-500">{t('noResults')}</p>
          )}
        </Container>
      </section>
    </>
  );
}
