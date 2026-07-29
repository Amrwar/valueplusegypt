import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { listConsultationRequests } from '@/models/consultationRequests';
import { CONSULTATION_STATUSES, ConsultationStatus } from '@/types/crm';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const status = params.get('status');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listConsultationRequests({
      status:
        status && CONSULTATION_STATUSES.includes(status as ConsultationStatus)
          ? (status as ConsultationStatus)
          : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
