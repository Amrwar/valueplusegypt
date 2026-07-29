import type { Metadata } from 'next';
import { getDashboardStats } from '@/models/stats';
import StatsCard from '@/components/admin/StatsCard';

export const metadata: Metadata = {
  title: 'Dashboard — Admin',
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const stats = getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-500">Overview of leads, requests, and content.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="New leads" value={stats.leadsByStatus.new} />
        <StatsCard label="Contacted leads" value={stats.leadsByStatus.contacted} />
        <StatsCard label="Qualified leads" value={stats.leadsByStatus.qualified} />
        <StatsCard label="Won leads" value={stats.leadsByStatus.won} />
        <StatsCard label="Pending consultations" value={stats.pendingConsultations} />
        <StatsCard label="Pending testimonials" value={stats.pendingTestimonials} />
        <StatsCard label="Confirmed subscribers" value={stats.confirmedSubscribers} />
        <StatsCard label="Published insights" value={stats.publishedInsights} />
        <StatsCard label="Published properties" value={stats.publishedProperties} />
      </div>
    </div>
  );
}
