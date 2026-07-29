import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { assignLead, getLeadById, updateLeadStatus } from '@/models/leads';
import { LEAD_STATUSES, LeadStatus } from '@/types/crm';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const lead = getLeadById(id);
    if (!lead) throw new NotFoundError('Lead', id);
    return NextResponse.json(lead);
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

    let lead = getLeadById(id);
    if (!lead) throw new NotFoundError('Lead', id);

    if (typeof body?.status === 'string') {
      if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
        throw new ValidationError('Invalid status', { status: 'invalid' });
      }
      lead = updateLeadStatus(id, body.status as LeadStatus);
    }

    if ('assignedTo' in (body ?? {})) {
      const assignedTo = typeof body.assignedTo === 'string' ? body.assignedTo : null;
      lead = assignLead(id, assignedTo);
    }

    return NextResponse.json(lead);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
