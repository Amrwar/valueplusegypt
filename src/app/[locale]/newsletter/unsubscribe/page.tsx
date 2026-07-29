import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import { unsubscribeFromNewsletter } from '@/models/newsletter';
import { NotFoundError } from '@/lib/errors';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('newsletter');
  return { title: `${t('unsubscribeTitle')} | Value Plus Egypt` };
}

interface UnsubscribePageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function NewsletterUnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const t = await getTranslations('newsletter');
  const { token } = await searchParams;

  let message = t('unsubscribeError');

  if (token) {
    try {
      unsubscribeFromNewsletter(token);
      message = t('unsubscribeSuccess');
    } catch (error) {
      if (error instanceof NotFoundError) {
        message = t('unsubscribeError');
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="py-24">
      <Container className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-navy-900">{t('unsubscribeTitle')}</h1>
        <p className="mt-4 text-navy-700">{message}</p>
      </Container>
    </div>
  );
}
