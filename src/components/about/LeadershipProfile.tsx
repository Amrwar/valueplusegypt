'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function LeadershipProfile() {
  const t = useTranslations('about');
  const { ref, isInView } = useInView();

  return (
    <section className="bg-navy-50 py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold text-navy-900">
          {t('leadershipTitle')}
        </h2>
        <div className="mt-3 mx-auto h-1 w-20 rounded bg-gold-400" />

        <div
          ref={ref}
          className={cn(
            'mx-auto mt-12 max-w-3xl rounded-xl bg-white p-8 shadow-sm transition-all duration-700 sm:p-10',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar placeholder */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy-900 text-3xl text-gold-400">
              SS
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-900">
                {t('leaderName')}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold-500">
                {t('leaderRole')}
              </p>
              <p className="mt-4 text-navy-600 leading-relaxed">
                {t('leaderBio')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
