'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function CompanyInfo() {
  const t = useTranslations('about');
  const { ref, isInView } = useInView();

  return (
    <section className="py-20">
      <Container>
        <div ref={ref}>
          {/* Company Overview */}
          <div className={cn(
            'mx-auto max-w-3xl text-center transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <h2 className="text-3xl font-bold text-navy-900">{t('companyTitle')}</h2>
            <div className="mt-3 mx-auto h-1 w-20 rounded bg-gold-400" />
            <p className="mt-6 text-lg leading-relaxed text-navy-700">
              {t('companyDescription')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className={cn(
              'rounded-xl border border-navy-100 p-8 transition-all duration-700 delay-200',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-bold text-navy-900">{t('mission')}</h3>
              <p className="mt-3 text-navy-600 leading-relaxed">{t('missionText')}</p>
            </div>

            <div className={cn(
              'rounded-xl border border-navy-100 p-8 transition-all duration-700 delay-300',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 text-2xl">
                🔭
              </div>
              <h3 className="text-xl font-bold text-navy-900">{t('vision')}</h3>
              <p className="mt-3 text-navy-600 leading-relaxed">{t('visionText')}</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20">
            <h2 className="text-center text-3xl font-bold text-navy-900">{t('whyTitle')}</h2>
            <div className="mt-3 mx-auto h-1 w-20 rounded bg-gold-400" />

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {(['why1', 'why2', 'why3', 'why4'] as const).map((key, index) => (
                <div
                  key={key}
                  className={cn(
                    'text-center transition-all duration-700',
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: isInView ? `${(index + 4) * 100}ms` : '0ms' }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-50">
                    <span className="text-2xl">
                      {index === 0 && '👥'}
                      {index === 1 && '📊'}
                      {index === 2 && '🔄'}
                      {index === 3 && '🌍'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm text-navy-600 leading-relaxed">
                    {t(`${key}Text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
