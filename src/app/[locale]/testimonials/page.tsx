import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { listTestimonials } from '@/models/testimonials';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('testimonials');
  return { title: `${t('sectionTitle')} | Value Plus Egypt` };
}

export default async function TestimonialsPage() {
  const t = await getTranslations('testimonials');
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const result = listTestimonials({ status: 'approved', pageSize: 24 });

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={t('sectionTitle')} />

        {result.items.length > 0 && (
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((testimonial) => (
              <div key={testimonial.id} className="rounded-xl border border-navy-100 p-6">
                <p className="text-gold-400">{'★'.repeat(testimonial.rating)}</p>
                <p className="mt-3 text-sm text-navy-700">
                  &ldquo;{isAr ? testimonial.quoteAr : testimonial.quoteEn}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-navy-900">{testimonial.name}</p>
                {(testimonial.role || testimonial.company) && (
                  <p className="text-xs text-navy-500">
                    {[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto max-w-xl">
          <TestimonialForm />
        </div>
      </Container>
    </div>
  );
}
