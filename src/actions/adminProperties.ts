'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/session';
import { ValidationError } from '@/lib/errors';
import { createProperty, deleteProperty, updateProperty, UpsertPropertyInput } from '@/models/properties';
import { PROPERTY_TYPES, PropertyType } from '@/types/crm';

export interface PropertyFormState {
  error: string;
  fieldErrors: Record<string, string>;
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseForm(formData: FormData): UpsertPropertyInput {
  const propertyType = formData.get('propertyType')?.toString() || '';

  return {
    titleEn: formData.get('titleEn')?.toString().trim() || '',
    titleAr: formData.get('titleAr')?.toString().trim() || '',
    summaryEn: formData.get('summaryEn')?.toString().trim() || '',
    summaryAr: formData.get('summaryAr')?.toString().trim() || '',
    locationEn: formData.get('locationEn')?.toString().trim() || '',
    locationAr: formData.get('locationAr')?.toString().trim() || '',
    descriptionEn: formData.get('descriptionEn')?.toString().trim() || '',
    descriptionAr: formData.get('descriptionAr')?.toString().trim() || '',
    amenitiesEn: splitList(formData.get('amenitiesEn')?.toString() || ''),
    amenitiesAr: splitList(formData.get('amenitiesAr')?.toString() || ''),
    propertyType: (PROPERTY_TYPES.includes(propertyType as PropertyType)
      ? propertyType
      : 'residential') as PropertyType,
    priceEgp: Number(formData.get('priceEgp')) || 0,
    areaSqm: Number(formData.get('areaSqm')) || 0,
    image: formData.get('image')?.toString().trim() || '',
    featured: formData.get('featured') === 'on',
    status: (formData.get('status')?.toString() as UpsertPropertyInput['status']) || 'draft',
  };
}

function validate(input: UpsertPropertyInput): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  if (!input.titleEn) fieldErrors.titleEn = 'Title (English) is required.';
  if (!input.titleAr) fieldErrors.titleAr = 'Title (Arabic) is required.';
  return fieldErrors;
}

export async function createPropertyAction(
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  await requireAdmin();
  const input = parseForm(formData);
  const fieldErrors = validate(input);

  if (Object.keys(fieldErrors).length > 0) {
    return { error: '', fieldErrors };
  }

  try {
    createProperty(input);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }
    return { error: 'Something went wrong. Please try again.', fieldErrors: {} };
  }

  revalidatePath('/admin/properties');
  redirect('/admin/properties');
}

export async function updatePropertyAction(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  await requireAdmin();
  const input = parseForm(formData);
  const fieldErrors = validate(input);

  if (Object.keys(fieldErrors).length > 0) {
    return { error: '', fieldErrors };
  }

  try {
    updateProperty(id, input);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }
    return { error: 'Something went wrong. Please try again.', fieldErrors: {} };
  }

  revalidatePath('/admin/properties');
  redirect('/admin/properties');
}

export async function deletePropertyAction(id: string): Promise<void> {
  await requireAdmin();
  deleteProperty(id);
  revalidatePath('/admin/properties');
}
