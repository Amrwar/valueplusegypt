import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { updateConsultationStatusAction } from '@/actions/adminConsultations';
import { getConsultationRequestById } from '@/models/consultationRequests';
import { CONSULTATION_STATUSES } from '@/types/crm';
import StatusBadge from '@/components/admin/StatusBadge';

export const metadata: Metadata = {
  title: 'Consultation request — Admin',
  robots: { index: false, follow: false },
};

interface ConsultationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminConsultationDetailPage({ params }: ConsultationDetailPageProps) {
  const { id } = await params;
  const consultation = getConsultationRequestById(id);
  if (!consultation) notFound();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">{consultation.name}</h1>
        <StatusBadge status={consultation.status} />
      </div>
      <p className="mt-1 text-sm text-navy-500">Priority score: {consultation.priorityScore}/100</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-navy-100 bg-white p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Email</dt>
          <dd className="text-navy-900">{consultation.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Phone</dt>
          <dd className="text-navy-900">{consultation.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Service type</dt>
          <dd className="text-navy-900">{consultation.serviceType}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Budget range</dt>
          <dd className="text-navy-900">{consultation.budgetRange}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Timeline</dt>
          <dd className="text-navy-900">{consultation.timeline}</dd>
        </div>
        {consultation.message && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase text-navy-400">Message</dt>
            <dd className="whitespace-pre-wrap text-navy-900">{consultation.message}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6">
        <p className="text-sm font-medium text-navy-700">Update status:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONSULTATION_STATUSES.filter((s) => s !== consultation.status).map((s) => (
            <form key={s} action={updateConsultationStatusAction.bind(null, consultation.id, s)}>
              <button
                type="submit"
                className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-medium capitalize text-navy-700 hover:border-gold-400 hover:text-gold-600"
              >
                {s}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
