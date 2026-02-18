import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ServicesGrid from '@/components/services/ServicesGrid';

const BASE_URL = 'https://www.valuepluseg.org';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isAr = locale === 'ar';

  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
    keywords: isAr
      ? ['خدمات فاليو بلس مصر', 'فاليو بلس', 'دراسات جدوى اقتصادية', 'هندسة القيمة', 'استشارات عقارية', 'حصر كميات', 'مصر']
      : ['Value Plus Egypt services', 'ValuePlus services', 'economic feasibility studies Egypt', 'value engineering', 'real estate consultancy Egypt', 'quantity surveying', 'investment consultancy'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        'en': `${BASE_URL}/en/services`,
        'ar': `${BASE_URL}/ar/services`,
      },
    },
    openGraph: {
      title: t('servicesTitle'),
      description: t('servicesDescription'),
      url: `${BASE_URL}/${locale}/services`,
      siteName: 'Value Plus Egypt',
      locale: isAr ? 'ar_EG' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_EG',
      type: 'website',
      images: [{ url: `${BASE_URL}/images/logo.jpg`, alt: 'Value Plus Egypt Services' }],
    },
    twitter: {
      card: 'summary',
      title: t('servicesTitle'),
      description: t('servicesDescription'),
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-20">
      <Container>
        <ServicesGrid />
      </Container>
    </section>
  );
}
