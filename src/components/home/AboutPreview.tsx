'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const stats = [
  { value: '45+', key: 'yearsExperience' },
  { value: '200+', key: 'projectsCompleted' },
  { value: '50+', key: 'clientsSatisfied' },
];

export default function AboutPreview() {
  const t = useTranslations('aboutPreview');
  const { ref, isInView } = useInView();

  return (
    <section className="bg-navy-50 py-20">
      <Container>
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text side */}
          <div className={cn(
            'transition-all duration-700',
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          )}>
            <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">
              {t('title')}
            </h2>
            <div className="mt-3 h-1 w-20 rounded bg-gold-400" />
            <p className="mt-6 text-lg leading-relaxed text-navy-700">
              {t('description')}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              {t('learnMore')}
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats side */}
          <div className={cn(
            'transition-all duration-700 delay-200',
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="text-3xl font-bold text-gold-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-navy-600">
                    {t(stat.key)}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative image placeholder */}
            <div className="mt-6 overflow-hidden rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 text-center">
              <div className="text-5xl mb-3">🏗️</div>
              <p className="text-sm text-navy-300">Value Plus Egypt</p>
              <p className="text-xs text-navy-400">Investment Consultancy</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
