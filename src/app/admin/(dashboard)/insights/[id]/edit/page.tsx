import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { updateInsightAction } from '@/actions/adminInsights';
import { getInsightById } from '@/models/insights';
import InsightForm from '@/components/admin/InsightForm';

export const metadata: Metadata = {
  title: 'Edit insight — Admin',
  robots: { index: false, follow: false },
};

interface EditInsightPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditInsightPage({ params }: EditInsightPageProps) {
  const { id } = await params;
  const insight = getInsightById(id);
  if (!insight) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Edit insight</h1>
      <div className="mt-6">
        <InsightForm action={updateInsightAction.bind(null, id)} insight={insight} />
      </div>
    </div>
  );
}
