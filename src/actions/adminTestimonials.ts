'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/session';
import { moderateTestimonial } from '@/models/testimonials';
import { TestimonialStatus } from '@/types/crm';

export async function moderateTestimonialAction(
  id: string,
  status: TestimonialStatus
): Promise<void> {
  await requireAdmin();
  moderateTestimonial(id, status);
  revalidatePath('/admin/testimonials');
}
