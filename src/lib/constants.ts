import { NavLink, Project } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/services', labelKey: 'nav.services' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/contact', labelKey: 'nav.contact' },
];

export const SERVICE_ICONS: Record<string, string> = {
  s1: '📊',
  s2: '⚙️',
  s3: '💰',
  s4: '📋',
  s5: '📈',
  s6: '💼',
  s7: '🏦',
  s8: '📐',
  s9: '🔍',
  s10: '📁',
  s11: '🗺️',
  s12: '📣',
  s13: '🏗️',
  s14: '🏠',
  s15: '🏷️',
  s16: '🗄️',
  s17: '⚖️',
  s18: '📉',
};

export const SERVICE_IMAGES: Record<string, string> = {
  s2: '/images/services/value-engineering.png',
  s3: '/images/services/real-estate-cost-studies.png',
};

export const SERVICE_KEYS = [
  's1', 's2', 's3', 's4', 's5', 's6',
  's7', 's8', 's9', 's10', 's11', 's12',
  's13', 's14', 's15', 's16', 's17', 's18',
];

export const FEATURED_SERVICES = ['s1', 's2', 's7', 's14'];

export const PROJECT_CATEGORIES = [
  'all',
  'investment',
  'admin-commercial',
  'educational',
  'medical',
  'tourism',
  'consultancy',
] as const;

