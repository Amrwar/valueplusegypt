'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { RateLimitedError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIpFromHeaders } from '@/lib/request-ip';
import { isValidEmail } from '@/lib/validate';
import { subscribeToNewsletter } from '@/models/newsletter';

export interface NewsletterFormState {
  status: 'idle' | 'success' | 'already_subscribed' | 'error';
}

const MAX_PER_IP_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

async function resolveOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') || 'https';
  return host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.valuepluseg.org';
}

export async function subscribeToNewsletterAction(
  locale: string,
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const email = formData.get('email')?.toString().trim().toLowerCase() || '';

  if (!email || !isValidEmail(email)) {
    return { status: 'error' };
  }

  try {
    const ip = await getClientIpFromHeaders();
    const limit = checkRateLimit(`newsletter:ip:${ip}`, 'newsletter_subscribe', MAX_PER_IP_PER_HOUR, HOUR_MS);
    if (!limit.allowed) throw new RateLimitedError(limit.retryAfterSeconds);

    const { subscriber, confirmToken } = subscribeToNewsletter(email);

    if (!confirmToken) {
      return { status: 'already_subscribed' };
    }

    if (process.env.RESEND_API_KEY) {
      const origin = await resolveOrigin();
      const confirmUrl = `${origin}/${locale}/newsletter/confirm?token=${confirmToken}`;
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

    return { status: subscriber.status === 'confirmed' ? 'already_subscribed' : 'success' };
  } catch {
    return { status: 'error' };
  }
}
