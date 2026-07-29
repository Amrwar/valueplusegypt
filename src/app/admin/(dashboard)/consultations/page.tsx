import type { Metadata } from 'next';
import Link from 'next/link';
import { listConsultationRequests } from '@/models/consultationRequests';
import { CONSULTATION_STATUSES, ConsultationStatus } from '@/types/crm';
import StatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Consultations — Admin',
  robots: { index: false, follow: false },
};

interface ConsultationsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminConsultationsPage({ searchParams }: ConsultationsPageProps) {
  const params = await searchParams;
  const status = CONSULTATION_STATUSES.includes(params.status as ConsultationStatus)
    ? (params.status as ConsultationStatus)
    : undefined;
  const page = params.page ? Number(params.page) : 1;

  const result = listConsultationRequests({ status, page });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Consultation requests</h1>
      <p className="mt-1 text-sm text-navy-500">
        {result.total} total, sorted by priority score
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/consultations"
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium',
            !status ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-700'
          )}
        >
          All
        </Link>
        {CONSULTATION_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/consultations?status=${s}`}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium capitalize',
              status === s ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-700'
            )}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="min-w-full divide-y divide-navy-100 text-sm">
          <thead className="bg-navy-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Service</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Budget</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Priority</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {result.items.map((c) => (
              <tr key={c.id} className="hover:bg-navy-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/consultations/${c.id}`} className="font-medium text-navy-900 hover:text-gold-500">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-navy-600">{c.serviceType}</td>
                <td className="px-4 py-3 text-navy-600">{c.budgetRange}</td>
                <td className="px-4 py-3 font-semibold text-navy-900">{c.priorityScore}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
            {result.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                  No consultation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
