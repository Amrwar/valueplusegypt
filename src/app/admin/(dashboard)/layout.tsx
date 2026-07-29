import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth/session';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-50/40 md:flex-row">
      <AdminNav admin={admin} />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
