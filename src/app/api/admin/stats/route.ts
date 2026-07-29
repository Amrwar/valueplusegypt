import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { getDashboardStats } from '@/models/stats';

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(getDashboardStats());
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
