import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { updatePropertyAction } from '@/actions/adminProperties';
import { getPropertyById } from '@/models/properties';
import PropertyForm from '@/components/admin/PropertyForm';

export const metadata: Metadata = {
  title: 'Edit property — Admin',
  robots: { index: false, follow: false },
};

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Edit property</h1>
      <div className="mt-6">
        <PropertyForm action={updatePropertyAction.bind(null, id)} property={property} />
      </div>
    </div>
  );
}
