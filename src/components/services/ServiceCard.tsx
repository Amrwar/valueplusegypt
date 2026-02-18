'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  index: number;
  isInView: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  image,
  index,
  isInView,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col rounded-xl border border-navy-100 overflow-hidden transition-all duration-500 hover:border-gold-400 hover:shadow-lg',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isInView ? `${(index % 6) * 80}ms` : '0ms' }}
    >
      {image && (
        <div className="relative h-44 bg-gradient-to-b from-navy-50 to-white overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-2xl transition-colors group-hover:bg-gold-50">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-navy-900">{title}</h3>
        <p className="text-sm leading-relaxed text-navy-600">{description}</p>
      </div>
    </div>
  );
}
