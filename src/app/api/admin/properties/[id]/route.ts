import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { NotFoundError } from '@/lib/errors';
import { deleteProperty, getPropertyById, updateProperty, UpsertPropertyInput } from '@/models/properties';
import { PROPERTY_TYPES, PropertyType } from '@/types/crm';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const property = getPropertyById(id);
    if (!property) throw new NotFoundError('Property', id);
    return NextResponse.json(property);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

function parsePartialInput(body: unknown): Partial<UpsertPropertyInput> {
  if (typeof body !== 'object' || body === null) return {};
  const b = body as Record<string, unknown>;
  const partial: Partial<UpsertPropertyInput> = {};

  if (typeof b.titleEn === 'string') partial.titleEn = b.titleEn;
  if (typeof b.titleAr === 'string') partial.titleAr = b.titleAr;
  if (typeof b.summaryEn === 'string') partial.summaryEn = b.summaryEn;
  if (typeof b.summaryAr === 'string') partial.summaryAr = b.summaryAr;
  if (typeof b.locationEn === 'string') partial.locationEn = b.locationEn;
  if (typeof b.locationAr === 'string') partial.locationAr = b.locationAr;
  if (typeof b.descriptionEn === 'string') partial.descriptionEn = b.descriptionEn;
  if (typeof b.descriptionAr === 'string') partial.descriptionAr = b.descriptionAr;
  if (Array.isArray(b.amenitiesEn)) partial.amenitiesEn = b.amenitiesEn as string[];
  if (Array.isArray(b.amenitiesAr)) partial.amenitiesAr = b.amenitiesAr as string[];
  if (typeof b.propertyType === 'string' && PROPERTY_TYPES.includes(b.propertyType as PropertyType)) {
    partial.propertyType = b.propertyType as PropertyType;
  }
  if (typeof b.priceEgp === 'number') partial.priceEgp = b.priceEgp;
  if (typeof b.areaSqm === 'number') partial.areaSqm = b.areaSqm;
  if (typeof b.image === 'string') partial.image = b.image;
  if (typeof b.featured === 'boolean') partial.featured = b.featured;
  if (b.status === 'draft' || b.status === 'published' || b.status === 'archived') {
    partial.status = b.status;
  }

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
    const updated = updateProperty(id, parsePartialInput(body));
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
    deleteProperty(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
