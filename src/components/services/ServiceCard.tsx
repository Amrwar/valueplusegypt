'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  index: number;
  isInView: boolean;
}

export default function ServiceCard({
  title,
  description,
  image,
  index,
  isInView,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col rounded-xl border border-navy-100 overflow-hidden bg-white transition-all duration-500 hover:border-gold-400 hover:shadow-lg',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isInView ? `${(index % 6) * 80}ms` : '0ms' }}
    >
      {image && (
        <div className="relative h-48 bg-white overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-navy-900">{title}</h3>
        <p className="text-sm leading-relaxed text-navy-600">{description}</p>
      </div>
    </div>
  );
}
