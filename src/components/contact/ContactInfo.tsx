import { useTranslations } from 'next-intl';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactInfo() {
  const t = useTranslations('contact');

  const items = [
    {
      label: t('address'),
      value: t('addressValue'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: t('emailLabel'),
      value: t('emailValue'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      label: t('telephone'),
      value: t('telephoneValue'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: `tel:${CONTACT_INFO.telephone.replace(/\s/g, '')}`,
    },
    {
      label: t('mobile'),
      value: t('mobileValue'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      href: `tel:${CONTACT_INFO.mobile.replace(/\s/g, '')}`,
    },
    {
      label: t('officeHours'),
      value: t('officeHoursValue'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-xl bg-navy-900 p-8">
      <h2 className="text-xl font-bold text-white">{t('infoTitle')}</h2>
      <div className="mt-2 h-1 w-12 rounded bg-gold-400" />

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-400">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-navy-300">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white hover:text-gold-400 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Maps link */}
      <a
        href={CONTACT_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        {t('viewOnMaps')}
      </a>
    </div>
  );
}
