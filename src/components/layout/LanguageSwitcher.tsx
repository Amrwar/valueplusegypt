'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

function EgyptFlag() {
  return (
    <svg viewBox="0 0 36 24" className="h-4 w-6 shrink-0 rounded-sm" aria-hidden="true">
      <rect width="36" height="8" fill="#CE1126" />
      <rect width="36" height="8" y="8" fill="#FFFFFF" />
      <rect width="36" height="8" y="16" fill="#000000" />
      <path d="M15.5 10.5h5v3h-5z" fill="#C09300" />
      <path d="M16 11h4v0.5h-4z" fill="#C09300" />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" className="h-4 w-6 shrink-0 rounded-sm" aria-hidden="true">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-50"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      {locale === 'en' ? <EgyptFlag /> : <UKFlag />}
      <span>{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
