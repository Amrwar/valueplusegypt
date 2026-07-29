import type { Metadata } from 'next';
import { listNewsletterSubscribers } from '@/models/newsletter';
import StatusBadge from '@/components/admin/StatusBadge';

export const metadata: Metadata = {
  title: 'Newsletter — Admin',
  robots: { index: false, follow: false },
};

export default async function AdminNewsletterPage() {
  const result = listNewsletterSubscribers({ pageSize: 100 });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Newsletter subscribers</h1>
      <p className="mt-1 text-sm text-navy-500">{result.total} total</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="min-w-full divide-y divide-navy-100 text-sm">
          <thead className="bg-navy-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {result.items.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-navy-50">
                <td className="px-4 py-3 text-navy-900">{subscriber.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={subscriber.status} />
                </td>
                <td className="px-4 py-3 text-navy-500">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {result.items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-navy-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
