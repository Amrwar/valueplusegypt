import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutPreview from '@/components/home/AboutPreview';
import ClientsSlider from '@/components/home/ClientsSlider';
import CTASection from '@/components/home/CTASection';

const BASE_URL = 'https://www.valuepluseg.org';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isAr = locale === 'ar';

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: isAr
      ? ['فاليو بلس مصر', 'فاليو بلس', 'شريف الصفطاوي', 'شريف سعيد الصفطاوي', 'دراسات جدوى اقتصادية', 'هندسة القيمة', 'استشارات استثمارية', 'خدمات عقارية', 'مصر']
      : ['Value Plus Egypt', 'ValuePlus Egypt', 'ValuePlus', 'Sherif El Saftawy', 'Sherif Said El Saftawy', 'feasibility studies Egypt', 'value engineering', 'investment consultancy Egypt', 'real estate services Egypt'],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'ar': `${BASE_URL}/ar`,
      },
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: `${BASE_URL}/${locale}`,
      siteName: 'Value Plus Egypt',
      locale: isAr ? 'ar_EG' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_EG',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/logo.jpg`,
          alt: 'Value Plus Egypt',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [`${BASE_URL}/images/logo.jpg`],
    },
  };
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Value Plus Egypt',
  alternateName: ['ValuePlus Egypt', 'ValuePlus', 'فاليو بلس مصر', 'فاليو بلس'],
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.jpg`,
  description:
    'Leading investment consultancy firm specializing in economic feasibility studies, value engineering, and comprehensive real estate services in Egypt and the Middle East.',
  foundingLocation: { '@type': 'Place', name: 'Cairo, Egypt' },
  areaServed: ['Egypt', 'Middle East'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+201223967303',
    email: 'valueplusegypt@gmail.com',
    contactType: 'customer service',
  },
  founder: {
    '@type': 'Person',
    name: 'Dr. Eng. Sherif Said El Saftawy',
    alternateName: [
      'Sherif El Saftawy',
      'Sherif Said El Saftawy',
      'شريف الصفطاوي',
      'شريف سعيد الصفطاوي',
      'د. م. شريف الصفطاوي',
    ],
    jobTitle: 'President & General Manager',
    worksFor: { '@type': 'Organization', name: 'Value Plus Egypt' },
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection />
      <ServicesOverview />
      <AboutPreview />
      <ClientsSlider />
      <CTASection />
    </>
  );
}
