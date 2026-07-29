import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError } from '@/lib/errors';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';
import { ensureUniqueSlug } from '@/lib/slug';
import { PaginatedResult, PropertyListing, PropertyStatus, PropertyType } from '@/types/crm';

interface PropertyRow {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  location_en: string;
  location_ar: string;
  description_en: string;
  description_ar: string;
  amenities_en: string;
  amenities_ar: string;
  property_type: string;
  price_egp: number;
  area_sqm: number;
  image: string;
  featured: number;
  status: string;
  created_at: string;
  updated_at: string;
}

function toPropertyListing(row: PropertyRow): PropertyListing {
  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleAr: row.title_ar,
    summaryEn: row.summary_en,
    summaryAr: row.summary_ar,
    locationEn: row.location_en,
    locationAr: row.location_ar,
    descriptionEn: row.description_en,
    descriptionAr: row.description_ar,
    amenitiesEn: JSON.parse(row.amenities_en),
    amenitiesAr: JSON.parse(row.amenities_ar),
    propertyType: row.property_type as PropertyType,
    priceEgp: row.price_egp,
    areaSqm: row.area_sqm,
    image: row.image,
    featured: row.featured === 1,
    status: row.status as PropertyStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function slugExists(slug: string, excludeId?: string): boolean {
  const db = getDb();
  const row = excludeId
    ? db.prepare('SELECT id FROM properties WHERE slug = ? AND id != ?').get(slug, excludeId)
    : db.prepare('SELECT id FROM properties WHERE slug = ?').get(slug);
  return Boolean(row);
}

export interface UpsertPropertyInput {
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  amenitiesEn: string[];
  amenitiesAr: string[];
  propertyType: PropertyType;
  priceEgp: number;
  areaSqm: number;
  image?: string;
  featured?: boolean;
  status?: PropertyStatus;
}

export function createProperty(input: UpsertPropertyInput): PropertyListing {
  const db = getDb();
  const id = randomUUID();
  const slug = ensureUniqueSlug(input.titleEn, (candidate) => slugExists(candidate));
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO properties
      (id, slug, title_en, title_ar, summary_en, summary_ar, location_en, location_ar,
       description_en, description_ar, amenities_en, amenities_ar, property_type,
       price_egp, area_sqm, image, featured, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    slug,
    input.titleEn,
    input.titleAr,
    input.summaryEn,
    input.summaryAr,
    input.locationEn,
    input.locationAr,
    input.descriptionEn,
    input.descriptionAr,
    JSON.stringify(input.amenitiesEn),
    JSON.stringify(input.amenitiesAr),
    input.propertyType,
    input.priceEgp,
    input.areaSqm,
    input.image ?? '',
    input.featured ? 1 : 0,
    input.status ?? 'draft',
    now,
    now
  );

  return getPropertyById(id)!;
}

export function updateProperty(id: string, input: Partial<UpsertPropertyInput>): PropertyListing {
  const db = getDb();
  const current = getPropertyById(id);
  if (!current) throw new NotFoundError('Property', id);

  const next = { ...current, ...input };
  const slug =
    input.titleEn && input.titleEn !== current.titleEn
      ? ensureUniqueSlug(input.titleEn, (candidate) => slugExists(candidate, id))
      : current.slug;
  const now = new Date().toISOString();

  db.prepare(
    `UPDATE properties SET
      slug = ?, title_en = ?, title_ar = ?, summary_en = ?, summary_ar = ?,
      location_en = ?, location_ar = ?, description_en = ?, description_ar = ?,
      amenities_en = ?, amenities_ar = ?, property_type = ?, price_egp = ?,
      area_sqm = ?, image = ?, featured = ?, status = ?, updated_at = ?
     WHERE id = ?`
  ).run(
    slug,
    next.titleEn,
    next.titleAr,
    next.summaryEn,
    next.summaryAr,
    next.locationEn,
    next.locationAr,
    next.descriptionEn,
    next.descriptionAr,
    JSON.stringify(next.amenitiesEn),
    JSON.stringify(next.amenitiesAr),
    next.propertyType,
    next.priceEgp,
    next.areaSqm,
    next.image,
    next.featured ? 1 : 0,
    next.status,
    now,
    id
  );

  return getPropertyById(id)!;
}

export function deleteProperty(id: string): void {
  const db = getDb();
  const current = getPropertyById(id);
  if (!current) throw new NotFoundError('Property', id);
  db.prepare('DELETE FROM properties WHERE id = ?').run(id);
}

export function getPropertyById(id: string): PropertyListing | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM properties WHERE id = ?').get(id) as
    | PropertyRow
    | undefined;
  return row ? toPropertyListing(row) : null;
}

export function getPropertyBySlug(slug: string): PropertyListing | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM properties WHERE slug = ?').get(slug) as
    | PropertyRow
    | undefined;
  return row ? toPropertyListing(row) : null;
}

export interface ListPropertiesParams {
  propertyType?: PropertyType;
  status?: PropertyStatus;
  featuredOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export function listProperties(params: ListPropertiesParams = {}): PaginatedResult<PropertyListing> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.propertyType) {
    conditions.push('property_type = ?');
    values.push(params.propertyType);
  }
  if (params.status) {
    conditions.push('status = ?');
    values.push(params.status);
  }
  if (params.featuredOnly) {
    conditions.push('featured = 1');
  }
  if (params.minPrice !== undefined) {
    conditions.push('price_egp >= ?');
    values.push(params.minPrice);
  }
  if (params.maxPrice !== undefined) {
    conditions.push('price_egp <= ?');
    values.push(params.maxPrice);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const total = (
    db.prepare(`SELECT COUNT(*) as count FROM properties ${whereClause}`).get(...values) as {
      count: number;
    }
  ).count;

  const rows = db
    .prepare(
      `SELECT * FROM properties ${whereClause} ORDER BY featured DESC, created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as PropertyRow[];

  return toPaginatedResult(rows.map(toPropertyListing), total, page, pageSize);
}
