'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';

const clients = [
  { name: 'SIAC Construction', logo: '/images/clients/siac.png' },
  { name: 'NECA Misr', logo: '/images/clients/neca-misr.png' },
  { name: 'EHAF Consulting Engineers', logo: '/images/clients/ehaf.png' },
  { name: 'CGC', logo: '/images/clients/cgc.png' },
  { name: 'Ginza', logo: '/images/clients/ginza.png' },
  { name: 'Marsellia Group', logo: '/images/clients/marsellia.png' },
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
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 px-8"
            >
              <div className="flex h-24 w-48 items-center justify-center rounded-xl border border-navy-100 bg-white p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:border-gold-400 hover:shadow-md">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
