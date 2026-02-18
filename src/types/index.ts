export interface NavLink {
  href: string;
  labelKey: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
}

export interface Project {
  id: string;
  nameEn: string;
  nameAr: string;
  clientEn: string;
  clientAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  servicesEn: string[];
  servicesAr: string[];
  category: ProjectCategory;
  image?: string;
}

export type ProjectCategory =
  | 'all'
  | 'investment'
  | 'admin-commercial'
  | 'educational'
  | 'medical'
  | 'tourism'
  | 'consultancy';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export interface ContactFormState {
  success: boolean;
  error: string;
  fieldErrors: Record<string, string>;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  submittedAt: string;
}
