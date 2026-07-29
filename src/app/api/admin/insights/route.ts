import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError } from '@/lib/errors';
import { createInsight, listInsights, UpsertInsightInput } from '@/models/insights';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const status = params.get('status');
    const category = params.get('category');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listInsights({
      status: status === 'draft' || status === 'published' ? status : undefined,
      category: category ?? undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

function parseInsightInput(body: unknown): UpsertInsightInput {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Invalid request body');
  }

  const b = body as Record<string, unknown>;
  const fieldErrors: Record<string, string> = {};

  const titleEn = typeof b.titleEn === 'string' ? b.titleEn.trim() : '';
  const titleAr = typeof b.titleAr === 'string' ? b.titleAr.trim() : '';
  const bodyEn = typeof b.bodyEn === 'string' ? b.bodyEn.trim() : '';
  const bodyAr = typeof b.bodyAr === 'string' ? b.bodyAr.trim() : '';
  const category = typeof b.category === 'string' ? b.category.trim() : '';

  if (!titleEn) fieldErrors.titleEn = 'required';
  if (!titleAr) fieldErrors.titleAr = 'required';
  if (!bodyEn) fieldErrors.bodyEn = 'required';
  if (!bodyAr) fieldErrors.bodyAr = 'required';
  if (!category) fieldErrors.category = 'required';

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError('Validation failed', fieldErrors);
  }

  return {
    titleEn,
    titleAr,
    excerptEn: typeof b.excerptEn === 'string' ? b.excerptEn : '',
    excerptAr: typeof b.excerptAr === 'string' ? b.excerptAr : '',
    bodyEn,
    bodyAr,
    category,
    tags: Array.isArray(b.tags) ? (b.tags as string[]) : [],
    status: b.status === 'published' ? 'published' : 'draft',
  };
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => null);
    const input = parseInsightInput(body);
    const created = createInsight(input);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
