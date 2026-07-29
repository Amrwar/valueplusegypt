import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import PropertyCard from '@/components/properties/PropertyCard';
import { listProperties } from '@/models/properties';
import { PROPERTY_TYPES, PropertyType } from '@/types/crm';
import { cn } from '@/lib/utils';

const TYPE_LABEL_KEYS: Record<PropertyType, string> = {
  residential: 'typeResidential',
  commercial: 'typeCommercial',
  administrative: 'typeAdministrative',
  touristic: 'typeTouristic',
  land: 'typeLand',
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('properties');
  return {
    title: `${t('pageTitle')} | Value Plus Egypt`,
    description: t('pageSubtitle'),
  };
}

interface PropertiesPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const t = await getTranslations('properties');
  const params = await searchParams;
  const propertyType = PROPERTY_TYPES.includes(params.type as PropertyType)
    ? (params.type as PropertyType)
    : undefined;

  const result = listProperties({ status: 'published', propertyType, pageSize: 48 });

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
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <Link
              href="/properties"
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                !propertyType ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              )}
            >
              {t('filterAll')}
            </Link>
            {PROPERTY_TYPES.map((type) => (
              <Link
                key={type}
                href={`/properties?type=${type}`}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  propertyType === type ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                {t(TYPE_LABEL_KEYS[type])}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((property) => (
              <PropertyCard key={property.id} property={property} />
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
