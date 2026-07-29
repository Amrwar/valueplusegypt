import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError } from '@/lib/errors';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';
import { ensureUniqueSlug } from '@/lib/slug';
import { Insight, InsightStatus, PaginatedResult } from '@/types/crm';

interface InsightRow {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  body_en: string;
  body_ar: string;
  category: string;
  tags: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function toInsight(row: InsightRow): Insight {
  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleAr: row.title_ar,
    excerptEn: row.excerpt_en,
    excerptAr: row.excerpt_ar,
    bodyEn: row.body_en,
    bodyAr: row.body_ar,
    category: row.category,
    tags: JSON.parse(row.tags),
    status: row.status as InsightStatus,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function slugExists(slug: string, excludeId?: string): boolean {
  const db = getDb();
  const row = excludeId
    ? db.prepare('SELECT id FROM insights WHERE slug = ? AND id != ?').get(slug, excludeId)
    : db.prepare('SELECT id FROM insights WHERE slug = ?').get(slug);
  return Boolean(row);
}

export interface UpsertInsightInput {
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  bodyEn: string;
  bodyAr: string;
  category: string;
  tags: string[];
  status?: InsightStatus;
}

export function createInsight(input: UpsertInsightInput): Insight {
  const db = getDb();
  const id = randomUUID();
  const slug = ensureUniqueSlug(input.titleEn, (candidate) => slugExists(candidate));
  const now = new Date().toISOString();
  const status = input.status ?? 'draft';
  const publishedAt = status === 'published' ? now : null;

  db.prepare(
    `INSERT INTO insights
      (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, category, tags, status, published_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    slug,
    input.titleEn,
    input.titleAr,
    input.excerptEn,
    input.excerptAr,
    input.bodyEn,
    input.bodyAr,
    input.category,
    JSON.stringify(input.tags),
    status,
    publishedAt,
    now,
    now
  );

  return getInsightById(id)!;
}

export function updateInsight(id: string, input: Partial<UpsertInsightInput>): Insight {
  const db = getDb();
  const current = getInsightById(id);
  if (!current) throw new NotFoundError('Insight', id);

  const next = { ...current, ...input };
  const slug =
    input.titleEn && input.titleEn !== current.titleEn
      ? ensureUniqueSlug(input.titleEn, (candidate) => slugExists(candidate, id))
      : current.slug;

  // published_at is set the first time status becomes 'published' and never
  // moves again on subsequent edits, so the public-facing publish date is stable.
  const now = new Date().toISOString();
  const publishedAt =
    next.status === 'published' ? current.publishedAt ?? now : current.publishedAt;

  db.prepare(
    `UPDATE insights SET
      slug = ?, title_en = ?, title_ar = ?, excerpt_en = ?, excerpt_ar = ?,
      body_en = ?, body_ar = ?, category = ?, tags = ?, status = ?, published_at = ?, updated_at = ?
     WHERE id = ?`
  ).run(
    slug,
    next.titleEn,
    next.titleAr,
    next.excerptEn,
    next.excerptAr,
    next.bodyEn,
    next.bodyAr,
    next.category,
    JSON.stringify(next.tags),
    next.status,
    publishedAt,
    now,
    id
  );

  return getInsightById(id)!;
}

export function deleteInsight(id: string): void {
  const db = getDb();
  const current = getInsightById(id);
  if (!current) throw new NotFoundError('Insight', id);
  db.prepare('DELETE FROM insights WHERE id = ?').run(id);
}

export function getInsightById(id: string): Insight | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM insights WHERE id = ?').get(id) as
    | InsightRow
    | undefined;
  return row ? toInsight(row) : null;
}

export function getInsightBySlug(slug: string): Insight | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM insights WHERE slug = ?').get(slug) as
    | InsightRow
    | undefined;
  return row ? toInsight(row) : null;
}

export interface ListInsightsParams {
  status?: InsightStatus;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}

export function listInsights(params: ListInsightsParams = {}): PaginatedResult<Insight> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.status) {
    conditions.push('status = ?');
    values.push(params.status);
  }
  if (params.category) {
    conditions.push('category = ?');
    values.push(params.category);
  }
  if (params.tag) {
    conditions.push('tags LIKE ?');
    values.push(`%"${params.tag}"%`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const total = (
    db.prepare(`SELECT COUNT(*) as count FROM insights ${whereClause}`).get(...values) as {
      count: number;
    }
  ).count;

  const orderColumn = params.status === 'published' ? 'published_at' : 'created_at';
  const rows = db
    .prepare(
      `SELECT * FROM insights ${whereClause} ORDER BY ${orderColumn} DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as InsightRow[];

  return toPaginatedResult(rows.map(toInsight), total, page, pageSize);
}
