'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitTestimonialAction, TestimonialFormState } from '@/actions/testimonial';
import { cn } from '@/lib/utils';

const initialTestimonialState: TestimonialFormState = { success: false, error: '', fieldErrors: {} };

export default function TestimonialForm() {
  const t = useTranslations('testimonials');
  const [state, action, isPending] = useActionState(submitTestimonialAction, initialTestimonialState);
  const [rating, setRating] = useState(5);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">{t('success')}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <h2 className="text-xl font-bold text-navy-900">{t('formTitle')}</h2>
      <div className="mt-2 h-1 w-12 rounded bg-gold-400" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-700">
          {t('name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
            state.fieldErrors.name ? 'border-red-400' : 'border-navy-200'
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-navy-700">
            {t('role')}
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder={t('rolePlaceholder')}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-navy-700">
            {t('company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder={t('companyPlaceholder')}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-navy-700">
          {t('quote')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={4}
          placeholder={t('quotePlaceholder')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 resize-none',
            state.fieldErrors.quote ? 'border-red-400' : 'border-navy-200'
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-700">{t('rating')}</label>
        <input type="hidden" name="rating" value={rating} />
        <div className="mt-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={cn('text-2xl', value <= rating ? 'text-gold-400' : 'text-navy-200')}
              aria-label={`${value} stars`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {t(state.error)}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-gold-400 px-6 py-3 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
