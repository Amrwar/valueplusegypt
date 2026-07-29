import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { listTestimonials } from '@/models/testimonials';
import { TestimonialStatus } from '@/types/crm';

const VALID_STATUSES: TestimonialStatus[] = ['pending', 'approved', 'rejected'];

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const status = params.get('status');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listTestimonials({
      status: status && VALID_STATUSES.includes(status as TestimonialStatus) ? (status as TestimonialStatus) : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
