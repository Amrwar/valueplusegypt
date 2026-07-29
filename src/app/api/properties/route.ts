import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { listProperties } from '@/models/properties';
import { PropertyType, PROPERTY_TYPES } from '@/types/crm';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const propertyType = params.get('type');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const featured = params.get('featured');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    const result = listProperties({
      status: 'published',
      propertyType:
        propertyType && PROPERTY_TYPES.includes(propertyType as PropertyType)
          ? (propertyType as PropertyType)
          : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      featuredOnly: featured === 'true',
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
