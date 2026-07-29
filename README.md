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
- SEO metadata on all pages, including dynamic sitemap entries
- Scroll-based animations
- SQLite-backed CRM: lead pipeline, prioritized consultation requests,
  property listings, an insights/blog CMS, testimonial moderation, and
  double opt-in newsletter subscriptions
- Session-authenticated `/admin` dashboard for managing all of the above

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
| `DATABASE_PATH` | Path to the SQLite database file used by the CRM (defaults to `./data/crm.db`) |
| `SEED_ADMIN_EMAIL` | Email for the admin account created by `npm run db:seed` |
| `SEED_ADMIN_PASSWORD` | Password for the seeded admin account |

### Database

The CRM (leads, consultation requests, properties, insights, testimonials,
newsletter subscribers) is backed by a local SQLite database. The schema is
applied automatically on first connection. To create an admin account and
seed sample content for local development:

```bash
npm run db:seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/ar`. The admin dashboard is available at `/admin` (not locale-prefixed).

### Tests

```bash
npm test
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── messages/           # Translation files (en.json, ar.json)
├── data/               # Contact form submissions (JSON) + SQLite database
├── scripts/            # db:seed script
├── middleware.ts        # next-intl locale detection (excludes /admin)
└── src/
    ├── i18n/           # Internationalization config
    ├── lib/            # Constants, utilities, db client, auth, rate limiting
    ├── models/         # SQLite-backed repositories (leads, properties, insights, ...)
    ├── types/          # TypeScript interfaces
    ├── hooks/          # Custom React hooks
    ├── actions/        # Server actions (contact form, CRM forms, admin mutations)
    ├── components/     # React components
    │   ├── layout/     # Navbar, Footer, LanguageSwitcher
    │   ├── ui/         # Button, Container, SectionHeading
    │   ├── home/       # Hero, ServicesOverview, AboutPreview, CTA
    │   ├── services/   # ServiceCard, ServicesGrid
    │   ├── about/      # CompanyInfo, LeadershipProfile
    │   ├── projects/   # ProjectGrid, ProjectCard
    │   ├── contact/    # ContactForm, ContactInfo, MapLink
    │   ├── consultation/, properties/, insights/, testimonials/, newsletter/
    │   └── admin/      # Admin dashboard components
    └── app/
        ├── [locale]/   # Locale-based public routing (en, ar)
        ├── admin/      # Session-gated admin dashboard (not locale-prefixed)
        └── api/        # Public + admin REST endpoints
```

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]` | Home page with hero, services overview, about preview, CTA |
| `/[locale]/services` | All 18 service categories |
| `/[locale]/about` | Company info, leadership, why choose us |
| `/[locale]/projects` | Filterable project portfolio |
| `/[locale]/properties` | Browsable property listings |
| `/[locale]/insights` | Insights/blog |
| `/[locale]/consultation` | Request a consultation |
| `/[locale]/testimonials` | Client testimonials + submission form |
| `/[locale]/contact` | Contact form + company info |
| `/admin` | Admin dashboard (leads, consultations, properties, insights, testimonials, newsletter) |

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
