import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Insight } from '@/types/crm';

export default function InsightCard({ insight }: { insight: Insight }) {
  const t = useTranslations('insights');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const title = isAr ? insight.titleAr : insight.titleEn;
  const excerpt = isAr ? insight.excerptAr : insight.excerptEn;

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group block rounded-xl border border-navy-100 p-6 transition-all duration-300 hover:border-gold-400 hover:shadow-lg"
    >
      <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-navy-600">
        {insight.category}
      </span>
      <h3 className="mt-3 text-lg font-bold text-navy-900 group-hover:text-navy-700">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-navy-600">{excerpt}</p>
      {insight.publishedAt && (
        <p className="mt-4 text-xs text-navy-400">
          {t('publishedOn')} {new Date(insight.publishedAt).toLocaleDateString(locale)}
        </p>
      )}
    </Link>
  );
}
