'use server';

import { RateLimitedError, ValidationError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIpFromHeaders } from '@/lib/request-ip';
import { isValidEmail } from '@/lib/validate';
import { createConsultationRequest } from '@/models/consultationRequests';
import {
  BUDGET_RANGES,
  BudgetRange,
  ConsultationRequestInput,
  SERVICE_TYPES,
  ServiceType,
  Timeline,
  TIMELINES,
} from '@/types/crm';

export interface ConsultationFormState {
  success: boolean;
  error: string;
  fieldErrors: Record<string, string>;
}

const MAX_PER_EMAIL_PER_DAY = 3;
const MAX_PER_IP_PER_HOUR = 10;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

export async function submitConsultationRequest(
  _prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const serviceType = formData.get('serviceType')?.toString() || '';
  const budgetRange = formData.get('budgetRange')?.toString() || '';
  const timeline = formData.get('timeline')?.toString() || '';
  const message = formData.get('message')?.toString().trim() || '';

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'required';
  if (!email) fieldErrors.email = 'required';
  else if (!isValidEmail(email)) fieldErrors.email = 'invalidEmail';
  if (!phone) fieldErrors.phone = 'required';
  if (!SERVICE_TYPES.includes(serviceType as ServiceType)) fieldErrors.serviceType = 'required';
  if (!BUDGET_RANGES.includes(budgetRange as BudgetRange)) fieldErrors.budgetRange = 'required';
  if (!TIMELINES.includes(timeline as Timeline)) fieldErrors.timeline = 'required';

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: '', fieldErrors };
  }

  const input: ConsultationRequestInput = {
    name,
    email,
    phone,
    serviceType: serviceType as ServiceType,
    budgetRange: budgetRange as BudgetRange,
    timeline: timeline as Timeline,
    message,
  };

  try {
    const ip = await getClientIpFromHeaders();

    const emailLimit = checkRateLimit(
      `consultation:email:${email.toLowerCase()}`,
      'consultation_request',
      MAX_PER_EMAIL_PER_DAY,
      DAY_MS
    );
    if (!emailLimit.allowed) throw new RateLimitedError(emailLimit.retryAfterSeconds);

    const ipLimit = checkRateLimit(`consultation:ip:${ip}`, 'consultation_request', MAX_PER_IP_PER_HOUR, HOUR_MS);
    if (!ipLimit.allowed) throw new RateLimitedError(ipLimit.retryAfterSeconds);

    createConsultationRequest(input);
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
