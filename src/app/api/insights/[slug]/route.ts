import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError } from '@/lib/errors';
import { getInsightBySlug } from '@/models/insights';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);

    if (!insight || insight.status !== 'published') {
      throw new NotFoundError('Insight', slug);
    }

    return NextResponse.json(insight);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
