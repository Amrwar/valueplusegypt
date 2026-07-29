interface StatsCardProps {
  label: string;
  value: number | string;
}

export default function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-navy-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-navy-900">{value}</p>
    </div>
  );
}
