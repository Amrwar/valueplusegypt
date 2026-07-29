import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-amber-100 text-amber-800',
  qualified: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
  pending: 'bg-amber-100 text-amber-800',
  reviewed: 'bg-blue-100 text-blue-800',
  scheduled: 'bg-purple-100 text-purple-800',
  closed: 'bg-navy-100 text-navy-700',
  draft: 'bg-navy-100 text-navy-700',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-navy-100 text-navy-500',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  confirmed: 'bg-green-100 text-green-800',
  unsubscribed: 'bg-navy-100 text-navy-500',
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
        STATUS_STYLES[status] || 'bg-navy-100 text-navy-700'
      )}
    >
      {status}
    </span>
  );
}
