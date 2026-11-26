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
    visualCaption: string;
    visualLabel: string;
    capabilityCards: {
      services: { title: string; description: string };
      process: { title: string; description: string };
      ordering: { title: string; description: string };
    };
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
    cardButtonLabel: string;
  };
  selectedProjectsSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    cardButtonLabel: string;
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

export interface InterfaceCopy {
  navbar: {
    allServicesOverviewLabel: string;
    homeAriaLabel: string;
    primaryNavAriaLabel: string;
    mobileNavAriaLabel: string;
    toggleServicesAriaLabel: string;
    expandServicesAriaLabel: string;
    switchToLightModeLabel: string;
    switchToDarkModeLabel: string;
    openMenuAriaLabel: string;
    closeMenuAriaLabel: string;
  };
  footer: {
    navigationHeading: string;
    servicesHeading: string;
    contactHeading: string;
    copyrightSuffix: string;
    socialAriaPrefix: string;
  };
  loadingScreen: {
    ariaLabel: string;
  };
  whatsapp: {
    defaultButtonLabel: string;
    defaultPrefill: string;
  };
  ordering: {
    defaultOrderButtonLabel: string;
    unavailableButtonLabel: string;
    modalKicker: string;
    modalCloseAriaLabel: string;
    modalAvailableDescription: string;
    modalUnavailableDescription: string;
    modalContactButtonLabel: string;
    modalWhatsappButtonLabel: string;
    modalEmailButtonLabel: string;
    modalWhatsappTemplate: string;
    modalEmailSubjectTemplate: string;
    modalEmailBodyTemplate: string;
  };
  media: {
    videoSectionTitle: string;
    videoOpenSourceLabel: string;
    videoWatchExternalLabel: string;
    videoIframeTitleSuffix: string;
  };
  aboutPage: {
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    overviewHeading: string;
    valuesKicker: string;
    valuesHeading: string;
    reasonsKicker: string;
    fallbackSeoTitle: string;
  };
  servicesPage: {
    cardLearnMoreLabel: string;
    ctaButtonLabel: string;
    fallbackSeoTitle: string;
  };
  serviceDetailPage: {
    backLinkLabel: string;
    divisionBadge: string;
    customScopeButtonLabel: string;
    overviewKicker: string;
    overviewHeadingTemplate: string;
    idealForHeading: string;
    aiCurriculumLinkLabel: string;
    deliverablesHeading: string;
    benefitsKicker: string;
    benefitsHeading: string;
    featuresKicker: string;
    featuresHeading: string;
    processKicker: string;
    processHeadingTemplate: string;
    projectsKicker: string;
    projectsHeading: string;
    viewPortfolioLabel: string;
    inspectCaseStudyLabel: string;
    faqKicker: string;
    faqHeading: string;
    orderCtaTitleTemplate: string;
    orderCtaDescription: string;
    orderCtaContactLabel: string;
    otherServicesHeading: string;
    otherServiceLinkLabel: string;
  };
  portfolio: {
    sectionKicker: string;
    sectionHeading: string;
    allCategoriesLabel: string;
    showingPrefix: string;
    projectSingularLabel: string;
    projectPluralLabel: string;
    categoryConnectorLabel: string;
    filterAriaLabel: string;
    projectDetailsLabel: string;
    videoDemoLabel: string;
    visitLabel: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    emptyStateResetLabel: string;
    fallbackSeoTitle: string;
  };
  projectDetailPage: {
    backLinkLabel: string;
    requestSimilarLabel: string;
    openLiveLinkLabel: string;
    challengeHeading: string;
    solutionHeading: string;
    deliverablesHeading: string;
  };
  testimonials: {
    kicker: string;
    heading: string;
    subtitle: string;
    samplePlaceholderBadge: string;
  };
  processPage: {
    stagePrefix: string;
    stageOfConnector: string;
    activitiesHeading: string;
    deliverableLabel: string;
    secondaryCtaLabel: string;
    fallbackSeoTitle: string;
  };
  contactPage: {
    channelsHeading: string;
    channelsSubtitle: string;
    whatsappButtonLabel: string;
    emailButtonLabel: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    availabilityLabel: string;
    socialHeading: string;
    fallbackSeoTitle: string;
  };
  contactForm: {
    heading: string;
    honeypotLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    customServiceOption: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    configuredHint: string;
    unconfiguredHint: string;
    validationName: string;
    validationEmail: string;
    validationPhone: string;
    validationMessage: string;
    validationBot: string;
    submitFailedPrefix: string;
    submitNetworkError: string;
    successMessage: string;
    errorFallbackMessage: string;
    fallbackEmailAppLabel: string;
    fallbackWhatsappLabel: string;
    unconfiguredTitle: string;
    unconfiguredDescription: string;
    unconfiguredEmailLabel: string;
    emailSubjectPrefix: string;
  };
  customPage: {
    backHomeLabel: string;
  };
  notFoundPage: {
    kicker: string;
    headline: string;
    description: string;
    homeButtonLabel: string;
    servicesButtonLabel: string;
    seoTitle: string;
    seoDescription: string;
  };
}

