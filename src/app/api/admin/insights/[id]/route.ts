import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError } from '@/lib/errors';
import { deleteInsight, getInsightById, updateInsight, UpsertInsightInput } from '@/models/insights';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const insight = getInsightById(id);
    if (!insight) throw new NotFoundError('Insight', id);
    return NextResponse.json(insight);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

function parsePartialInput(body: unknown): Partial<UpsertInsightInput> {
  if (typeof body !== 'object' || body === null) return {};
  const b = body as Record<string, unknown>;
  const partial: Partial<UpsertInsightInput> = {};

  if (typeof b.titleEn === 'string') partial.titleEn = b.titleEn;
  if (typeof b.titleAr === 'string') partial.titleAr = b.titleAr;
  if (typeof b.excerptEn === 'string') partial.excerptEn = b.excerptEn;
  if (typeof b.excerptAr === 'string') partial.excerptAr = b.excerptAr;
  if (typeof b.bodyEn === 'string') partial.bodyEn = b.bodyEn;
  if (typeof b.bodyAr === 'string') partial.bodyAr = b.bodyAr;
  if (typeof b.category === 'string') partial.category = b.category;
  if (Array.isArray(b.tags)) partial.tags = b.tags as string[];
  if (b.status === 'draft' || b.status === 'published') partial.status = b.status;

  return partial;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const updated = updateInsight(id, parsePartialInput(body));
    return NextResponse.json(updated);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    deleteInsight(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
