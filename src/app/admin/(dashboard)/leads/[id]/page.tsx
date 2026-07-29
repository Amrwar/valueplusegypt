import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { assignLeadAction, updateLeadStatusAction } from '@/actions/adminLeads';
import { getLeadById, listLeadNotes } from '@/models/leads';
import { LEAD_STATUS_TRANSITIONS } from '@/types/crm';
import StatusBadge from '@/components/admin/StatusBadge';
import LeadNoteForm from '@/components/admin/LeadNoteForm';

export const metadata: Metadata = {
  title: 'Lead — Admin',
  robots: { index: false, follow: false },
};

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminLeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = getLeadById(id);
  if (!lead) notFound();

  const notes = listLeadNotes(id);
  const nextStatuses = LEAD_STATUS_TRANSITIONS[lead.status];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">{lead.name}</h1>
        <StatusBadge status={lead.status} />
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-navy-100 bg-white p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Email</dt>
          <dd className="text-navy-900">{lead.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Phone</dt>
          <dd className="text-navy-900">{lead.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Company</dt>
          <dd className="text-navy-900">{lead.company || '—'}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-navy-400">Service</dt>
          <dd className="text-navy-900">{lead.service || '—'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase text-navy-400">Message</dt>
          <dd className="whitespace-pre-wrap text-navy-900">{lead.message}</dd>
        </div>
      </dl>

      {nextStatuses.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-navy-700">Move to:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {nextStatuses.map((next) => (
              <form key={next} action={updateLeadStatusAction.bind(null, lead.id, next)}>
                <button
                  type="submit"
                  className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-medium capitalize text-navy-700 hover:border-gold-400 hover:text-gold-600"
                >
                  {next}
                </button>
              </form>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5">
        <p className="text-sm font-medium text-navy-700">Assigned to</p>
        <form action={assignLeadAction.bind(null, lead.id)} className="mt-2 flex gap-2">
          <input
            type="text"
            name="assignedTo"
            defaultValue={lead.assignedTo ?? ''}
            placeholder="Unassigned"
            className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Save
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-navy-900">Internal notes</h2>
        <LeadNoteForm leadId={lead.id} />
        <ul className="mt-4 space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="rounded-lg border border-navy-100 bg-white p-3 text-sm">
              <p className="text-navy-900">{note.body}</p>
              <p className="mt-1 text-xs text-navy-400">
                {note.author} — {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
          {notes.length === 0 && <p className="text-sm text-navy-400">No notes yet.</p>}
        </ul>
      </div>
    </div>
  );
}
