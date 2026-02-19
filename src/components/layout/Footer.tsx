import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Value Plus"
                width={130}
                height={40}
                className="h-9 w-auto object-contain invert mix-blend-screen"
              />
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/' as const, label: t('nav.home') },
                { href: '/services' as const, label: t('nav.services') },
                { href: '/about' as const, label: t('nav.about') },
                { href: '/projects' as const, label: t('nav.projects') },
                { href: '/contact' as const, label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-2 text-sm text-navy-300">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('contact.addressValue')}
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('contact.emailValue')}
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span dir="ltr">{t('contact.telephoneValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-navy-800 pt-6 text-center text-sm text-navy-400">
          {t('footer.copyright', { year: year.toString() })}
        </div>
      </Container>
    </footer>
  );
}
