import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError } from '@/lib/errors';
import { moderateTestimonial } from '@/models/testimonials';
import { TestimonialStatus } from '@/types/crm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const status = typeof body?.status === 'string' ? body.status : '';

    if (status !== 'approved' && status !== 'rejected' && status !== 'pending') {
      throw new ValidationError('Invalid status', { status: 'invalid' });
    }

    const updated = moderateTestimonial(id, status as TestimonialStatus);
    return NextResponse.json(updated);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
