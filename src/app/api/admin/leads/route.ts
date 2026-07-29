import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { listLeads } from '@/models/leads';
import { LEAD_STATUSES, LeadStatus } from '@/types/crm';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const status = params.get('status');
    const search = params.get('search');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listLeads({
      status: status && LEAD_STATUSES.includes(status as LeadStatus) ? (status as LeadStatus) : undefined,
      search: search ?? undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
