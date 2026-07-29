'use client';

import { useActionState } from 'react';
import { addLeadNoteAction, AddLeadNoteState } from '@/actions/adminLeads';

const initialState: AddLeadNoteState = { error: '' };

export default function LeadNoteForm({ leadId }: { leadId: string }) {
  const action = addLeadNoteAction.bind(null, leadId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <textarea
        name="body"
        rows={3}
        required
        placeholder="Add an internal note…"
        className="block w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
      />
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {isPending ? 'Adding…' : 'Add note'}
      </button>
    </form>
  );
}
