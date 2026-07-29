import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { listInsights } from '@/models/insights';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const category = params.get('category');
    const tag = params.get('tag');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listInsights({
      status: 'published',
      category: category ?? undefined,
      tag: tag ?? undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
