'use client';

import { useActionState } from 'react';
import { InsightFormState } from '@/actions/adminInsights';
import { Insight } from '@/types/crm';
import { cn } from '@/lib/utils';

const emptyInsightFormState: InsightFormState = { error: '', fieldErrors: {} };

type InsightFormAction = (state: InsightFormState, formData: FormData) => Promise<InsightFormState>;

interface InsightFormProps {
  action: InsightFormAction;
  insight?: Insight;
}

function fieldClass(hasError: boolean) {
  return cn(
    'mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
    hasError ? 'border-red-400' : 'border-navy-200'
  );
}

export default function InsightForm({ action, insight }: InsightFormProps) {
  const [state, formAction, isPending] = useActionState(action, emptyInsightFormState);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Title (English)</label>
          <input name="titleEn" defaultValue={insight?.titleEn} className={fieldClass(Boolean(state.fieldErrors.titleEn))} />
          {state.fieldErrors.titleEn && <p className="mt-1 text-sm text-red-500">{state.fieldErrors.titleEn}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Title (Arabic)</label>
          <input
            name="titleAr"
            dir="rtl"
            defaultValue={insight?.titleAr}
            className={fieldClass(Boolean(state.fieldErrors.titleAr))}
          />
          {state.fieldErrors.titleAr && <p className="mt-1 text-sm text-red-500">{state.fieldErrors.titleAr}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Excerpt (English)</label>
          <textarea name="excerptEn" rows={2} defaultValue={insight?.excerptEn} className={fieldClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Excerpt (Arabic)</label>
          <textarea name="excerptAr" dir="rtl" rows={2} defaultValue={insight?.excerptAr} className={fieldClass(false)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Body (English)</label>
          <textarea
            name="bodyEn"
            rows={8}
            defaultValue={insight?.bodyEn}
            className={fieldClass(Boolean(state.fieldErrors.bodyEn))}
          />
          {state.fieldErrors.bodyEn && <p className="mt-1 text-sm text-red-500">{state.fieldErrors.bodyEn}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Body (Arabic)</label>
          <textarea
            name="bodyAr"
            dir="rtl"
            rows={8}
            defaultValue={insight?.bodyAr}
            className={fieldClass(Boolean(state.fieldErrors.bodyAr))}
          />
          {state.fieldErrors.bodyAr && <p className="mt-1 text-sm text-red-500">{state.fieldErrors.bodyAr}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-navy-700">Category</label>
          <input
            name="category"
            defaultValue={insight?.category}
            className={fieldClass(Boolean(state.fieldErrors.category))}
          />
          {state.fieldErrors.category && <p className="mt-1 text-sm text-red-500">{state.fieldErrors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Tags (comma-separated)</label>
          <input name="tags" defaultValue={insight?.tags.join(', ')} className={fieldClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Status</label>
          <select name="status" defaultValue={insight?.status ?? 'draft'} className={fieldClass(false)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {isPending ? 'Saving…' : 'Save insight'}
      </button>
    </form>
  );
}
