import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PropertyListing } from '@/types/crm';

export default function PropertyCard({ property }: { property: PropertyListing }) {
  const t = useTranslations('properties');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const title = isAr ? property.titleAr : property.titleEn;
  const summary = isAr ? property.summaryAr : property.summaryEn;
  const location = isAr ? property.locationAr : property.locationEn;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-xl border border-navy-100 transition-all duration-300 hover:border-gold-400 hover:shadow-lg"
    >
      {property.image ? (
        <div className="relative h-48 overflow-hidden bg-navy-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {property.featured && (
            <span className="absolute top-3 start-3 rounded-full bg-gold-400 px-2.5 py-0.5 text-xs font-semibold text-navy-950">
              ★
            </span>
          )}
        </div>
      ) : (
        <div className="h-1.5 bg-gradient-to-r from-navy-900 to-gold-400" />
      )}

      <div className="p-6">
        <h3 className="text-lg font-bold text-navy-900">{title}</h3>
        <p className="mt-1 text-sm text-navy-500">{location}</p>
        <p className="mt-3 line-clamp-2 text-sm text-navy-600">{summary}</p>

        <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4 text-sm">
          <span className="font-semibold text-navy-900">
            {property.priceEgp.toLocaleString()} {t('egp')}
          </span>
          {property.areaSqm > 0 && (
            <span className="text-navy-500">
              {property.areaSqm} {t('sqm')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
