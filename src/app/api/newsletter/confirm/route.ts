import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError } from '@/lib/errors';
import { confirmNewsletterSubscription } from '@/models/newsletter';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      throw new ValidationError('Missing token', { token: 'required' });
    }

    const subscriber = confirmNewsletterSubscription(token);

    return NextResponse.json({ status: subscriber.status, email: subscriber.email });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
