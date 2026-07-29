import { getDb } from '@/lib/db/client';
import { LeadStatus, LEAD_STATUSES } from '@/types/crm';

export interface DashboardStats {
  leadsByStatus: Record<LeadStatus, number>;
  pendingConsultations: number;
  pendingTestimonials: number;
  confirmedSubscribers: number;
  publishedInsights: number;
  publishedProperties: number;
}

function countWhere(table: string, whereClause: string, ...values: unknown[]): number {
  const db = getDb();
  const row = db.prepare(`SELECT COUNT(*) as count FROM ${table} ${whereClause}`).get(...values) as {
    count: number;
  };
  return row.count;
}

export function getDashboardStats(): DashboardStats {
  const leadsByStatus = {} as Record<LeadStatus, number>;
  for (const status of LEAD_STATUSES) {
    leadsByStatus[status] = countWhere('leads', 'WHERE status = ?', status);
  }

  return {
    leadsByStatus,
    pendingConsultations: countWhere('consultation_requests', "WHERE status = 'pending'"),
    pendingTestimonials: countWhere('testimonials', "WHERE status = 'pending'"),
    confirmedSubscribers: countWhere('newsletter_subscribers', "WHERE status = 'confirmed'"),
    publishedInsights: countWhere('insights', "WHERE status = 'published'"),
    publishedProperties: countWhere('properties', "WHERE status = 'published'"),
  };
}
