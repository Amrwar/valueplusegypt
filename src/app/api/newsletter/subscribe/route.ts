import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { toApiErrorResponse } from '@/lib/api-error';
import { RateLimitedError, ValidationError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import { isValidEmail } from '@/lib/validate';
import { subscribeToNewsletter } from '@/models/newsletter';

const MAX_PER_IP_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const locale = typeof body?.locale === 'string' && body.locale ? body.locale : 'en';

    if (!email || !isValidEmail(email)) {
      throw new ValidationError('Validation failed', { email: 'invalid' });
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(`newsletter:ip:${ip}`, 'newsletter_subscribe', MAX_PER_IP_PER_HOUR, HOUR_MS);
    if (!limit.allowed) {
      throw new RateLimitedError(limit.retryAfterSeconds);
    }

    const { subscriber, confirmToken } = subscribeToNewsletter(email);

    if (confirmToken && process.env.RESEND_API_KEY) {
      const confirmUrl = `${request.nextUrl.origin}/${locale}/newsletter/confirm?token=${confirmToken}`;
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: 'Confirm your subscription — Value Plus Egypt',
          html: `
            <h2>Confirm your subscription</h2>
            <p>Click the link below to start receiving updates from Value Plus Egypt.</p>
            <p><a href="${confirmUrl}">${confirmUrl}</a></p>
          `,
        });
      } catch (err) {
        console.error('Failed to send newsletter confirmation email:', err);
      }
    }

    return NextResponse.json({ status: subscriber.status }, { status: 202 });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
