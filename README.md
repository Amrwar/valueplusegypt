# Value Plus Egypt

Bilingual (English/Arabic) corporate website for Value Plus Egypt — an investment consultancy and real estate services company.

Built with **Next.js 16**, **Tailwind CSS 4**, and **next-intl** for full internationalization with RTL support.

## Features

- Bilingual support (English & Arabic) with automatic RTL layout
- Professional Navy + Gold design system
- Contact form with email delivery (Resend) and JSON storage
- Filterable project portfolio
- 18 service categories with dedicated cards
- Responsive design for all screen sizes
- SEO metadata on all pages
- Scroll-based animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key for sending emails |
| `RESEND_FROM_EMAIL` | Email address to send from |
| `CONTACT_EMAIL` | Email address to receive contact submissions |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/ar`.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── messages/           # Translation files (en.json, ar.json)
├── data/               # Contact form submissions (JSON)
├── middleware.ts        # next-intl locale detection
└── src/
    ├── i18n/           # Internationalization config
    ├── lib/            # Constants, utilities
    ├── types/          # TypeScript interfaces
    ├── hooks/          # Custom React hooks
    ├── actions/        # Server actions (contact form)
    ├── components/     # React components
    │   ├── layout/     # Navbar, Footer, LanguageSwitcher
    │   ├── ui/         # Button, Container, SectionHeading
    │   ├── home/       # Hero, ServicesOverview, AboutPreview, CTA
    │   ├── services/   # ServiceCard, ServicesGrid
    │   ├── about/      # CompanyInfo, LeadershipProfile
    │   ├── projects/   # ProjectGrid, ProjectCard
    │   └── contact/    # ContactForm, ContactInfo, MapLink
    └── app/
        └── [locale]/   # Locale-based routing (en, ar)
```

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]` | Home page with hero, services overview, about preview, CTA |
| `/[locale]/services` | All 18 service categories |
| `/[locale]/about` | Company info, leadership, why choose us |
| `/[locale]/projects` | Filterable project portfolio |
| `/[locale]/contact` | Contact form + company info |

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [next-intl](https://next-intl.dev/)
- [Resend](https://resend.com/)
- TypeScript
