'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { NewsletterFormState, subscribeToNewsletterAction } from '@/actions/newsletter';

const initialNewsletterState: NewsletterFormState = { status: 'idle' };

export default function NewsletterForm({ locale }: { locale: string }) {
  const t = useTranslations('newsletter');
  const action = subscribeToNewsletterAction.bind(null, locale);
  const [state, formAction, isPending] = useActionState(action, initialNewsletterState);

  if (state.status === 'success' || state.status === 'already_subscribed') {
    return (
      <p className="text-sm text-gold-300">
        {state.status === 'success' ? t('success') : t('alreadySubscribed')}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder={t('placeholder')}
        className="min-w-0 flex-1 rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-sm text-white placeholder:text-navy-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
      />
      <button
        type="submit"
        disabled={isPending}
        className="shrink-0 rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {isPending ? t('subscribing') : t('subscribe')}
      </button>
      {state.status === 'error' && <p className="text-sm text-red-400">{t('error')}</p>}
    </form>
  );
}
