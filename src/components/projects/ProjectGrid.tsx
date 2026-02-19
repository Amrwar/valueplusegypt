'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/constants';
import { ProjectCategory } from '@/types';
import ProjectCard from './ProjectCard';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  all: 'filterAll',
  investment: 'filterInvestment',
  'admin-commercial': 'filterAdminCommercial',
  educational: 'filterEducational',
  medical: 'filterMedical',
  tourism: 'filterTourism',
  consultancy: 'filterConsultancy',
};

export default function ProjectGrid() {
  const t = useTranslations('projects');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { ref, isInView } = useInView();

  const filtered =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-navy-900 text-white'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            )}
          >
            {t(CATEGORY_LABEL_KEYS[cat])}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-navy-500 py-12">
          {t('detailsAvailable')}
        </p>
      )}
    </div>
  );
}
