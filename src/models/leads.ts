import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError, InvalidTransitionError } from '@/lib/errors';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';
import { Lead, LeadNote, LeadStatus, LEAD_STATUS_TRANSITIONS, PaginatedResult } from '@/types/crm';

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
  assigned_to: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

interface LeadNoteRow {
  id: string;
  lead_id: string;
  author: string;
  body: string;
  created_at: string;
}

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    message: row.message,
    status: row.status as LeadStatus,
    assignedTo: row.assigned_to,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toLeadNote(row: LeadNoteRow): LeadNote {
  return {
    id: row.id,
    leadId: row.lead_id,
    author: row.author,
    body: row.body,
    createdAt: row.created_at,
  };
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  source?: string;
}

export function createLead(input: CreateLeadInput): Lead {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO leads (id, name, email, phone, company, service, message, status, assigned_to, source, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new', NULL, ?, ?, ?)`
  ).run(
    id,
    input.name,
    input.email,
    input.phone,
    input.company ?? '',
    input.service ?? '',
    input.message,
    input.source ?? 'contact_form',
    now,
    now
  );

  return getLeadById(id)!;
}

export function getLeadById(id: string): Lead | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as LeadRow | undefined;
  return row ? toLead(row) : null;
}

export interface ListLeadsParams {
  status?: LeadStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export function listLeads(params: ListLeadsParams = {}): PaginatedResult<Lead> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.status) {
    conditions.push('status = ?');
    values.push(params.status);
  }

  if (params.search) {
    conditions.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)');
    const term = `%${params.search}%`;
    values.push(term, term, term);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const total = (
    db.prepare(`SELECT COUNT(*) as count FROM leads ${whereClause}`).get(...values) as {
      count: number;
    }
  ).count;

  const rows = db
    .prepare(
      `SELECT * FROM leads ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as LeadRow[];

  return toPaginatedResult(rows.map(toLead), total, page, pageSize);
}

export function updateLeadStatus(id: string, nextStatus: LeadStatus): Lead {
  const db = getDb();
  const current = getLeadById(id);
  if (!current) throw new NotFoundError('Lead', id);

  if (current.status !== nextStatus) {
    const allowed = LEAD_STATUS_TRANSITIONS[current.status];
    if (!allowed.includes(nextStatus)) {
      throw new InvalidTransitionError(current.status, nextStatus);
    }
  }

  const now = new Date().toISOString();
  db.prepare('UPDATE leads SET status = ?, updated_at = ? WHERE id = ?').run(
    nextStatus,
    now,
    id
  );

  return getLeadById(id)!;
}

export function assignLead(id: string, assignedTo: string | null): Lead {
  const db = getDb();
  const current = getLeadById(id);
  if (!current) throw new NotFoundError('Lead', id);

  const now = new Date().toISOString();
  db.prepare('UPDATE leads SET assigned_to = ?, updated_at = ? WHERE id = ?').run(
    assignedTo,
    now,
    id
  );

  return getLeadById(id)!;
}

export function addLeadNote(leadId: string, author: string, body: string): LeadNote {
  const db = getDb();
  const lead = getLeadById(leadId);
  if (!lead) throw new NotFoundError('Lead', leadId);

  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    'INSERT INTO lead_notes (id, lead_id, author, body, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(id, leadId, author, body, now);

  return { id, leadId, author, body, createdAt: now };
}

export function listLeadNotes(leadId: string): LeadNote[] {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM lead_notes WHERE lead_id = ? ORDER BY created_at DESC')
    .all(leadId) as LeadNoteRow[];
  return rows.map(toLeadNote);
}
