import { NextRequest, NextResponse } from 'next/server';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError, RateLimitedError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import { isValidEmail } from '@/lib/validate';
import { createConsultationRequest } from '@/models/consultationRequests';
import {
  BUDGET_RANGES,
  ConsultationRequestInput,
  SERVICE_TYPES,
  TIMELINES,
} from '@/types/crm';

const MAX_PER_EMAIL_PER_DAY = 3;
const MAX_PER_IP_PER_HOUR = 10;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

function validate(body: unknown): { input: ConsultationRequestInput } {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Invalid request body');
  }

  const b = body as Record<string, unknown>;
  const fieldErrors: Record<string, string> = {};

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const serviceType = typeof b.serviceType === 'string' ? b.serviceType : '';
  const budgetRange = typeof b.budgetRange === 'string' ? b.budgetRange : '';
  const timeline = typeof b.timeline === 'string' ? b.timeline : '';
  const message = typeof b.message === 'string' ? b.message.trim() : '';

  if (!name) fieldErrors.name = 'required';
  if (!email) fieldErrors.email = 'required';
  else if (!isValidEmail(email)) fieldErrors.email = 'invalid';
  if (!phone) fieldErrors.phone = 'required';
  if (!SERVICE_TYPES.includes(serviceType as ConsultationRequestInput['serviceType'])) {
    fieldErrors.serviceType = 'invalid';
  }
  if (!BUDGET_RANGES.includes(budgetRange as ConsultationRequestInput['budgetRange'])) {
    fieldErrors.budgetRange = 'invalid';
  }
  if (!TIMELINES.includes(timeline as ConsultationRequestInput['timeline'])) {
    fieldErrors.timeline = 'invalid';
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError('Validation failed', fieldErrors);
  }

  return {
    input: {
      name,
      email,
      phone,
      serviceType: serviceType as ConsultationRequestInput['serviceType'],
      budgetRange: budgetRange as ConsultationRequestInput['budgetRange'],
      timeline: timeline as ConsultationRequestInput['timeline'],
      message,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { input } = validate(body);

    const ip = getClientIp(request);
    const emailLimit = checkRateLimit(
      `consultation:email:${input.email.toLowerCase()}`,
      'consultation_request',
      MAX_PER_EMAIL_PER_DAY,
      DAY_MS
    );
    if (!emailLimit.allowed) {
      throw new RateLimitedError(emailLimit.retryAfterSeconds);
    }

    const ipLimit = checkRateLimit(`consultation:ip:${ip}`, 'consultation_request', MAX_PER_IP_PER_HOUR, HOUR_MS);
    if (!ipLimit.allowed) {
      throw new RateLimitedError(ipLimit.retryAfterSeconds);
    }

    const created = createConsultationRequest(input);

    return NextResponse.json(
      { id: created.id, status: created.status, createdAt: created.createdAt },
      { status: 201 }
    );
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
