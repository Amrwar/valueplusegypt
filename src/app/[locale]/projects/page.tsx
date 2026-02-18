import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ProjectGrid from '@/components/projects/ProjectGrid';

const BASE_URL = 'https://www.valuepluseg.org';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isAr = locale === 'ar';

  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
    keywords: isAr
      ? ['مشاريع فاليو بلس مصر', 'فاليو بلس', 'مشاريع استثمارية مصر', 'مشاريع عقارية', 'دراسات جدوى']
      : ['Value Plus Egypt projects', 'ValuePlus projects', 'investment projects Egypt', 'real estate projects Egypt', 'feasibility studies Egypt'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        'en': `${BASE_URL}/en/projects`,
        'ar': `${BASE_URL}/ar/projects`,
      },
    },
    openGraph: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      url: `${BASE_URL}/${locale}/projects`,
      siteName: 'Value Plus Egypt',
      locale: isAr ? 'ar_EG' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_EG',
      type: 'website',
      images: [{ url: `${BASE_URL}/images/logo.jpg`, alt: 'Value Plus Egypt Projects' }],
    },
    twitter: {
      card: 'summary',
      title: t('projectsTitle'),
      description: t('projectsDescription'),
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <>
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

      <section className="py-20">
        <Container>
          <ProjectGrid />
        </Container>
      </section>
    </>
  );
}
