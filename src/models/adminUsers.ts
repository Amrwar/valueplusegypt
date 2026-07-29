import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { hashPassword } from '@/lib/auth/password';
import { AdminUser } from '@/types/crm';

interface AdminUserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

function toAdminUser(row: AdminUserRow): AdminUser {
  return { id: row.id, email: row.email, name: row.name, createdAt: row.created_at };
}

export function findAdminUserRowByEmail(email: string): AdminUserRow | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as
    | AdminUserRow
    | undefined;
}

export async function createAdminUser(input: {
  email: string;
  password: string;
  name: string;
}): Promise<AdminUser> {
  const db = getDb();
  const existing = findAdminUserRowByEmail(input.email);
  if (existing) {
    throw new Error(`Admin user with email ${input.email} already exists`);
  }

  const id = randomUUID();
  const passwordHash = await hashPassword(input.password);
  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO admin_users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(id, input.email, passwordHash, input.name, createdAt);

  return { id, email: input.email, name: input.name, createdAt };
}

export function countAdminUsers(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
  return row.count;
}
