export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl?: string;
  siteUrl?: string;
  shortDescription: string;
  startProjectLabel: string;
  getStartedLabel: string;
  startProjectUrl: string;
  copyrightHolder: string;
  defaultSeo: SeoMeta;
}

export interface HeaderLink {
  label: string;
  target: string;
  type: 'route' | 'external' | 'services-dropdown';
}

export interface FooterLegalLink {
  label: string;
  target: string;
}

export interface NavigationConfig {
  headerLinks: HeaderLink[];
  footerLegalLinks: FooterLegalLink[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  activities?: string[];
  deliverable?: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export interface HomeContent {
  hero: {
    kicker: string;
    headline: string;
    supportingText: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImage: string;
    heroImageAlt: string;
  };
  introSection: {
    kicker: string;
    headline: string;
    summary: string;
    ctaLabel: string;
  };
  featuredServicesSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    featuredSlugs: string[];
    ctaLabel: string;
  };
  selectedProjectsSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  whyChooseSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    items: WhyChooseItem[];
  };
  processOverviewSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  ctaSection: {
    kicker: string;
    headline: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
  };
  seo: SeoMeta;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutContent {
  kicker: string;
  headline: string;
  intro: string;
  secondaryText: string;
  image: string;
  imageAlt: string;
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: AboutValue[];
  reasonsHeading: string;
  reasonsSubtitle: string;
  reasons: WhyChooseItem[];
  seo: SeoMeta;
}

export interface ProcessPageContent {
  kicker: string;
  headline: string;
  subtitle: string;
  steps: ProcessStep[];
  collaborationNoteTitle: string;
  collaborationNoteBody: string;
  ctaLabel: string;
  seo: SeoMeta;
}

export interface ServicesOverviewContent {
  kicker: string;
  headline: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  seo: SeoMeta;
}

export interface ProjectsOverviewContent {
  kicker: string;
  headline: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  seo: SeoMeta;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactConfig {
  kicker: string;
  title: string;
  subtitle: string;
  formEndpoint: string;
  formAccessKey?: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappPrefill: string;
  floatingWhatsappEnabled?: boolean;
  floatingWhatsappLabel?: string;
  location: string;
  availabilityNote: string;
  socialLinks: SocialLink[];
  seo: SeoMeta;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  order: number;
  published?: boolean;
  code: string;
  slug: string;
  name: string;
  icon: string;
  heroSubtitle: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  orderingUrl: string;
  buttonText: string;
  available: boolean;
  deliverables: string[];
  benefits: ServiceBenefit[];
  features: ServiceFeature[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  relatedCategories?: string[];
  idealFor: string;
  seo: SeoMeta;
}

export interface ProjectItem {
  order: number;
  published?: boolean;
  slug: string;
  title: string;
  category: string;
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  image: string;
  videoUrl: string;
  projectUrl: string;
  featured: boolean;
  seo: SeoMeta;
}

export interface TestimonialItem {
  order: number;
  visible: boolean;
  isSamplePlaceholder: boolean;
  quote: string;
  authorName: string;
  role: string;
  organization: string;
  serviceCategory: string;
}

export interface CustomPageSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CustomPageItem {
  title: string;
  slug: string;
  published: boolean;
  kicker?: string;
  heroSubtitle: string;
  heroImage?: string;
  videoUrl?: string;
  sections: CustomPageSection[];
  ctaLabel?: string;
  ctaTarget?: string;
  seo: SeoMeta;
}
