import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSession, findAdminByEmail, setSessionCookie } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { RateLimitedError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

const MAX_ATTEMPTS_PER_IP_PER_15MIN = 10;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(`admin_login:ip:${ip}`, 'admin_login', MAX_ATTEMPTS_PER_IP_PER_15MIN, WINDOW_MS);
    if (!limit.allowed) {
      throw new RateLimitedError(limit.retryAfterSeconds);
    }

    const userRow = findAdminByEmail(email);
    const passwordValid = userRow ? await verifyPassword(password, userRow.password_hash) : false;

    if (!userRow || !passwordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const { token, expiresAt } = createSession(userRow.id);
    await setSessionCookie(token, expiresAt);

    return NextResponse.json({ id: userRow.id, email: userRow.email, name: userRow.name });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
