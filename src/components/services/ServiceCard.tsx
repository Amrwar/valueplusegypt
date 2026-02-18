'use client';

import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  index,
  isInView,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group rounded-xl border border-navy-100 p-6 transition-all duration-500 hover:border-gold-400 hover:shadow-lg',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isInView ? `${(index % 6) * 80}ms` : '0ms' }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-2xl transition-colors group-hover:bg-gold-50">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-navy-900">{title}</h3>
      <p className="text-sm leading-relaxed text-navy-600">{description}</p>
    </div>
  );
}
