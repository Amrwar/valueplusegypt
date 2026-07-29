'use server';

import { RateLimitedError, ValidationError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIpFromHeaders } from '@/lib/request-ip';
import { submitTestimonial } from '@/models/testimonials';

export interface TestimonialFormState {
  success: boolean;
  error: string;
  fieldErrors: Record<string, string>;
}

const MAX_PER_IP_PER_DAY = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

export async function submitTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const name = formData.get('name')?.toString().trim() || '';
  const role = formData.get('role')?.toString().trim() || '';
  const company = formData.get('company')?.toString().trim() || '';
  const quote = formData.get('quote')?.toString().trim() || '';
  const rating = Number(formData.get('rating'));

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'required';
  if (!quote) fieldErrors.quote = 'required';
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fieldErrors.rating = 'required';

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: '', fieldErrors };
  }

  try {
    const ip = await getClientIpFromHeaders();
    const limit = checkRateLimit(`testimonial:ip:${ip}`, 'testimonial_submit', MAX_PER_IP_PER_DAY, DAY_MS);
    if (!limit.allowed) throw new RateLimitedError(limit.retryAfterSeconds);

    // Public submitters write in one language; the same text is stored for
    // both locales and can be refined by an admin before it goes live.
    submitTestimonial({ name, role, company, quoteEn: quote, quoteAr: quote, rating });
  } catch (error) {
    if (error instanceof RateLimitedError) {
      return { success: false, error: 'rateLimited', fieldErrors: {} };
    }
    if (error instanceof ValidationError) {
      return { success: false, error: '', fieldErrors: error.fieldErrors };
    }
    return { success: false, error: 'error', fieldErrors: {} };
  }

  return { success: true, error: '', fieldErrors: {} };
}
