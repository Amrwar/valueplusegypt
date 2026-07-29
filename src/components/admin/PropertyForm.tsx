'use client';

import { useActionState } from 'react';
import { PropertyFormState } from '@/actions/adminProperties';
import { PROPERTY_TYPES, PropertyListing } from '@/types/crm';
import { cn } from '@/lib/utils';

const emptyPropertyFormState: PropertyFormState = { error: '', fieldErrors: {} };

type PropertyFormAction = (
  state: PropertyFormState,
  formData: FormData
) => Promise<PropertyFormState>;

interface PropertyFormProps {
  action: PropertyFormAction;
  property?: PropertyListing;
}

function fieldClass(hasError: boolean) {
  return cn(
    'mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400',
    hasError ? 'border-red-400' : 'border-navy-200'
  );
}

export default function PropertyForm({ action, property }: PropertyFormProps) {
  const [state, formAction, isPending] = useActionState(action, emptyPropertyFormState);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Title (English)</label>
          <input
            name="titleEn"
            defaultValue={property?.titleEn}
            className={fieldClass(Boolean(state.fieldErrors.titleEn))}
          />
          {state.fieldErrors.titleEn && (
            <p className="mt-1 text-sm text-red-500">{state.fieldErrors.titleEn}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Title (Arabic)</label>
          <input
            name="titleAr"
            dir="rtl"
            defaultValue={property?.titleAr}
            className={fieldClass(Boolean(state.fieldErrors.titleAr))}
          />
          {state.fieldErrors.titleAr && (
            <p className="mt-1 text-sm text-red-500">{state.fieldErrors.titleAr}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Summary (English)</label>
          <textarea name="summaryEn" rows={2} defaultValue={property?.summaryEn} className={fieldClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Summary (Arabic)</label>
          <textarea
            name="summaryAr"
            dir="rtl"
            rows={2}
            defaultValue={property?.summaryAr}
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Description (English)</label>
          <textarea
            name="descriptionEn"
            rows={4}
            defaultValue={property?.descriptionEn}
            className={fieldClass(false)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Description (Arabic)</label>
          <textarea
            name="descriptionAr"
            dir="rtl"
            rows={4}
            defaultValue={property?.descriptionAr}
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Location (English)</label>
          <input name="locationEn" defaultValue={property?.locationEn} className={fieldClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Location (Arabic)</label>
          <input
            name="locationAr"
            dir="rtl"
            defaultValue={property?.locationAr}
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Amenities (English, comma-separated)</label>
          <input
            name="amenitiesEn"
            defaultValue={property?.amenitiesEn.join(', ')}
            className={fieldClass(false)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Amenities (Arabic, comma-separated)</label>
          <input
            name="amenitiesAr"
            dir="rtl"
            defaultValue={property?.amenitiesAr.join(', ')}
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-navy-700">Property type</label>
          <select name="propertyType" defaultValue={property?.propertyType ?? PROPERTY_TYPES[0]} className={fieldClass(false)}>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Price (EGP)</label>
          <input
            type="number"
            name="priceEgp"
            min={0}
            defaultValue={property?.priceEgp ?? 0}
            className={fieldClass(false)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Area (sqm)</label>
          <input
            type="number"
            name="areaSqm"
            min={0}
            defaultValue={property?.areaSqm ?? 0}
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy-700">Image URL</label>
          <input name="image" defaultValue={property?.image} className={fieldClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700">Status</label>
          <select name="status" defaultValue={property?.status ?? 'draft'} className={fieldClass(false)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-700">
        <input type="checkbox" name="featured" defaultChecked={property?.featured} className="rounded border-navy-300" />
        Featured
      </label>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {isPending ? 'Saving…' : 'Save property'}
      </button>
    </form>
  );
}
