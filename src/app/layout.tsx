import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Cairo } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.valuepluseg.org'),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} ${
          isRtl ? 'font-[family-name:var(--font-cairo)]' : 'font-[family-name:var(--font-inter)]'
        } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
