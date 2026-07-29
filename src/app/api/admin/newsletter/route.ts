import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { listNewsletterSubscribers } from '@/models/newsletter';
import { NewsletterStatus } from '@/types/crm';

const VALID_STATUSES: NewsletterStatus[] = ['pending', 'confirmed', 'unsubscribed'];

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const status = params.get('status');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listNewsletterSubscribers({
      status:
        status && VALID_STATUSES.includes(status as NewsletterStatus)
          ? (status as NewsletterStatus)
          : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
