import Link from 'next/link';
import { logoutAdmin } from '@/actions/adminAuth';
import { AdminUser } from '@/types/crm';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/consultations', label: 'Consultations' },
  { href: '/admin/properties', label: 'Properties' },
  { href: '/admin/insights', label: 'Insights' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/newsletter', label: 'Newsletter' },
];

export default function AdminNav({ admin }: { admin: AdminUser }) {
  return (
    <aside className="flex w-full flex-col justify-between border-b border-navy-800 bg-navy-950 p-4 text-white md:h-screen md:w-60 md:border-b-0 md:border-r md:p-6">
      <div>
        <div className="mb-8">
          <p className="text-sm font-bold text-white">Value Plus Egypt</p>
          <p className="text-xs text-navy-400">Admin panel</p>
        </div>
        <nav className="flex flex-row flex-wrap gap-1 md:flex-col">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-navy-200 transition-colors hover:bg-navy-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-6 border-t border-navy-800 pt-4">
        <p className="truncate text-xs text-navy-400">{admin.email}</p>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="mt-2 text-sm font-medium text-gold-400 hover:text-gold-300"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
