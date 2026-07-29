import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError } from '@/lib/errors';
import { getPropertyBySlug } from '@/models/properties';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const property = getPropertyBySlug(slug);

    if (!property || property.status !== 'published') {
      throw new NotFoundError('Property', slug);
    }

    return NextResponse.json(property);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
