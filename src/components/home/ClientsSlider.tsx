'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';

const clients: { name: string; logo: string; url?: string }[] = [
  { name: 'SIAC Construction', logo: '/images/clients/siac.png', url: 'https://share.google/IvrZ5djtVb6irgIG5' },
  { name: 'NECA Misr', logo: '/images/clients/neca-misr.png', url: 'https://necb-misr.net/' },
  { name: 'EHAF Consulting Engineers', logo: '/images/clients/ehaf.png', url: 'https://ehaf.com/' },
  { name: 'CGC', logo: '/images/clients/cgc.png', url: 'https://share.google/1afEpuAL6el5uz0Rd' },
  { name: 'Ginza', logo: '/images/clients/ginza.png', url: 'https://share.google/rx35ObrQd86lr3Dla' },
  { name: 'Marsellia Group', logo: '/images/clients/marsellia.png', url: 'https://marseilia-group.realestate.eg/' },
  { name: 'ASGC', logo: '/images/clients/asgc.png', url: 'https://share.google/EWyrSg84HFe9VUrqb' },
  { name: 'Chipsy', logo: '/images/clients/chipsy.jpeg' },
  { name: 'Pee', logo: '/images/clients/pee.jpeg' },
  { name: 'Housing & Development Real Estate Investment', logo: '/images/clients/housing-dev.jpeg' },
  { name: 'LEONI', logo: '/images/clients/leoni.jpeg' },
];

// Double the array for seamless infinite scroll
const duplicated = [...clients, ...clients];

export default function ClientsSlider() {
  const t = useTranslations('clients');

  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      </Container>

      <div className="relative mt-8">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Scrolling track */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {duplicated.map((client, i) => {
            const card = (
              <div className="flex h-20 w-36 items-center justify-center rounded-xl border border-navy-100 bg-white p-3 grayscale transition-all duration-300 hover:grayscale-0 hover:border-gold-400 hover:shadow-md sm:h-24 sm:w-48 sm:p-4">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            );
            return (
              <div key={`${client.name}-${i}`} className="flex-shrink-0 px-4 sm:px-8">
                {client.url ? (
                  <a href={client.url} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
