'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/actions/contact';
import { ContactFormState } from '@/types';
import { SERVICE_KEYS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const initialState: ContactFormState = {
  success: false,
  error: '',
  fieldErrors: {},
};

export default function ContactForm() {
  const t = useTranslations();
  const ct = useTranslations('contact');
  const [state, action, isPending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-lg font-semibold text-green-800">{ct('success')}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <h2 className="text-xl font-bold text-navy-900">{ct('formTitle')}</h2>
      <div className="mt-2 h-1 w-12 rounded bg-gold-400" />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-700">
          {ct('name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder={ct('namePlaceholder')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
            state.fieldErrors.name ? 'border-red-400' : 'border-navy-200'
          )}
        />
        {state.fieldErrors.name && (
          <p className="mt-1 text-sm text-red-500">{ct(state.fieldErrors.name)}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy-700">
          {ct('email')} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder={ct('emailPlaceholder')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
            state.fieldErrors.email ? 'border-red-400' : 'border-navy-200'
          )}
        />
        {state.fieldErrors.email && (
          <p className="mt-1 text-sm text-red-500">{ct(state.fieldErrors.email)}</p>
        )}
      </div>

      {/* Phone & Company row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-700">
            {ct('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder={ct('phonePlaceholder')}
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
              state.fieldErrors.phone ? 'border-red-400' : 'border-navy-200'
            )}
          />
          {state.fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-500">{ct(state.fieldErrors.phone)}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-navy-700">
            {ct('company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder={ct('companyPlaceholder')}
            className="mt-1 block w-full rounded-lg border border-navy-200 px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-navy-700">
          {ct('service')}
        </label>
        <select
          id="service"
          name="service"
          className="mt-1 block w-full rounded-lg border border-navy-200 px-4 py-2.5 text-navy-900 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
        >
          <option value="">{ct('servicePlaceholder')}</option>
          {SERVICE_KEYS.map((key) => (
            <option key={key} value={t(`services.${key}.title`)}>
              {t(`services.${key}.title`)}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700">
          {ct('message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={ct('messagePlaceholder')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 resize-none',
            state.fieldErrors.message ? 'border-red-400' : 'border-navy-200'
          )}
        />
        {state.fieldErrors.message && (
          <p className="mt-1 text-sm text-red-500">{ct(state.fieldErrors.message)}</p>
        )}
      </div>

      {state.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {ct('error')}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-gold-400 px-6 py-3 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? ct('sending') : ct('submit')}
      </button>
    </form>
  );
}
