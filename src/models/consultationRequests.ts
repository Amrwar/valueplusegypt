import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/client';
import { NotFoundError } from '@/lib/errors';
import { normalizePagination, toPaginatedResult } from '@/lib/pagination';
import { calculatePriorityScore } from '@/lib/scoring';
import {
  ConsultationRequest,
  ConsultationRequestInput,
  ConsultationStatus,
  PaginatedResult,
} from '@/types/crm';

interface ConsultationRequestRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  budget_range: string;
  timeline: string;
  message: string;
  priority_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

function toConsultationRequest(row: ConsultationRequestRow): ConsultationRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    serviceType: row.service_type as ConsultationRequest['serviceType'],
    budgetRange: row.budget_range as ConsultationRequest['budgetRange'],
    timeline: row.timeline as ConsultationRequest['timeline'],
    message: row.message,
    priorityScore: row.priority_score,
    status: row.status as ConsultationStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createConsultationRequest(input: ConsultationRequestInput): ConsultationRequest {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();
  const priorityScore = calculatePriorityScore(input);

  db.prepare(
    `INSERT INTO consultation_requests
      (id, name, email, phone, service_type, budget_range, timeline, message, priority_score, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).run(
    id,
    input.name,
    input.email,
    input.phone,
    input.serviceType,
    input.budgetRange,
    input.timeline,
    input.message,
    priorityScore,
    now,
    now
  );

  return getConsultationRequestById(id)!;
}

export function getConsultationRequestById(id: string): ConsultationRequest | null {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM consultation_requests WHERE id = ?')
    .get(id) as ConsultationRequestRow | undefined;
  return row ? toConsultationRequest(row) : null;
}

export interface ListConsultationRequestsParams {
  status?: ConsultationStatus;
  page?: number;
  pageSize?: number;
}

export function listConsultationRequests(
  params: ListConsultationRequestsParams = {}
): PaginatedResult<ConsultationRequest> {
  const db = getDb();
  const { page, pageSize, offset } = normalizePagination(params.page, params.pageSize);

  const whereClause = params.status ? 'WHERE status = ?' : '';
  const values = params.status ? [params.status] : [];

  const total = (
    db
      .prepare(`SELECT COUNT(*) as count FROM consultation_requests ${whereClause}`)
      .get(...values) as { count: number }
  ).count;

  const rows = db
    .prepare(
      `SELECT * FROM consultation_requests ${whereClause} ORDER BY priority_score DESC, created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...values, pageSize, offset) as ConsultationRequestRow[];

  return toPaginatedResult(rows.map(toConsultationRequest), total, page, pageSize);
}

export function updateConsultationStatus(
  id: string,
  status: ConsultationStatus
): ConsultationRequest {
  const db = getDb();
  const current = getConsultationRequestById(id);
  if (!current) throw new NotFoundError('Consultation request', id);

  const now = new Date().toISOString();
  db.prepare('UPDATE consultation_requests SET status = ?, updated_at = ? WHERE id = ?').run(
    status,
    now,
    id
  );

  return getConsultationRequestById(id)!;
}
