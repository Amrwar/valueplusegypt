import type { Metadata } from 'next';
import { createInsightAction } from '@/actions/adminInsights';
import InsightForm from '@/components/admin/InsightForm';

export const metadata: Metadata = {
  title: 'New insight — Admin',
  robots: { index: false, follow: false },
};

export default function AdminNewInsightPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">New insight</h1>
      <div className="mt-6">
        <InsightForm action={createInsightAction} />
      </div>
    </div>
  );
}
