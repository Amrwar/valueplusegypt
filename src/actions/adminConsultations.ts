'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/session';
import { updateConsultationStatus } from '@/models/consultationRequests';
import { ConsultationStatus } from '@/types/crm';

export async function updateConsultationStatusAction(
  id: string,
  status: ConsultationStatus
): Promise<void> {
  await requireAdmin();
  updateConsultationStatus(id, status);
  revalidatePath(`/admin/consultations/${id}`);
  revalidatePath('/admin/consultations');
}
