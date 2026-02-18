import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

const BASE_URL = 'https://www.valuepluseg.org';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isAr = locale === 'ar';

  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
    keywords: isAr
      ? ['تواصل مع فاليو بلس مصر', 'فاليو بلس', 'استشارات استثمارية مصر', 'القاهرة']
      : ['contact Value Plus Egypt', 'ValuePlus Egypt', 'investment consultancy contact Egypt', 'Cairo'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'en': `${BASE_URL}/en/contact`,
        'ar': `${BASE_URL}/ar/contact`,
      },
    },
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Value Plus Egypt',
      locale: isAr ? 'ar_EG' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_EG',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('contactTitle'),
      description: t('contactDescription'),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

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
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
