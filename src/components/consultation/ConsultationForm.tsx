'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { ConsultationFormState, submitConsultationRequest } from '@/actions/consultation';
import { BUDGET_RANGES, SERVICE_TYPES, TIMELINES } from '@/types/crm';
import { cn } from '@/lib/utils';

const initialConsultationState: ConsultationFormState = { success: false, error: '', fieldErrors: {} };

export default function ConsultationForm() {
  const t = useTranslations('consultation');
  const [state, action, isPending] = useActionState(submitConsultationRequest, initialConsultationState);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-4 text-4xl">✅</div>
        <p className="text-lg font-semibold text-green-800">{t('success')}</p>
      </div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    cn(
      'mt-1 block w-full rounded-lg border px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
      hasError ? 'border-red-400' : 'border-navy-200'
    );

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-700">
          {t('name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={fieldClass(Boolean(state.fieldErrors.name))}
        />
        {state.fieldErrors.name && <p className="mt-1 text-sm text-red-500">{t(state.fieldErrors.name)}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-700">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={fieldClass(Boolean(state.fieldErrors.email))}
          />
          {state.fieldErrors.email && <p className="mt-1 text-sm text-red-500">{t(state.fieldErrors.email)}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-700">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={fieldClass(Boolean(state.fieldErrors.phone))}
          />
          {state.fieldErrors.phone && <p className="mt-1 text-sm text-red-500">{t(state.fieldErrors.phone)}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-navy-700">
            {t('serviceType')} <span className="text-red-500">*</span>
          </label>
          <select id="serviceType" name="serviceType" required className={fieldClass(Boolean(state.fieldErrors.serviceType))}>
            <option value="">{t('serviceTypePlaceholder')}</option>
            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`service_${type}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-navy-700">
            {t('budgetRange')} <span className="text-red-500">*</span>
          </label>
          <select id="budgetRange" name="budgetRange" required className={fieldClass(Boolean(state.fieldErrors.budgetRange))}>
            <option value="">{t('budgetRangePlaceholder')}</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {t(`budget_${range}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-navy-700">
            {t('timeline')} <span className="text-red-500">*</span>
          </label>
          <select id="timeline" name="timeline" required className={fieldClass(Boolean(state.fieldErrors.timeline))}>
            <option value="">{t('timelinePlaceholder')}</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {t(`timeline_${timeline}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={fieldClass(false)}
        />
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
