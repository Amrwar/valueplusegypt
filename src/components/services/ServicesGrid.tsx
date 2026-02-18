'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/services/ServiceCard';
import { SERVICE_KEYS, SERVICE_IMAGES } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

export default function ServicesGrid() {
  const t = useTranslations();
  const { ref, isInView } = useInView();

  return (
    <>
      <SectionHeading
        title={t('services.pageTitle')}
        subtitle={t('services.pageSubtitle')}
      />

      <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KEYS.map((key, index) => (
          <ServiceCard
            key={key}
            title={t(`services.${key}.title`)}
            description={t(`services.${key}.description`)}
            image={SERVICE_IMAGES[key]}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </>
  );
}
