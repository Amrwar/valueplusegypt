import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown';
}

/** Same as getClientIp, for use in Server Actions where there is no NextRequest. */
export async function getClientIpFromHeaders(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  const realIp = headerList.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown';
}
