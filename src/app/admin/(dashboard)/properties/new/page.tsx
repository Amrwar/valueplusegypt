import type { Metadata } from 'next';
import { createPropertyAction } from '@/actions/adminProperties';
import PropertyForm from '@/components/admin/PropertyForm';

export const metadata: Metadata = {
  title: 'New property — Admin',
  robots: { index: false, follow: false },
};

export default function AdminNewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">New property</h1>
      <div className="mt-6">
        <PropertyForm action={createPropertyAction} />
      </div>
    </div>
  );
}
