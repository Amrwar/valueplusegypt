import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { getPropertyBySlug } from '@/models/properties';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const property = getPropertyBySlug(slug);
  if (!property || property.status !== 'published') return {};

  const title = locale === 'ar' ? property.titleAr : property.titleEn;
  const summary = locale === 'ar' ? property.summaryAr : property.summaryEn;

  return { title: `${title} | Value Plus Egypt`, description: summary };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property || property.status !== 'published') notFound();

  const t = await getTranslations('properties');
  const locale = await getLocale();
  const isAr = locale === 'ar';

  const title = isAr ? property.titleAr : property.titleEn;
  const location = isAr ? property.locationAr : property.locationEn;
  const description = isAr ? property.descriptionAr : property.descriptionEn;
  const amenities = isAr ? property.amenitiesAr : property.amenitiesEn;

  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Link href="/properties" className="text-sm font-medium text-navy-500 hover:text-gold-500">
          ← {t('backToListings')}
        </Link>

        {property.image && (
          <div className="mt-6 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={property.image} alt={title} className="h-72 w-full object-cover" />
          </div>
        )}

        <h1 className="mt-6 text-3xl font-bold text-navy-900">{title}</h1>
        <p className="mt-2 text-navy-500">{location}</p>

        <div className="mt-6 flex flex-wrap gap-6 rounded-xl border border-navy-100 bg-navy-50 p-5">
          <div>
            <p className="text-xs font-semibold uppercase text-navy-400">{t('priceLabel')}</p>
            <p className="text-lg font-bold text-navy-900">
              {property.priceEgp.toLocaleString()} {t('egp')}
            </p>
          </div>
          {property.areaSqm > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase text-navy-400">{t('areaLabel')}</p>
              <p className="text-lg font-bold text-navy-900">
                {property.areaSqm} {t('sqm')}
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 whitespace-pre-wrap leading-relaxed text-navy-700">{description}</p>

        {amenities.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">{t('amenities')}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
