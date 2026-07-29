'use server';

import { redirect } from 'next/navigation';
import { verifyPassword } from '@/lib/auth/password';
import { clearSessionCookie, createSession, findAdminByEmail, setSessionCookie } from '@/lib/auth/session';
import { checkRateLimit } from '@/lib/rate-limit';

export interface AdminLoginState {
  error: string;
}

const MAX_ATTEMPTS_PER_EMAIL_PER_15MIN = 10;
const WINDOW_MS = 15 * 60 * 1000;

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = formData.get('email')?.toString().trim().toLowerCase() || '';
  const password = formData.get('password')?.toString() || '';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const limit = checkRateLimit(`admin_login:email:${email}`, 'admin_login', MAX_ATTEMPTS_PER_EMAIL_PER_15MIN, WINDOW_MS);
  if (!limit.allowed) {
    return { error: 'Too many attempts. Please try again later.' };
  }

  const userRow = findAdminByEmail(email);
  const passwordValid = userRow ? await verifyPassword(password, userRow.password_hash) : false;

  if (!userRow || !passwordValid) {
    return { error: 'Invalid email or password.' };
  }

  const { token, expiresAt } = createSession(userRow.id);
  await setSessionCookie(token, expiresAt);

  redirect('/admin');
}

export async function logoutAdmin(): Promise<void> {
  await clearSessionCookie();
  redirect('/admin/login');
}
