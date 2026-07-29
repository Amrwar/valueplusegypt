'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/session';
import { addLeadNote, assignLead, updateLeadStatus } from '@/models/leads';
import { LeadStatus } from '@/types/crm';

export async function updateLeadStatusAction(id: string, status: LeadStatus): Promise<void> {
  await requireAdmin();
  updateLeadStatus(id, status);
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath('/admin/leads');
}

export async function assignLeadAction(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const assignedTo = formData.get('assignedTo')?.toString().trim() || null;
  assignLead(id, assignedTo);
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath('/admin/leads');
}

export interface AddLeadNoteState {
  error: string;
}

export async function addLeadNoteAction(
  id: string,
  _prevState: AddLeadNoteState,
  formData: FormData
): Promise<AddLeadNoteState> {
  const admin = await requireAdmin();
  const body = formData.get('body')?.toString().trim() || '';

  if (!body) {
    return { error: 'Note cannot be empty.' };
  }

  addLeadNote(id, admin.name, body);
  revalidatePath(`/admin/leads/${id}`);

  return { error: '' };
}
