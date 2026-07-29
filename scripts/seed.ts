import { getDb } from '../src/lib/db/client';
import { countAdminUsers, createAdminUser } from '../src/models/adminUsers';
import { createProperty, listProperties } from '../src/models/properties';
import { createInsight, listInsights } from '../src/models/insights';
import { submitTestimonial, moderateTestimonial, listTestimonials } from '../src/models/testimonials';
import { subscribeToNewsletter, confirmNewsletterSubscription, listNewsletterSubscribers } from '../src/models/newsletter';

async function seedAdminUser() {
  if (countAdminUsers() > 0) {
    console.log('Admin user already exists, skipping.');
    return;
  }

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@valueplusegypt.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'change-me-before-deploying';

  await createAdminUser({ email, password, name: 'Site Administrator' });
  console.log(`Created admin user: ${email}`);
}

function seedProperties() {
  if (listProperties({ pageSize: 1 }).total > 0) {
    console.log('Properties already seeded, skipping.');
    return;
  }

  createProperty({
    titleEn: 'New Capital Residential Plot',
    titleAr: 'قطعة أرض سكنية بالعاصمة الإدارية الجديدة',
    summaryEn: 'Prime residential plot in the R7 district, ready for development.',
    summaryAr: 'قطعة أرض سكنية مميزة في الحي R7، جاهزة للتطوير.',
    locationEn: 'R7 District, New Administrative Capital',
    locationAr: 'الحي R7، العاصمة الإدارية الجديدة',
    descriptionEn:
      'A 1,200 sqm residential plot located in one of the fastest-growing districts of the New Administrative Capital, with full utility access and approved building permits.',
    descriptionAr:
      'قطعة أرض سكنية بمساحة 1200 متر مربع تقع في أحد أسرع الأحياء نمواً بالعاصمة الإدارية الجديدة، مع توصيل كامل للمرافق وتصاريح بناء معتمدة.',
    amenitiesEn: ['Utilities connected', 'Approved building permit', 'Gated community'],
    amenitiesAr: ['مرافق متصلة', 'تصريح بناء معتمد', 'مجتمع مسور'],
    propertyType: 'land',
    priceEgp: 8500000,
    areaSqm: 1200,
    featured: true,
    status: 'published',
  });

  createProperty({
    titleEn: 'Nasr City Commercial Unit',
    titleAr: 'وحدة تجارية بمدينة نصر',
    summaryEn: 'Ground-floor commercial unit on a high-traffic street in Nasr City.',
    summaryAr: 'وحدة تجارية بالدور الأرضي على شارع حيوي بمدينة نصر.',
    locationEn: 'Abbas El Akkad St., Nasr City, Cairo',
    locationAr: 'شارع عباس العقاد، مدينة نصر، القاهرة',
    descriptionEn:
      'A 180 sqm ground-floor retail unit with high foot traffic, suitable for a flagship retail or F&B concept.',
    descriptionAr:
      'وحدة تجارية بالدور الأرضي بمساحة 180 متر مربع في منطقة ذات حركة مرور عالية، مناسبة لمفهوم تجاري أو مطعم رئيسي.',
    amenitiesEn: ['Street frontage', 'Parking access', 'Central AC ready'],
    amenitiesAr: ['واجهة على الشارع', 'إمكانية انتظار السيارات', 'جاهز لتكييف مركزي'],
    propertyType: 'commercial',
    priceEgp: 12000000,
    areaSqm: 180,
    featured: true,
    status: 'published',
  });

  createProperty({
    titleEn: 'Hurghada Touristic Chalet',
    titleAr: 'شاليه سياحي بالغردقة',
    summaryEn: 'Fully-finished sea-view chalet in a resort community.',
    summaryAr: 'شاليه بالكامل التشطيب بإطلالة بحرية داخل مجتمع سياحي.',
    locationEn: 'Sahl Hasheesh, Hurghada, Red Sea Governorate',
    locationAr: 'سهل حشيش، الغردقة، محافظة البحر الأحمر',
    descriptionEn:
      'A two-bedroom chalet with direct sea views, fully finished and furnished, within a gated resort offering beach access and a shared pool.',
    descriptionAr:
      'شاليه غرفتي نوم بإطلالة مباشرة على البحر، بالكامل التشطيب والفرش، داخل منتجع مسور يوفر إمكانية الوصول للشاطئ ومسبح مشترك.',
    amenitiesEn: ['Sea view', 'Furnished', 'Shared pool', 'Beach access'],
    amenitiesAr: ['إطلالة بحرية', 'مفروش', 'مسبح مشترك', 'إمكانية الوصول للشاطئ'],
    propertyType: 'touristic',
    priceEgp: 4200000,
    areaSqm: 95,
    status: 'published',
  });

  createProperty({
    titleEn: 'Mohandessin Office Floor',
    titleAr: 'دور مكاتب بالمهندسين',
    summaryEn: 'Full office floor in a well-maintained administrative building.',
    summaryAr: 'دور مكاتب كامل بمبنى إداري جيد الصيانة.',
    locationEn: 'El Batal Ahmed Abdel Aziz St., Mohandessin, Giza',
    locationAr: 'شارع البطل أحمد عبد العزيز، المهندسين، الجيزة',
    descriptionEn:
      'A 350 sqm full-floor office space, partitioned and ready for immediate occupancy, in a professionally managed building with 24/7 security.',
    descriptionAr:
      'دور مكاتب كامل بمساحة 350 متر مربع، مقسم وجاهز للإشغال الفوري، بمبنى تحت إدارة احترافية وأمن على مدار الساعة.',
    amenitiesEn: ['24/7 security', 'Elevator access', 'Backup generator'],
    amenitiesAr: ['أمن على مدار الساعة', 'مصعد', 'مولد كهرباء احتياطي'],
    propertyType: 'administrative',
    priceEgp: 15500000,
    areaSqm: 350,
    status: 'draft',
  });

  console.log('Seeded 4 properties.');
}

