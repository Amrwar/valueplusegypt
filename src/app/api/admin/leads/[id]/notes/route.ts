import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { toApiErrorResponse } from '@/lib/api-error';
import { ValidationError } from '@/lib/errors';
import { addLeadNote, listLeadNotes } from '@/models/leads';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    return NextResponse.json(listLeadNotes(id));
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const noteBody = typeof body?.body === 'string' ? body.body.trim() : '';

    if (!noteBody) {
      throw new ValidationError('Note body is required', { body: 'required' });
    }

    const note = addLeadNote(id, admin.name, noteBody);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
