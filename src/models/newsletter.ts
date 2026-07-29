import { randomBytes, randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { NewsletterStatus, NewsletterSubscriber, PaginatedResult } from '@/types/crm';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';

const CONFIRM_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface NewsletterSubscriberRow {
  id: string;
  email: string;
  status: string;
  confirm_token: string | null;
  confirm_token_expires_at: string | null;
  unsubscribe_token: string;
  created_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
}

function toSubscriber(row: NewsletterSubscriberRow): NewsletterSubscriber {
  return {
    id: row.id,
    email: row.email,
    status: row.status as NewsletterStatus,
    createdAt: row.created_at,
    confirmedAt: row.confirmed_at,
    unsubscribedAt: row.unsubscribed_at,
  };
}

function generateToken(): string {
  return randomBytes(24).toString('hex');
}

function getRowByEmail(email: string): NewsletterSubscriberRow | undefined {
  const db = getDb();
  return db
    .prepare('SELECT * FROM newsletter_subscribers WHERE email = ?')
    .get(email) as NewsletterSubscriberRow | undefined;
}

export interface SubscribeResult {
  subscriber: NewsletterSubscriber;
  confirmToken: string;
}

/**
 * Starts (or restarts) double opt-in for an email. Already-confirmed
 * subscribers are returned unchanged so re-submitting the signup form is a
 * harmless no-op rather than an error.
 */
export function subscribeToNewsletter(email: string): SubscribeResult {
  const db = getDb();
  const existing = getRowByEmail(email);
  const confirmToken = generateToken();
  const confirmTokenExpiresAt = new Date(Date.now() + CONFIRM_TOKEN_TTL_MS).toISOString();

  if (!existing) {
    const id = randomUUID();
    const now = new Date().toISOString();
    const unsubscribeToken = generateToken();

    db.prepare(
      `INSERT INTO newsletter_subscribers
        (id, email, status, confirm_token, confirm_token_expires_at, unsubscribe_token, created_at, confirmed_at, unsubscribed_at)
       VALUES (?, ?, 'pending', ?, ?, ?, ?, NULL, NULL)`
    ).run(id, email, confirmToken, confirmTokenExpiresAt, unsubscribeToken, now);

    return { subscriber: toSubscriber(getRowByEmail(email)!), confirmToken };
  }

  if (existing.status === 'confirmed') {
    return { subscriber: toSubscriber(existing), confirmToken: '' };
  }

  // pending or unsubscribed: (re)issue a confirmation token
  db.prepare(
    `UPDATE newsletter_subscribers
     SET status = 'pending', confirm_token = ?, confirm_token_expires_at = ?, unsubscribed_at = NULL
     WHERE email = ?`
  ).run(confirmToken, confirmTokenExpiresAt, email);

  return { subscriber: toSubscriber(getRowByEmail(email)!), confirmToken };
}

/**
 * Confirming is idempotent: revisiting an already-used confirmation link
 * (browser refresh, email-client link prefetch) succeeds silently instead
 * of failing, since the token is intentionally left in place after use.
 */
export function confirmNewsletterSubscription(token: string): NewsletterSubscriber {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM newsletter_subscribers WHERE confirm_token = ?')
    .get(token) as NewsletterSubscriberRow | undefined;

  if (!row) throw new NotFoundError('Newsletter confirmation token', token);

  if (row.status === 'confirmed') {
    return toSubscriber(row);
  }

  if (!row.confirm_token_expires_at || new Date(row.confirm_token_expires_at) < new Date()) {
    throw new ValidationError('Confirmation link has expired', { token: 'expired' });
  }

  const now = new Date().toISOString();
  db.prepare(
    `UPDATE newsletter_subscribers SET status = 'confirmed', confirmed_at = ? WHERE id = ?`
  ).run(now, row.id);

  return toSubscriber(getRowByEmail(row.email)!);
}

export function unsubscribeFromNewsletter(token: string): NewsletterSubscriber {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM newsletter_subscribers WHERE unsubscribe_token = ?')
    .get(token) as NewsletterSubscriberRow | undefined;

  if (!row) throw new NotFoundError('Newsletter subscriber', token);

  const now = new Date().toISOString();
  db.prepare(
    `UPDATE newsletter_subscribers SET status = 'unsubscribed', unsubscribed_at = ? WHERE id = ?`
  ).run(now, row.id);

  return toSubscriber(getRowByEmail(row.email)!);
}

export interface ListSubscribersParams {
  status?: NewsletterStatus;
  page?: number;
  pageSize?: number;
}

export function listNewsletterSubscribers(
  params: ListSubscribersParams = {}
): PaginatedResult<NewsletterSubscriber> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const whereClause = params.status ? 'WHERE status = ?' : '';
  const values = params.status ? [params.status] : [];

  const total = (
    db
      .prepare(`SELECT COUNT(*) as count FROM newsletter_subscribers ${whereClause}`)
      .get(...values) as { count: number }
  ).count;

  const rows = db
    .prepare(
      `SELECT * FROM newsletter_subscribers ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as NewsletterSubscriberRow[];

  return toPaginatedResult(rows.map(toSubscriber), total, page, pageSize);
}
