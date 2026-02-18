import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12', className)}>
      <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{title}</h2>
      <div className="mt-3 mx-auto h-1 w-20 rounded bg-gold-400" />
      {subtitle && (
        <p className="mt-4 text-lg text-navy-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
