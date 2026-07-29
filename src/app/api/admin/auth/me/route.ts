import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { UnauthorizedError } from '@/lib/errors';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) throw new UnauthorizedError();
    return NextResponse.json(admin);
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
