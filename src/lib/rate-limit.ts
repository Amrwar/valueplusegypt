import { getDb } from '@/lib/db/client';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface RateLimitEventRow {
  created_at: string;
}

/**
 * Sliding-window rate limiter backed by the rate_limit_events table.
 * Counts events for `bucketKey`/`action` created within the last `windowMs`
 * and admits the request only if that count is below `limit`.
 */
export function checkRateLimit(
  bucketKey: string,
  action: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const db = getDb();
  const now = Date.now();
  const windowStart = new Date(now - windowMs).toISOString();

  const events = db
    .prepare(
      'SELECT created_at FROM rate_limit_events WHERE bucket_key = ? AND action = ? AND created_at >= ? ORDER BY created_at ASC'
    )
    .all(bucketKey, action, windowStart) as RateLimitEventRow[];

  if (events.length >= limit) {
    const oldest = new Date(events[0].created_at).getTime();
    const retryAfterMs = Math.max(0, oldest + windowMs - now);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  db.prepare(
    'INSERT INTO rate_limit_events (bucket_key, action, created_at) VALUES (?, ?, ?)'
  ).run(bucketKey, action, new Date(now).toISOString());

  return {
    allowed: true,
    remaining: limit - events.length - 1,
    retryAfterSeconds: 0,
  };
}

/** Removes rate-limit rows older than any tracked window; safe to call periodically. */
export function pruneRateLimitEvents(olderThanMs: number): void {
  const db = getDb();
  const cutoff = new Date(Date.now() - olderThanMs).toISOString();
  db.prepare('DELETE FROM rate_limit_events WHERE created_at < ?').run(cutoff);
}
