import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import { confirmNewsletterSubscription } from '@/models/newsletter';
import { NotFoundError, ValidationError } from '@/lib/errors';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('newsletter');
  return { title: `${t('confirmTitle')} | Value Plus Egypt` };
}

interface ConfirmPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function NewsletterConfirmPage({ searchParams }: ConfirmPageProps) {
  const t = await getTranslations('newsletter');
  const { token } = await searchParams;

  let message = t('confirmError');

  if (token) {
    try {
      confirmNewsletterSubscription(token);
      message = t('confirmSuccess');
    } catch (error) {
      if (error instanceof ValidationError) {
        message = t('confirmExpired');
      } else if (error instanceof NotFoundError) {
        message = t('confirmError');
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="py-24">
      <Container className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-navy-900">{t('confirmTitle')}</h1>
        <p className="mt-4 text-navy-700">{message}</p>
      </Container>
    </div>
  );
}
