import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import CompanyInfo from '@/components/about/CompanyInfo';
import LeadershipProfile from '@/components/about/LeadershipProfile';

const BASE_URL = 'https://www.valuepluseg.org';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isAr = locale === 'ar';

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    keywords: isAr
      ? ['شريف الصفطاوي', 'شريف سعيد الصفطاوي', 'د. م. شريف الصفطاوي', 'فاليو بلس مصر', 'فاليو بلس', 'استشارات استثمارية مصر']
      : ['Sherif El Saftawy', 'Sherif Said El Saftawy', 'Dr Sherif El Saftawy', 'Value Plus Egypt', 'ValuePlus Egypt', 'ValuePlus', 'investment consultancy Egypt'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        'en': `${BASE_URL}/en/about`,
        'ar': `${BASE_URL}/ar/about`,
      },
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'Value Plus Egypt',
      locale: isAr ? 'ar_EG' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_EG',
      type: 'profile',
      images: [
        {
          url: `${BASE_URL}/images/logo.jpg`,
          alt: 'Value Plus Egypt — Dr. Eng. Sherif Said El Saftawy',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: t('aboutTitle'),
      description: t('aboutDescription'),
    },
  };
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. Eng. Sherif Said El Saftawy',
  alternateName: [
    'Sherif El Saftawy',
    'Sherif Said El Saftawy',
    'شريف الصفطاوي',
    'شريف سعيد الصفطاوي',
    'د. م. شريف الصفطاوي',
    'Dr Sherif El Saftawy',
  ],
  jobTitle: 'President & General Manager',
  description:
    'Dr. Eng. Sherif Said El Saftawy is the President & General Manager of Value Plus Egypt, with extensive experience in investment consultancy, engineering, and real estate development.',
  worksFor: {
    '@type': 'Organization',
    name: 'Value Plus Egypt',
    url: BASE_URL,
  },
  url: `${BASE_URL}/en/about`,
  knowsAbout: [
    'Economic Feasibility Studies',
    'Value Engineering',
    'Real Estate Consultancy',
    'Investment Consultancy',
    'Quantity Surveying',
    'Engineering',
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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
