import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import CompanyInfo from '@/components/about/CompanyInfo';
import LeadershipProfile from '@/components/about/LeadershipProfile';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      {/* Page header */}
      <section className="bg-navy-900 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {t('pageTitle')}
            </h1>
            <p className="mt-3 text-lg text-navy-200">
              {t('pageSubtitle')}
            </p>
            <div className="mt-4 mx-auto h-1 w-20 rounded bg-gold-400" />
          </div>
        </Container>
      </section>

      <CompanyInfo />
      <LeadershipProfile />
    </>
  );
}
