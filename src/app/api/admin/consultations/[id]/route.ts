import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { getConsultationRequestById, updateConsultationStatus } from '@/models/consultationRequests';
import { CONSULTATION_STATUSES, ConsultationStatus } from '@/types/crm';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const consultation = getConsultationRequestById(id);
    if (!consultation) throw new NotFoundError('Consultation request', id);
    return NextResponse.json(consultation);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const status = typeof body?.status === 'string' ? body.status : '';

    if (!CONSULTATION_STATUSES.includes(status as ConsultationStatus)) {
      throw new ValidationError('Invalid status', { status: 'invalid' });
    }

    const updated = updateConsultationStatus(id, status as ConsultationStatus);
    return NextResponse.json(updated);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