function seedInsights() {
  if (listInsights({ pageSize: 1 }).total > 0) {
    console.log('Insights already seeded, skipping.');
    return;
  }

  createInsight({
    titleEn: 'Reading Egypt\'s 2026 Real Estate Market Signals',
    titleAr: 'قراءة مؤشرات سوق العقارات المصري لعام 2026',
    excerptEn: 'What shifting demand patterns across New Cairo and the New Administrative Capital mean for investors.',
    excerptAr: 'ماذا تعني أنماط الطلب المتغيرة في القاهرة الجديدة والعاصمة الإدارية الجديدة للمستثمرين.',
    bodyEn:
      'Demand in Egypt\'s primary urban expansion corridors has continued to shift toward integrated, amenity-rich developments. For investors, this means feasibility studies now need to weigh community infrastructure and long-term maintenance planning alongside traditional cost and location metrics.',
    bodyAr:
      'استمر الطلب في محاور التوسع العمراني الرئيسية بمصر في التحول نحو التطويرات المتكاملة الغنية بالمرافق. بالنسبة للمستثمرين، هذا يعني أن دراسات الجدوى تحتاج الآن إلى الأخذ بعين الاعتبار البنية التحتية المجتمعية وتخطيط الصيانة طويل المدى إلى جانب مقاييس التكلفة والموقع التقليدية.',
    category: 'Market Analysis',
    tags: ['real estate', 'new cairo', 'investment'],
    status: 'published',
  });

  createInsight({
    titleEn: 'Value Engineering: Beyond Cost Cutting',
    titleAr: 'هندسة القيمة: أبعد من خفض التكاليف',
    excerptEn: 'A well-run value engineering process protects project quality while reducing waste.',
    excerptAr: 'عملية هندسة القيمة المدارة جيداً تحافظ على جودة المشروع مع تقليل الهدر.',
    bodyEn:
      'Value engineering is often misunderstood as a cost-cutting exercise. In practice, it is a structured review of function versus cost across every project element, aimed at preserving or improving performance while removing unnecessary expense.',
    bodyAr:
      'غالباً ما يُساء فهم هندسة القيمة على أنها عملية لخفض التكاليف فقط. في الواقع، هي مراجعة منظمة للوظيفة مقابل التكلفة عبر كل عنصر من عناصر المشروع، بهدف الحفاظ على الأداء أو تحسينه مع إزالة النفقات غير الضرورية.',
    category: 'Engineering',
    tags: ['value engineering', 'cost control'],
    status: 'published',
  });

  createInsight({
    titleEn: 'Draft: Upcoming Regulatory Changes',
    titleAr: 'مسودة: تغييرات تنظيمية قادمة',
    excerptEn: 'Internal draft — pending legal review before publication.',
    excerptAr: 'مسودة داخلية — قيد المراجعة القانونية قبل النشر.',
    bodyEn: 'Draft content pending review.',
    bodyAr: 'محتوى المسودة قيد المراجعة.',
    category: 'Regulatory',
    tags: ['draft'],
    status: 'draft',
  });

  console.log('Seeded 3 insights.');
}

function seedTestimonials() {
  if (listTestimonials({ pageSize: 1 }).total > 0) {
    console.log('Testimonials already seeded, skipping.');
    return;
  }

  const approved = submitTestimonial({
    name: 'Mona Farid',
    role: 'Managing Director',
    company: 'Ginza Urban Development',
    quoteEn: 'Value Plus Egypt delivered a feasibility study that gave us real confidence in our investment decision.',
    quoteAr: 'قدمت فاليو بلس مصر دراسة جدوى منحتنا ثقة حقيقية في قرارنا الاستثماري.',
    rating: 5,
  });
  moderateTestimonial(approved.id, 'approved');

  submitTestimonial({
    name: 'Karim Hossam',
    role: 'Investor',
    company: '',
    quoteEn: 'Professional team, clear communication throughout the engagement.',
    quoteAr: 'فريق محترف وتواصل واضح طوال فترة التعاقد.',
    rating: 4,
  });

  console.log('Seeded 2 testimonials (1 approved, 1 pending).');
}

function seedNewsletterSubscriber() {
  if (listNewsletterSubscribers({ pageSize: 1 }).total > 0) {
    console.log('Newsletter subscribers already seeded, skipping.');
    return;
  }

  const { confirmToken } = subscribeToNewsletter('demo.subscriber@example.com');
  if (confirmToken) confirmNewsletterSubscription(confirmToken);

  console.log('Seeded 1 confirmed newsletter subscriber.');
}

async function main() {
  getDb();
  await seedAdminUser();
  seedProperties();
  seedInsights();
  seedTestimonials();
  seedNewsletterSubscriber();
  console.log('Seed complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
