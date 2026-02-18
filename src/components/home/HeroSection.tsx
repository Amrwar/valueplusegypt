'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const t = useTranslations('hero');
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32 lg:py-40">
      {/* Layered background */}
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />

      {/* Subtle geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -end-1/4 h-[600px] w-[600px] rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -start-1/4 h-[500px] w-[500px] rounded-full bg-navy-500/10 blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gold-400/[0.03] blur-3xl" />
      </div>

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(197,165,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top gold accent */}
      <div className="absolute start-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

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
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-navy-200">
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
              className="inline-flex items-center rounded-lg border-2 border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-gold-400/60 hover:bg-white/5"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 start-0 h-20 w-full bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  );
}
