'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { FEATURED_SERVICES, SERVICE_IMAGES } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function ServicesOverview() {
  const t = useTranslations();
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title={t('servicesOverview.title')}
          subtitle={t('servicesOverview.subtitle')}
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_SERVICES.map((key, index) => (
            <div
              key={key}
              className={cn(
                'group flex flex-col rounded-xl border border-navy-100 overflow-hidden bg-white transition-all duration-500 hover:border-gold-400 hover:shadow-lg',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8',
              )}
              style={{ transitionDelay: isInView ? `${index * 100}ms` : '0ms' }}
            >
              {SERVICE_IMAGES[key] && (
                <div className="relative h-40 bg-white overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[key]}
                    alt={t(`services.${key}.title`)}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-semibold text-navy-900">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-navy-600">
                  {t(`services.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {t('servicesOverview.viewAll')}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
