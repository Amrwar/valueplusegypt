import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutPreview from '@/components/home/AboutPreview';
import ClientsSlider from '@/components/home/ClientsSlider';
import CTASection from '@/components/home/CTASection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <AboutPreview />
      <ClientsSlider />
      <CTASection />
    </>
  );
}
