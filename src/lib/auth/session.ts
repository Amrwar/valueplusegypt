import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db/client';
import { UnauthorizedError } from '@/lib/errors';
import { findAdminUserRowByEmail } from '@/models/adminUsers';
import { AdminUser } from '@/types/crm';

export const SESSION_COOKIE_NAME = 'vpe_admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface AdminUserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

interface SessionRow {
  token: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

export const findAdminByEmail = findAdminUserRowByEmail;

function toAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
  };
}

export function createSession(userId: string): { token: string; expiresAt: string } {
  const db = getDb();
  const token = randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS).toISOString();

  db.prepare(
    'INSERT INTO admin_sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)'
  ).run(token, userId, expiresAt, now.toISOString());

  return { token, expiresAt };
}

export function destroySessionToken(token: string): void {
  const db = getDb();
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
}

/** Deletes expired sessions; cheap enough to call opportunistically on validation. */
function pruneExpiredSessions(): void {
  const db = getDb();
  db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(new Date().toISOString());
}

export function validateSessionToken(token: string): AdminUser | null {
  const db = getDb();
  pruneExpiredSessions();

  const session = db
    .prepare('SELECT * FROM admin_sessions WHERE token = ?')
    .get(token) as SessionRow | undefined;

  if (!session) return null;
  if (new Date(session.expires_at).getTime() < Date.now()) return null;

  const user = db
    .prepare('SELECT * FROM admin_users WHERE id = ?')
    .get(session.user_id) as AdminUserRow | undefined;

  return user ? toAdminUser(user) : null;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return validateSessionToken(token);
}

export async function setSessionCookie(token: string, expiresAt: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAt),
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) destroySessionToken(token);
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/** Throws UnauthorizedError when there is no valid admin session; use in API routes. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new UnauthorizedError();
  return admin;
}
