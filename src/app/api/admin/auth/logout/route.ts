import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
