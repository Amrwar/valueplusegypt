import { NextResponse } from 'next/server';
import {
  ConflictError,
  InvalidTransitionError,
  NotFoundError,
  RateLimitedError,
  UnauthorizedError,
  ValidationError,
} from '@/lib/errors';

/** Maps a thrown model/domain error to the appropriate JSON error response. */
export function toApiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: 'validation_error', message: error.message, fieldErrors: error.fieldErrors },
      { status: 400 }
    );
  }

  if (error instanceof InvalidTransitionError) {
    return NextResponse.json({ error: 'invalid_transition', message: error.message }, { status: 400 });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: 'unauthorized', message: error.message }, { status: 401 });
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json({ error: 'not_found', message: error.message }, { status: 404 });
  }

  if (error instanceof ConflictError) {
    return NextResponse.json({ error: 'conflict', message: error.message }, { status: 409 });
  }

  if (error instanceof RateLimitedError) {
    return NextResponse.json(
      { error: 'rate_limited', retry_after_seconds: error.retryAfterSeconds },
      { status: 429, headers: { 'Retry-After': String(error.retryAfterSeconds) } }
    );
  }

  console.error('Unhandled API error:', error);
  return NextResponse.json({ error: 'internal_error', message: 'Something went wrong' }, { status: 500 });
}
