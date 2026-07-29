import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ConsultationForm from '@/components/consultation/ConsultationForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('consultation');
  return {
    title: `${t('pageTitle')} | Value Plus Egypt`,
    description: t('pageSubtitle'),
  };
}

export default async function ConsultationPage() {
  const t = await getTranslations('consultation');

  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <SectionHeading title={t('pageTitle')} subtitle={t('pageSubtitle')} />
        <ConsultationForm />
      </Container>
    </div>
  );
}
