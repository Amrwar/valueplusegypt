'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const t = useTranslations('hero');
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32 lg:py-40">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #C5A55A 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gold accent line */}
      <div className="absolute start-0 top-0 h-1 w-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />

      <Container>
        <div ref={ref} className={cn(
          'relative mx-auto max-w-3xl text-center transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-xl font-medium text-gold-400 sm:text-2xl">
            {t('subtitle')}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-navy-200">
            {t('description')}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/services"
              className="inline-flex items-center rounded-lg bg-gold-400 px-8 py-3.5 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-300"
            >
              {t('cta')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
