import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError } from '@/lib/errors';
import { createProperty, listProperties, UpsertPropertyInput } from '@/models/properties';
import { PROPERTY_TYPES, PropertyType } from '@/types/crm';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const params = request.nextUrl.searchParams;
    const propertyType = params.get('type');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listProperties({
      propertyType:
        propertyType && PROPERTY_TYPES.includes(propertyType as PropertyType)
          ? (propertyType as PropertyType)
          : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

function parsePropertyInput(body: unknown): UpsertPropertyInput {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Invalid request body');
  }

  const b = body as Record<string, unknown>;
  const fieldErrors: Record<string, string> = {};

  const titleEn = typeof b.titleEn === 'string' ? b.titleEn.trim() : '';
  const titleAr = typeof b.titleAr === 'string' ? b.titleAr.trim() : '';
  const propertyType = typeof b.propertyType === 'string' ? b.propertyType : '';

  if (!titleEn) fieldErrors.titleEn = 'required';
  if (!titleAr) fieldErrors.titleAr = 'required';
  if (!PROPERTY_TYPES.includes(propertyType as PropertyType)) fieldErrors.propertyType = 'invalid';

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError('Validation failed', fieldErrors);
  }

  return {
    titleEn,
    titleAr,
    summaryEn: typeof b.summaryEn === 'string' ? b.summaryEn : '',
    summaryAr: typeof b.summaryAr === 'string' ? b.summaryAr : '',
    locationEn: typeof b.locationEn === 'string' ? b.locationEn : '',
    locationAr: typeof b.locationAr === 'string' ? b.locationAr : '',
    descriptionEn: typeof b.descriptionEn === 'string' ? b.descriptionEn : '',
    descriptionAr: typeof b.descriptionAr === 'string' ? b.descriptionAr : '',
    amenitiesEn: Array.isArray(b.amenitiesEn) ? (b.amenitiesEn as string[]) : [],
    amenitiesAr: Array.isArray(b.amenitiesAr) ? (b.amenitiesAr as string[]) : [],
    propertyType: propertyType as PropertyType,
    priceEgp: typeof b.priceEgp === 'number' ? b.priceEgp : 0,
    areaSqm: typeof b.areaSqm === 'number' ? b.areaSqm : 0,
    image: typeof b.image === 'string' ? b.image : '',
    featured: Boolean(b.featured),
    status: b.status === 'published' || b.status === 'archived' ? b.status : 'draft',
  };
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => null);
    const input = parsePropertyInput(body);
    const created = createProperty(input);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
