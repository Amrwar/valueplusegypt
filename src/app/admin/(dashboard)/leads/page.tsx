import type { Metadata } from 'next';
import Link from 'next/link';
import { listLeads } from '@/models/leads';
import { LEAD_STATUSES, LeadStatus } from '@/types/crm';
import StatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Leads — Admin',
  robots: { index: false, follow: false },
};

interface LeadsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const status = LEAD_STATUSES.includes(params.status as LeadStatus)
    ? (params.status as LeadStatus)
    : undefined;
  const page = params.page ? Number(params.page) : 1;

  const result = listLeads({ status, page });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Leads</h1>
      <p className="mt-1 text-sm text-navy-500">{result.total} total</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/leads"
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium',
            !status ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-700'
          )}
        >
          All
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/leads?status=${s}`}
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
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Service</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {result.items.map((lead) => (
              <tr key={lead.id} className="hover:bg-navy-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-navy-900 hover:text-gold-500">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-navy-600">{lead.email}</td>
                <td className="px-4 py-3 text-navy-600">{lead.service || '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-navy-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {result.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {result.totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/leads?${status ? `status=${status}&` : ''}page=${p}`}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm',
                p === result.page ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-700'
              )}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
