import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { RateLimitedError, ValidationError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import { submitTestimonial, SubmitTestimonialInput } from '@/models/testimonials';

const MAX_PER_IP_PER_DAY = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

function validate(body: unknown): SubmitTestimonialInput {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Invalid request body');
  }

  const b = body as Record<string, unknown>;
  const fieldErrors: Record<string, string> = {};

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const quoteEn = typeof b.quoteEn === 'string' ? b.quoteEn.trim() : '';
  const quoteAr = typeof b.quoteAr === 'string' ? b.quoteAr.trim() : '';
  const role = typeof b.role === 'string' ? b.role.trim() : '';
  const company = typeof b.company === 'string' ? b.company.trim() : '';
  const rating = typeof b.rating === 'number' ? b.rating : Number(b.rating);

  if (!name) fieldErrors.name = 'required';
  if (!quoteEn) fieldErrors.quoteEn = 'required';
  if (!quoteAr) fieldErrors.quoteAr = 'required';
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fieldErrors.rating = 'invalid';

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError('Validation failed', fieldErrors);
  }

  return { name, role, company, quoteEn, quoteAr, rating };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const input = validate(body);

    const ip = getClientIp(request);
    const limit = checkRateLimit(`testimonial:ip:${ip}`, 'testimonial_submit', MAX_PER_IP_PER_DAY, DAY_MS);
    if (!limit.allowed) {
      throw new RateLimitedError(limit.retryAfterSeconds);
    }

    const created = submitTestimonial(input);

    return NextResponse.json({ id: created.id, status: created.status }, { status: 201 });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
