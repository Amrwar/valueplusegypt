'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/services' as const, key: 'services' },
  { href: '/about' as const, key: 'about' },
  { href: '/projects' as const, key: 'projects' },
  { href: '/contact' as const, key: 'contact' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.jpg"
              alt="Value Plus"
              width={130}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-navy-50 text-navy-900'
                    : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300"
            >
              {t('getInTouch')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy-600 hover:bg-navy-50 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-navy-100 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-navy-50 text-navy-900'
                      : 'text-navy-600 hover:bg-navy-50'
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 px-4">
              <LanguageSwitcher />
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300"
              >
                {t('getInTouch')}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
