'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
            'mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex flex-col md:flex-row">
            {/* Photo */}
            <div className="relative md:w-2/5">
              <div className="relative h-72 md:h-full md:min-h-[400px]">
                <Image
                  src="/images/president.jpg"
                  alt={t('leaderName')}
                  fill
                  className="object-cover object-top"
                />
                {/* Gold accent at bottom on mobile, at side on desktop */}
                <div className="absolute bottom-0 start-0 h-1 w-full bg-gold-400 md:h-full md:w-1 md:bottom-auto md:end-0 md:start-auto" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <div className="mb-4 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-gold-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  {t('leadershipTitle')}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-navy-900">
                {t('leaderName')}
              </h3>
              <p className="mt-1 text-sm font-semibold text-gold-500">
                {t('leaderRole')}
              </p>

              <div className="mt-1 h-px w-16 bg-navy-200" />

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
