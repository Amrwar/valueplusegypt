import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

export default function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const name = isAr ? project.nameAr : project.nameEn;
  const client = isAr ? project.clientAr : project.clientEn;
  const location = isAr ? project.locationAr : project.locationEn;
  const description = isAr ? project.descriptionAr : project.descriptionEn;
  const services = isAr ? project.servicesAr : project.servicesEn;

  return (
    <div
      className={cn(
        'group rounded-xl border border-navy-100 overflow-hidden transition-all duration-500 hover:border-gold-400 hover:shadow-lg',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isInView ? `${(index % 6) * 80}ms` : '0ms' }}
    >
      {/* Project image */}
      {project.image ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          <h3 className="absolute bottom-3 start-4 end-4 text-lg font-bold text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      ) : (
        <>
          <div className="h-1.5 bg-gradient-to-r from-navy-900 to-gold-400" />
          <div className="px-6 pt-6">
            <h3 className="text-lg font-bold text-navy-900">{name}</h3>
          </div>
        </>
      )}

      <div className="p-6">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-medium text-navy-500">{t('client')}:</span>
            <span className="text-navy-700">{client}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-navy-500">{t('location')}:</span>
            <span className="text-navy-700">{location}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-navy-600 leading-relaxed">{description}</p>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            {t('servicesProvided')}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