export const PROJECTS: Project[] = [
  // ── Investment Projects (المشروعات الاستثمارية) ──
  {
    id: '1',
    nameEn: 'Masrna El Gedida Compound',
    nameAr: 'كمبوند مصرنا الجديدة',
    clientEn: 'Construction & Housing for Real Estate Investment Co.',
    clientAr: 'شركة التعمير والإسكان للاستثمار العقاري',
    locationEn: 'Plot 14, Investors Extension Area, 170 Feddan — near the American University, 5th Settlement, New Cairo, Egypt',
    locationAr: 'قطعة (14) بمنطقة إمتداد المستثمرين، 170 فدان - بجوار الجامعة الأمريكية، التجمع الخامس، القاهرة الجديدة - مصر',
    descriptionEn: 'Integrated residential resort spanning 170 feddan, featuring detached villas, twin houses, townhouses, a social & recreational club, and a commercial mall. Estimated cost: 900 million EGP.',
    descriptionAr: 'منتجع سكني متكامل على مساحة 170 فدان يضم فيلات منفصلة وتوين وتاون هاوس ونادي إجتماعي ترفيهي ومول تجاري. التكلفة التقديرية: 900 مليون جنيه.',
    servicesEn: ['Quantity Surveying', 'Initial Cost Estimation'],
    servicesAr: ['أعمال الحصر', 'تقدير التكلفة المبدئية للمشروع'],
    category: 'investment',
    image: '/images/projects/masrna-el-gedida.png',
  },
  {
    id: '2',
    nameEn: 'Calimera Compound — El Shorouk City',
    nameAr: 'كاليميرا - مدينة الشروق',
    clientEn: 'Arab Egyptian Real Estate Bank',
    clientAr: 'البنك العقاري المصري العربي',
    locationEn: 'Plot 28, 5th District, Investors Area, El Shorouk City, Egypt',
    locationAr: 'قطعة (28) بالحي الخامس، منطقة المستثمرين، مدينة الشروق، مصر',
    descriptionEn: 'Integrated residential resort on 27 feddan featuring detached villas, twin houses, townhouses, a social & recreational club, and a commercial mall. Estimated cost: 180 million EGP.',
    descriptionAr: 'منتجع سكني متكامل على مساحة 27 فدان يضم فيلات منفصلة وتوين وتاون هاوس ونادي إجتماعي ترفيهي ومول تجاري. التكلفة التقديرية: 180 مليون جنيه.',
    servicesEn: ['Quantity Surveying', 'Initial Cost Estimation'],
    servicesAr: ['أعمال الحصر', 'تقدير التكلفة المبدئية للمشروع'],
    category: 'investment',
    image: '/images/projects/calimera.jpg',
  },

  // ── Administrative & Commercial (المباني الإدارية والتجارية) ──
  {
    id: '3',
    nameEn: 'Uni Arc Building',
    nameAr: 'مبنى يوني آرك',
    clientEn: 'Housing & Development Bank',
    clientAr: 'بنك التعمير والإسكان',
    locationEn: 'Abbas El Akkad St., Nasr Road, Nasr City, Cairo',
    locationAr: 'أول عباس العقاد - طريق النصر، مدينة نصر، القاهرة',
    descriptionEn: 'Administrative and commercial building comprising offices, retail spaces, and cinema halls. Work volume: 120 million EGP.',
    descriptionAr: 'مبنى إداري وتجاري يضم مكاتب ومحلات تجارية وقاعات سينيما. حجم الأعمال: 120 مليون جنيه.',
    servicesEn: ['Quantity Surveying'],
    servicesAr: ['أعمال الحصر للمشروع'],
    category: 'admin-commercial',
    image: '/images/projects/uni-arc.jpg',
  },
  {
    id: '4',

    nameEn: 'Housing & Development Bank HQ — Mohandessin',
    nameAr: 'مقر بنك التعمير الإداري - المهندسين',
    clientEn: 'Housing & Development Bank',
    clientAr: 'بنك التعمير والإسكان',
    locationEn: '26 El Koroum St., Mohandessin, Giza',
    locationAr: '26 ش الكروم، المهندسين، الجيزة',
    descriptionEn: 'Administrative building serving as the bank\'s main branch headquarters with administrative floors and garages. Estimated cost: 110 million EGP.',
    descriptionAr: 'مبنى إداري يضم مقر الفرع الرئيسي للبنك وأدوار إدارية وجراجات. التكلفة التقديرية: 110 مليون جنيه.',
    servicesEn: ['Quantity Surveying'],
    servicesAr: ['أعمال الحصر للمشروع'],
    category: 'admin-commercial',
    image: '/images/projects/bank-hq.jpg',
  },

  // ── Educational (المشروعات والمباني التعليمية) ──
  {
    id: '5',
    nameEn: 'The American University in Cairo — New Campus',
    nameAr: 'مقر الجامعة الأمريكية الجديدة',
    clientEn: 'Ginza Urban Development Co.',
    clientAr: 'شركة جينزا للتنمية العمرانية',
    locationEn: '5th Settlement, New Cairo',
    locationAr: 'التجمع الخامس، القاهرة الجديدة',
    descriptionEn: 'New campus for the American University in Cairo comprising educational buildings, auditoriums, and administrative buildings.',
    descriptionAr: 'مقر الجامعة الأمريكية الجديدة يضم مباني تعليمية ومدرجات ومباني إدارية.',
    servicesEn: ['Preliminary Studies', 'Concrete Quantity Studies', 'Reinforcement Steel Surveying', 'Detailed Studies', 'Finishing Works Studies'],
    servicesAr: ['الدراسات الأولية', 'دراسات كميات الخرسانات', 'حصر كثافات وكميات حديد التسليح', 'الدراسات التفصيلية', 'دراسات بنود تشطيبات'],
    category: 'educational',
    image: '/images/projects/auc.webp',
  },
  {
    id: '6',
    nameEn: 'Arab Academy for Science & Technology — New Buildings',
    nameAr: 'مباني الأكاديمية العربية للعلوم والتكنولوجيا الجديدة',
    clientEn: 'Ginza Urban Development Co.',
    clientAr: 'شركة جينزا للتنمية العمرانية',
    locationEn: 'Sheraton Heliopolis, Cairo',
    locationAr: 'منطقة شيراتون هليوبلس، القاهرة',
    descriptionEn: 'New buildings for the Arab Academy for Science and Technology comprising educational buildings, auditoriums, and administrative buildings.',
    descriptionAr: 'مباني الأكاديمية الجديدة تضم مباني تعليمية ومدرجات ومباني إدارية.',
    servicesEn: ['Detailed Studies', 'Concrete Quantity Studies', 'Reinforcement Steel Surveying', 'Finishing Works Studies'],
    servicesAr: ['الدراسات التفصيلية', 'دراسات كميات الخرسانات', 'حصر كثافات وكميات حديد التسليح', 'دراسات بنود تشطيبات'],
    category: 'educational',
    image: '/images/projects/arab-academy.jpg',
  },

  // ── Medical & Hospitals (المشروعات العلاجية والمستشفيات) ──
  {
    id: '7',
    nameEn: 'Dr. Okasha Psychiatric Hospital',
    nameAr: 'مستشفى الطب النفسي - د. عكاشة',
    clientEn: 'Ginza Urban Development Co.',
    clientAr: 'شركة جينزا للتنمية العمرانية',
    locationEn: '5th Settlement, New Cairo',
    locationAr: 'التجمع الخامس، القاهرة الجديدة',
    descriptionEn: 'Psychiatric hospital complex including treatment buildings, clinics, and a mental health facility. Comprehensive quantity surveying covering concrete, reinforcement steel, and finishing works.',
    descriptionAr: 'مجمع مستشفى الطب النفسي يضم مباني علاجية وعيادات ومصحة نفسية. أعمال حصر شاملة تغطي الخرسانات وحديد التسليح وبنود التشطيبات.',
    servicesEn: ['Preliminary Studies', 'Concrete Quantity Studies', 'Reinforcement Steel Surveying', 'Detailed Studies', 'Finishing Works Studies'],
    servicesAr: ['الدراسات الأولية', 'دراسات كميات الخرسانات', 'حصر كثافات وكميات حديد التسليح', 'الدراسات التفصيلية', 'دراسات بنود تشطيبات'],
    category: 'medical',
    image: '/images/projects/okasha.jpg',
  },
  {
    id: '8',
    nameEn: 'Liver Disease Institute — Cairo University',
    nameAr: 'معهد الكبد - جامعة القاهرة',
    clientEn: 'CIAC Engineering Projects Co.',
    clientAr: 'شركة المشروعات الهندسية "سياك"',
    locationEn: '6th of October, Giza',
    locationAr: 'منطقة 6 أكتوبر، الجيزة',
    descriptionEn: 'Liver disease treatment center and institute comprising educational buildings, auditoriums, and medical treatment facilities. Full detailed studies and quantity surveying.',
    descriptionAr: 'مباني مركز ومعهد علاج أمراض الكبد تضم مباني تعليمية ومدرجات ومباني علاجية. دراسات تفصيلية وحصر كميات شامل.',
    servicesEn: ['Detailed Studies', 'Concrete Quantity Studies', 'Reinforcement Steel Surveying', 'Finishing Works Studies'],
    servicesAr: ['الدراسات التفصيلية', 'دراسات كميات الخرسانات', 'حصر كثافات وكميات حديد التسليح', 'دراسات بنود تشطيبات'],
    category: 'medical',
    image: '/images/projects/liver-institute.jpg',
  },

  // ── Tourism Projects (المشروعات السياحية) ──
  {
    id: '9',
    nameEn: 'Aquatic District — Hurghada',
    nameAr: 'الأحياء المائية - الغردقة',
    clientEn: 'Housing & Development Bank',
    clientAr: 'بنك التعمير والإسكان',
    locationEn: 'Aquatic District Area, Hurghada, Red Sea Governorate',
    locationAr: 'منطقة الأحياء المائية، مدينة الغردقة، محافظة البحر الأحمر',
    descriptionEn: 'Tourist resort village featuring residential units, a commercial market, gardens and green spaces. Estimated cost: 120 million EGP.',
    descriptionAr: 'قرية سياحية تضم وحدات سكنية وسوق تجاري وحدائق ومسطحات خضراء. التكلفة التقديرية: 120 مليون جنيه.',
    servicesEn: ['Preliminary Studies', 'Economic Feasibility Studies', 'Project Marketing'],
    servicesAr: ['الدراسات الأولية', 'دراسات الجدوى الاقتصادية', 'تسويق المشروع'],
    category: 'tourism',
    image: '/images/projects/aquatic-district.jpg',
  },
  {
    id: '10',
    nameEn: 'Grand Hyatt Hotel Renovation — Cairo',
    nameAr: 'تطوير فندق جراند حياة - القاهرة',
    clientEn: 'CIAC Engineering Projects Co.',
    clientAr: 'شركة المشروعات الهندسية "سياك"',
    locationEn: 'Garden City, Cairo',
    locationAr: 'منطقة جاردن سيتي، القاهرة',
    descriptionEn: 'Renovation and development of Grand Hyatt Hotel including landscaping works and the Nile-side hotel entrance redesign.',
    descriptionAr: 'تجديد وتطوير فندق جراند حياة شاملاً تطوير أعمال اللاند سكيب ومدخل الفندق على النيل.',
    servicesEn: ['Detailed Studies', 'Site Coordination Studies', 'Finishing Works Studies'],
    servicesAr: ['الدراسات التفصيلية', 'دراسات بنود تنسيق الموقع', 'دراسات بنود تشطيبات'],
    category: 'tourism',
    image: '/images/projects/grand-hyatt.jpg',
  },

  // ── Feasibility & Market Studies (دراسات الجدوى والسوق) ──
  {
    id: '11',
    nameEn: 'Feasibility & Market Studies Portfolio',
    nameAr: 'دراسات الجدوى والسوق',
    clientEn: 'Housing & Development Bank, Arab Egyptian Real Estate Bank, El Sharq Insurance Co., Private Sector & Individuals',
    clientAr: 'بنك التعمير والإسكان، البنك العقاري المصري العربي، شركة الشرق للتأمين، جهات قطاع استثماري وخاص، أفراد',
    locationEn: 'Greater Cairo & New Urban Cities',
    locationAr: 'القاهرة الكبرى والمدن العمرانية الجديدة',
    descriptionEn: 'Preparation of economic feasibility studies and market studies for multiple investment project alternatives across Greater Cairo and new urban cities.',
    descriptionAr: 'إعداد وعمل دراسات الجدوى الاقتصادية ودراسات السوق لعدة بدائل مشروعات استثمارية لبعض المواقع بالقاهرة الكبرى والمدن العمرانية الجديدة.',
    servicesEn: ['Marketing Plans', 'Market Size Assessment', 'SWOT Analysis', 'Opportunity & Risk Evaluation', 'Marketing Strategy Recommendations', 'Implementation Follow-up'],
    servicesAr: ['إعداد خطط التسويق', 'تقييم مبدئي وتحديد حجم السوق', 'تحليل نقاط الضعف والقوة', 'تقييم الفرص والمخاطر', 'التوصية بالاستراتيجيات التسويقية', 'متابعة التنفيذ وتقييم الخطط التسويقية'],
    category: 'consultancy',
    image: '/images/projects/feasibility-studies.jpg',
  },
];

export const CONTACT_INFO = {
  address: {
    en: 'Cairo, Egypt',
    ar: 'القاهرة، مصر',
  },
  email: 'valueplusegypt@gmail.com',
  telephone: '+201223967303',
  mobile: '+201223967303',
  mapsUrl: 'https://maps.google.com/?q=Cairo,Egypt',
};
