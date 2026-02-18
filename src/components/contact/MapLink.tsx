import { useTranslations } from 'next-intl';
import { CONTACT_INFO } from '@/lib/constants';

export default function MapLink() {
  const t = useTranslations('contact');

  return (
    <a
      href={CONTACT_INFO.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-navy-100 p-6 text-center transition-colors hover:border-gold-400"
    >
      <div className="text-3xl mb-2">📍</div>
      <p className="font-semibold text-navy-900">{t('viewOnMaps')}</p>
      <p className="mt-1 text-sm text-navy-500">{t('addressValue')}</p>
    </a>
  );
}
