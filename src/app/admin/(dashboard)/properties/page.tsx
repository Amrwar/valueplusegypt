import type { Metadata } from 'next';
import Link from 'next/link';
import { deletePropertyAction } from '@/actions/adminProperties';
import { listProperties } from '@/models/properties';
import StatusBadge from '@/components/admin/StatusBadge';

export const metadata: Metadata = {
  title: 'Properties — Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPropertiesPage() {
  const result = listProperties({ pageSize: 100 });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Property listings</h1>
          <p className="mt-1 text-sm text-navy-500">{result.total} total</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-300"
        >
          New property
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="min-w-full divide-y divide-navy-100 text-sm">
          <thead className="bg-navy-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Price (EGP)</th>
              <th className="px-4 py-3 text-left font-semibold text-navy-700">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-navy-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {result.items.map((property) => (
              <tr key={property.id} className="hover:bg-navy-50">
                <td className="px-4 py-3 font-medium text-navy-900">{property.titleEn}</td>
                <td className="px-4 py-3 text-navy-600">{property.propertyType}</td>
                <td className="px-4 py-3 text-navy-600">{property.priceEgp.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={property.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="mr-3 text-navy-700 hover:text-gold-600"
                  >
                    Edit
                  </Link>
                  <form action={deletePropertyAction.bind(null, property.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {result.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                  No properties yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
