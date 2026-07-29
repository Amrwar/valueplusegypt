import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';
import { PaginatedResult, Testimonial, TestimonialStatus } from '@/types/crm';

interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  quote_en: string;
  quote_ar: string;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

function toTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    quoteEn: row.quote_en,
    quoteAr: row.quote_ar,
    rating: row.rating,
    status: row.status as TestimonialStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface SubmitTestimonialInput {
  name: string;
  role?: string;
  company?: string;
  quoteEn: string;
  quoteAr: string;
  rating: number;
}

export function submitTestimonial(input: SubmitTestimonialInput): Testimonial {
  if (input.rating < 1 || input.rating > 5) {
    throw new ValidationError('Rating must be between 1 and 5', { rating: 'outOfRange' });
  }

  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO testimonials (id, name, role, company, quote_en, quote_ar, rating, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).run(
    id,
    input.name,
    input.role ?? '',
    input.company ?? '',
    input.quoteEn,
    input.quoteAr,
    input.rating,
    now,
    now
  );

  return getTestimonialById(id)!;
}

export function getTestimonialById(id: string): Testimonial | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id) as
    | TestimonialRow
    | undefined;
  return row ? toTestimonial(row) : null;
}

export function moderateTestimonial(id: string, status: TestimonialStatus): Testimonial {
  const db = getDb();
  const current = getTestimonialById(id);
  if (!current) throw new NotFoundError('Testimonial', id);

  const now = new Date().toISOString();
  db.prepare('UPDATE testimonials SET status = ?, updated_at = ? WHERE id = ?').run(
    status,
    now,
    id
  );

  return getTestimonialById(id)!;
}

export interface ListTestimonialsParams {
  status?: TestimonialStatus;
  page?: number;
  pageSize?: number;
}

export function listTestimonials(
  params: ListTestimonialsParams = {}
): PaginatedResult<Testimonial> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const whereClause = params.status ? 'WHERE status = ?' : '';
  const values = params.status ? [params.status] : [];

  const total = (
    db.prepare(`SELECT COUNT(*) as count FROM testimonials ${whereClause}`).get(...values) as {
      count: number;
    }
  ).count;

  const rows = db
    .prepare(
      `SELECT * FROM testimonials ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as TestimonialRow[];

  return toPaginatedResult(rows.map(toTestimonial), total, page, pageSize);
}
