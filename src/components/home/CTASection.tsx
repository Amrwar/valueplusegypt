'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function CTASection() {
  const t = useTranslations('cta');
  const { ref, isInView } = useInView();

  return (
    <section className="py-20">
      <Container>
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-2xl bg-navy-900 px-8 py-16 text-center sm:px-16 transition-all duration-700',
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          {/* Gold accents */}
          <div className="absolute start-0 top-0 h-1 w-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
          <div className="absolute -end-20 -top-20 h-40 w-40 rounded-full bg-gold-400/10" />
          <div className="absolute -start-20 -bottom-20 h-40 w-40 rounded-full bg-gold-400/10" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">
              {t('description')}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-lg bg-gold-400 px-8 py-3.5 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-300"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
