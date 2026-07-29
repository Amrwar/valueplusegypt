export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

export const LEAD_STATUS_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ['contacted', 'lost'],
  contacted: ['qualified', 'lost'],
  qualified: ['won', 'lost'],
  won: [],
  lost: ['new'],
};

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: LeadStatus;
  assignedTo: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  author: string;
  body: string;
  createdAt: string;
}

export type ConsultationStatus = 'pending' | 'reviewed' | 'scheduled' | 'closed';

export const CONSULTATION_STATUSES: ConsultationStatus[] = ['pending', 'reviewed', 'scheduled', 'closed'];

export type ServiceType =
  | 'feasibility-study'
  | 'value-engineering'
  | 'real-estate-valuation'
  | 'quantity-surveying'
  | 'market-study'
  | 'investment-consultancy'
  | 'project-marketing'
  | 'other';

export const SERVICE_TYPES: ServiceType[] = [
  'feasibility-study',
  'value-engineering',
  'real-estate-valuation',
  'quantity-surveying',
  'market-study',
  'investment-consultancy',
  'project-marketing',
  'other',
];

export type BudgetRange =
  | 'under-1m'
  | '1m-10m'
  | '10m-50m'
  | '50m-200m'
  | 'over-200m';

export const BUDGET_RANGES: BudgetRange[] = ['under-1m', '1m-10m', '10m-50m', '50m-200m', 'over-200m'];

export type Timeline = 'immediate' | 'within-3-months' | 'within-6-months' | 'exploratory';

export const TIMELINES: Timeline[] = ['immediate', 'within-3-months', 'within-6-months', 'exploratory'];

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  budgetRange: BudgetRange;
  timeline: Timeline;
  message: string;
  priorityScore: number;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationRequestInput {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  budgetRange: BudgetRange;
  timeline: Timeline;
  message: string;
}

export type PropertyStatus = 'draft' | 'published' | 'archived';

export type PropertyType =
  | 'residential'
  | 'commercial'
  | 'administrative'
  | 'touristic'
  | 'land';

export const PROPERTY_TYPES: PropertyType[] = [
  'residential',
  'commercial',
  'administrative',
  'touristic',
  'land',
];

export interface PropertyListing {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  amenitiesEn: string[];
  amenitiesAr: string[];
  propertyType: PropertyType;
  priceEgp: number;
  areaSqm: number;
  image: string;
  featured: boolean;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
}

export type InsightStatus = 'draft' | 'published';

export interface Insight {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  bodyEn: string;
  bodyAr: string;
  category: string;
  tags: string[];
  status: InsightStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NewsletterStatus = 'pending' | 'confirmed' | 'unsubscribed';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: NewsletterStatus;
  createdAt: string;
  confirmedAt: string | null;
  unsubscribedAt: string | null;
}

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quoteEn: string;
  quoteAr: string;
  rating: number;
  status: TestimonialStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
