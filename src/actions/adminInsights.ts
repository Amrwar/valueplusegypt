'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/session';
import { ValidationError } from '@/lib/errors';
import { createInsight, deleteInsight, updateInsight, UpsertInsightInput } from '@/models/insights';

export interface InsightFormState {
  error: string;
  fieldErrors: Record<string, string>;
}

function parseForm(formData: FormData): UpsertInsightInput {
  const tags = (formData.get('tags')?.toString() || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    titleEn: formData.get('titleEn')?.toString().trim() || '',
    titleAr: formData.get('titleAr')?.toString().trim() || '',
    excerptEn: formData.get('excerptEn')?.toString().trim() || '',
    excerptAr: formData.get('excerptAr')?.toString().trim() || '',
    bodyEn: formData.get('bodyEn')?.toString().trim() || '',
    bodyAr: formData.get('bodyAr')?.toString().trim() || '',
    category: formData.get('category')?.toString().trim() || '',
    tags,
    status: formData.get('status')?.toString() === 'published' ? 'published' : 'draft',
  };
}

function validate(input: UpsertInsightInput): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  if (!input.titleEn) fieldErrors.titleEn = 'Title (English) is required.';
  if (!input.titleAr) fieldErrors.titleAr = 'Title (Arabic) is required.';
  if (!input.bodyEn) fieldErrors.bodyEn = 'Body (English) is required.';
  if (!input.bodyAr) fieldErrors.bodyAr = 'Body (Arabic) is required.';
  if (!input.category) fieldErrors.category = 'Category is required.';
  return fieldErrors;
}

export async function createInsightAction(
  _prevState: InsightFormState,
  formData: FormData
): Promise<InsightFormState> {
  await requireAdmin();
  const input = parseForm(formData);
  const fieldErrors = validate(input);

  if (Object.keys(fieldErrors).length > 0) {
    return { error: '', fieldErrors };
  }

  try {
    createInsight(input);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }
    return { error: 'Something went wrong. Please try again.', fieldErrors: {} };
  }

  revalidatePath('/admin/insights');
  redirect('/admin/insights');
}

export async function updateInsightAction(
  id: string,
  _prevState: InsightFormState,
  formData: FormData
): Promise<InsightFormState> {
  await requireAdmin();
  const input = parseForm(formData);
  const fieldErrors = validate(input);

  if (Object.keys(fieldErrors).length > 0) {
    return { error: '', fieldErrors };
  }

  try {
    updateInsight(id, input);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }
    return { error: 'Something went wrong. Please try again.', fieldErrors: {} };
  }

  revalidatePath('/admin/insights');
  redirect('/admin/insights');
}

export async function deleteInsightAction(id: string): Promise<void> {
  await requireAdmin();
  deleteInsight(id);
  revalidatePath('/admin/insights');
}
