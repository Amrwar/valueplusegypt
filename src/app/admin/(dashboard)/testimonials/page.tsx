import type { Metadata } from 'next';
import { moderateTestimonialAction } from '@/actions/adminTestimonials';
import { listTestimonials } from '@/models/testimonials';
import StatusBadge from '@/components/admin/StatusBadge';

export const metadata: Metadata = {
  title: 'Testimonials — Admin',
  robots: { index: false, follow: false },
};

export default async function AdminTestimonialsPage() {
  const result = listTestimonials({ pageSize: 50 });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Testimonials</h1>
      <p className="mt-1 text-sm text-navy-500">{result.total} total submissions</p>

      <div className="mt-6 space-y-4">
        {result.items.map((testimonial) => (
          <div key={testimonial.id} className="rounded-xl border border-navy-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-navy-900">{testimonial.name}</p>
                <p className="text-xs text-navy-500">
                  {[testimonial.role, testimonial.company].filter(Boolean).join(' · ') || '—'}
                </p>
              </div>
              <StatusBadge status={testimonial.status} />
            </div>
            <p className="mt-3 text-sm text-navy-700">&ldquo;{testimonial.quoteEn}&rdquo;</p>
            <p className="mt-1 text-xs text-navy-500" dir="rtl">
              &ldquo;{testimonial.quoteAr}&rdquo;
            </p>
            <p className="mt-2 text-sm text-gold-600">{'★'.repeat(testimonial.rating)}</p>

            {testimonial.status === 'pending' && (
              <div className="mt-3 flex gap-2">
                <form action={moderateTestimonialAction.bind(null, testimonial.id, 'approved')}>
                  <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                </form>
                <form action={moderateTestimonialAction.bind(null, testimonial.id, 'rejected')}>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
        {result.items.length === 0 && (
          <p className="text-sm text-navy-400">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
