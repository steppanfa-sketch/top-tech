import siteData from '../content/site.json';
import navigationData from '../content/navigation.json';
import homeData from '../content/home.json';
import aboutData from '../content/about.json';
import processData from '../content/process.json';
import servicesOverviewData from '../content/services-overview.json';
import projectsOverviewData from '../content/projects-overview.json';
import contactData from '../content/contact.json';
import interfaceCopyData from '../content/interface-copy.json';
import type {
  AboutContent,
  ContactConfig,
  CustomPageItem,
  HomeContent,
  InterfaceCopy,
  NavigationConfig,
  ProcessPageContent,
  ProjectItem,
  ProjectsOverviewContent,
  ServiceItem,
  ServicesOverviewContent,
  SiteConfig,
  TestimonialItem,
} from '../types/content';

const serviceModules = import.meta.glob<ServiceItem>('../content/services/*.json', {
  eager: true,
  import: 'default',
});

const projectModules = import.meta.glob<ProjectItem>('../content/projects/*.json', {
  eager: true,
  import: 'default',
});

const testimonialModules = import.meta.glob<TestimonialItem>('../content/testimonials/*.json', {
  eager: true,
  import: 'default',
});

const pageModules = import.meta.glob<CustomPageItem>('../content/pages/*.json', {
  eager: true,
  import: 'default',
});

export const siteConfig: SiteConfig = siteData as SiteConfig;
export const navigationConfig: NavigationConfig = navigationData as NavigationConfig;
export const homeContent: HomeContent = homeData as HomeContent;
export const aboutContent: AboutContent = aboutData as AboutContent;
export const processContent: ProcessPageContent = processData as ProcessPageContent;
export const servicesOverviewContent: ServicesOverviewContent =
  servicesOverviewData as ServicesOverviewContent;
export const projectsOverviewContent: ProjectsOverviewContent =
  projectsOverviewData as ProjectsOverviewContent;
export const contactConfig: ContactConfig = contactData as ContactConfig;

const DEFAULT_INTERFACE_COPY: InterfaceCopy = {
  navbar: {
    allServicesOverviewLabel: 'All Services Overview',
    homeAriaLabel: 'TOP TECH Home',
    primaryNavAriaLabel: 'Primary navigation',
    mobileNavAriaLabel: 'Mobile navigation',
    toggleServicesAriaLabel: 'Toggle services menu',
    expandServicesAriaLabel: 'Expand service pages',
    switchToLightModeLabel: 'Switch to light mode',
    switchToDarkModeLabel: 'Switch to dark mode',
    openMenuAriaLabel: 'Open navigation menu',
    closeMenuAriaLabel: 'Close navigation menu',
  },
  footer: {
    navigationHeading: 'Navigation',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
    copyrightSuffix: 'All rights reserved.',
    socialAriaPrefix: 'TOP TECH on',
  },
  loadingScreen: {
    ariaLabel: 'Loading TOP TECH',
  },
  whatsapp: {
    defaultButtonLabel: 'Chat on WhatsApp',
    defaultPrefill: 'Hello TOP TECH, I would like to discuss a new project.',
  },
  ordering: {
    defaultOrderButtonLabel: 'Order Service',
    unavailableButtonLabel: 'Contact Us',
    modalKicker: 'Service Request',
    modalCloseAriaLabel: 'Close service ordering dialog',
    modalAvailableDescription:
      'Direct online checkout for this service is not linked yet. Start your order directly with our team using any option below so we can confirm scope, timeline, and deliverables.',
    modalUnavailableDescription:
      'This service is currently booked through custom project consultation. Connect with our team below to receive a tailored scope and timeline.',
    modalContactButtonLabel: 'Request via Contact Page',
    modalWhatsappButtonLabel: 'WhatsApp Us',
    modalEmailButtonLabel: 'Send Email',
    modalWhatsappTemplate:
      'Hello TOP TECH, I would like to order or inquire about: {service}',
    modalEmailSubjectTemplate: 'Service Inquiry: {service}',
    modalEmailBodyTemplate:
      'Hello TOP TECH,\n\nI would like to order or discuss {service}.\n\nProject details:\n',
  },
  media: {
    videoSectionTitle: 'Video Demonstration',
    videoOpenSourceLabel: 'Open Source',
    videoWatchExternalLabel: 'Watch Demonstration Video',
    videoIframeTitleSuffix: 'video demonstration',
  },
  aboutPage: {
    primaryCtaLabel: 'Explore Our Services',
    secondaryCtaLabel: 'Start a Conversation',
    overviewHeading: 'Technology, Creative Design & Practical AI Under One Roof',
    valuesKicker: 'Principles',
    valuesHeading: 'Our Core Values',
    reasonsKicker: 'Our Standards',
    fallbackSeoTitle: 'About Us — TOP TECH',
  },
  servicesPage: {
    cardLearnMoreLabel: 'Learn More',
    ctaButtonLabel: 'Request Custom Quote',
    fallbackSeoTitle: 'Services — TOP TECH',
  },
  serviceDetailPage: {
    backLinkLabel: 'All Services',
    divisionBadge: 'Service Division · TOP TECH',
    customScopeButtonLabel: 'Discuss Custom Scope',
    overviewKicker: 'Overview',
    overviewHeadingTemplate: 'How We Deliver {service}',
    idealForHeading: 'Ideal For',
    aiCurriculumLinkLabel: 'Explore AI Training Curriculum Tracks',
    deliverablesHeading: 'Core Deliverables',
    benefitsKicker: 'Business Value',
    benefitsHeading: 'Key Benefits',
    featuresKicker: 'Capabilities',
    featuresHeading: 'Included Features',
    processKicker: 'Execution',
    processHeadingTemplate: 'How We Deliver Your {service} Project',
    projectsKicker: 'Showcase Examples',
    projectsHeading: 'Relevant Projects',
    viewPortfolioLabel: 'View Full Portfolio',
    inspectCaseStudyLabel: 'Inspect Case Study',
    faqKicker: 'Questions',
    faqHeading: 'Frequently Asked Questions',
    orderCtaTitleTemplate: 'Ready to Order {service}?',
    orderCtaDescription:
      'Proceed through our configured ordering flow or request a tailored project consultation with TOP TECH.',
    orderCtaContactLabel: 'Contact Us',
    otherServicesHeading: 'Explore Other Services',
    otherServiceLinkLabel: 'Explore Service',
  },
  portfolio: {
    sectionKicker: 'Portfolio & Showcase',
    sectionHeading: 'Selected Capabilities & Concept Showcases',
    allCategoriesLabel: 'All',
    showingPrefix: 'Showing',
    projectSingularLabel: 'project',
    projectPluralLabel: 'projects',
    categoryConnectorLabel: 'in',
    filterAriaLabel: 'Filter projects by category',
    projectDetailsLabel: 'Project Details',
    videoDemoLabel: 'Video Demo',
    visitLabel: 'Visit',
    emptyStateTitle: 'No matching projects found',
    emptyStateDescription:
      'There are currently no published projects in this category. Select another filter or explore all projects.',
    emptyStateResetLabel: 'Show All Projects',
    fallbackSeoTitle: 'Projects — TOP TECH',
  },
  projectDetailPage: {
    backLinkLabel: 'Back to All Projects',
    requestSimilarLabel: 'Request Similar Project',
    openLiveLinkLabel: 'Open Live Link',
    challengeHeading: 'The Challenge',
    solutionHeading: 'Our Approach & Solution',
    deliverablesHeading: 'Key Deliverables',
  },
  testimonials: {
    kicker: 'Client Feedback Slots',
    heading: 'Client Testimonials',
    subtitle:
      'Manage, publish, hide, or replace client feedback entries directly through Pages CMS without modifying site code.',
    samplePlaceholderBadge: 'Sample Placeholder',
  },
  processPage: {
    stagePrefix: 'Stage',
    stageOfConnector: 'of',
    activitiesHeading: 'Key Activities',
    deliverableLabel: 'Stage Output:',
    secondaryCtaLabel: 'Explore Services',
    fallbackSeoTitle: 'Our Process — TOP TECH',
  },
  contactPage: {
    channelsHeading: 'Direct Channels & Availability',
    channelsSubtitle:
      'Prefer direct messaging or email? Reach our team immediately through any channel below.',
    whatsappButtonLabel: 'WhatsApp Contact',
    emailButtonLabel: 'Email Us',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    availabilityLabel: 'Availability',
    socialHeading: 'Connect with TOP TECH',
    fallbackSeoTitle: 'Contact Us — TOP TECH',
  },
  contactForm: {
    heading: 'Send a Project Inquiry',
    honeypotLabel: 'Leave this field empty',
    nameLabel: 'Full Name',
    namePlaceholder: 'Alex Morgan',
    emailLabel: 'Email Address',
    emailPlaceholder: 'alex@company.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+1 (555) 000-0000',
    serviceLabel: 'Service of Interest',
    customServiceOption: 'Custom / Multiple Services',
    messageLabel: 'Project Details',
    messagePlaceholder:
      'Tell us about your timeline, goals, and what you would like to build or learn...',
    submitLabel: 'Send Inquiry',
    submittingLabel: 'Sending...',
    configuredHint: 'Powered by configured external form handler.',
    unconfiguredHint: 'Prepared for Formspree / Web3Forms integration via CMS.',
    validationName: 'Please enter your full name (at least 2 characters).',
    validationEmail: 'Please enter a valid email address.',
    validationPhone: 'Please enter a valid phone number or leave it blank.',
    validationMessage:
      'Please include at least a brief description of your project (10+ characters).',
    validationBot: 'Unable to verify form submission. Please try again.',
    submitFailedPrefix: 'Submission failed',
    submitNetworkError: 'Unable to reach the configured form service.',
    successMessage:
      'Your inquiry has been submitted through the configured form service. Our team will respond shortly.',
    errorFallbackMessage: 'Unable to submit form. Use direct email or WhatsApp below.',
    fallbackEmailAppLabel: 'Send via Email App',
    fallbackWhatsappLabel: 'Send via WhatsApp',
    unconfiguredTitle: 'External form endpoint not connected yet',
    unconfiguredDescription:
      'To enable direct browser submissions on static hosting, add your Formspree or Web3Forms URL to formEndpoint in Pages CMS. Meanwhile, your details are ready to send directly:',
    unconfiguredEmailLabel: 'Open Pre-filled Email',
    emailSubjectPrefix: 'TOP TECH Inquiry:',
  },
  customPage: {
    backHomeLabel: 'Back to Home',
  },
  notFoundPage: {
    kicker: 'Error 404',
    headline: 'Page Not Found',
    description:
      'The route you followed does not match an active page, service, or portfolio showcase. Return to our homepage or explore what TOP TECH builds.',
    homeButtonLabel: 'Return Home',
    servicesButtonLabel: 'Explore Services',
    seoTitle: 'Page Not Found (404) — TOP TECH',
    seoDescription:
      'The requested page could not be found on TOP TECH. Return home or explore our services.',
  },
};

function mergeCopySection<T extends Record<string, string>>(
  defaults: T,
  overrides: Partial<T> | undefined
): T {
  const result = { ...defaults };
  if (!overrides || typeof overrides !== 'object') {
    return result;
  }
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    const value = overrides[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      result[key] = value as T[keyof T];
    }
  }
  return result;
}

const rawInterfaceCopy = (interfaceCopyData || {}) as Partial<InterfaceCopy>;

export const interfaceCopy: InterfaceCopy = {
  navbar: mergeCopySection(DEFAULT_INTERFACE_COPY.navbar, rawInterfaceCopy.navbar),
  footer: mergeCopySection(DEFAULT_INTERFACE_COPY.footer, rawInterfaceCopy.footer),
  loadingScreen: mergeCopySection(
    DEFAULT_INTERFACE_COPY.loadingScreen,
    rawInterfaceCopy.loadingScreen
  ),
  whatsapp: mergeCopySection(DEFAULT_INTERFACE_COPY.whatsapp, rawInterfaceCopy.whatsapp),
  ordering: mergeCopySection(DEFAULT_INTERFACE_COPY.ordering, rawInterfaceCopy.ordering),
  media: mergeCopySection(DEFAULT_INTERFACE_COPY.media, rawInterfaceCopy.media),
  aboutPage: mergeCopySection(DEFAULT_INTERFACE_COPY.aboutPage, rawInterfaceCopy.aboutPage),
  servicesPage: mergeCopySection(
    DEFAULT_INTERFACE_COPY.servicesPage,
    rawInterfaceCopy.servicesPage
  ),
  serviceDetailPage: mergeCopySection(
    DEFAULT_INTERFACE_COPY.serviceDetailPage,
    rawInterfaceCopy.serviceDetailPage
  ),
  portfolio: mergeCopySection(DEFAULT_INTERFACE_COPY.portfolio, rawInterfaceCopy.portfolio),
  projectDetailPage: mergeCopySection(
    DEFAULT_INTERFACE_COPY.projectDetailPage,
    rawInterfaceCopy.projectDetailPage
  ),
  testimonials: mergeCopySection(
    DEFAULT_INTERFACE_COPY.testimonials,
    rawInterfaceCopy.testimonials
  ),
  processPage: mergeCopySection(DEFAULT_INTERFACE_COPY.processPage, rawInterfaceCopy.processPage),
  contactPage: mergeCopySection(DEFAULT_INTERFACE_COPY.contactPage, rawInterfaceCopy.contactPage),
  contactForm: mergeCopySection(DEFAULT_INTERFACE_COPY.contactForm, rawInterfaceCopy.contactForm),
  customPage: mergeCopySection(DEFAULT_INTERFACE_COPY.customPage, rawInterfaceCopy.customPage),
  notFoundPage: mergeCopySection(
    DEFAULT_INTERFACE_COPY.notFoundPage,
    rawInterfaceCopy.notFoundPage
  ),
};

export function formatCopyTemplate(
  template: string,
  replacements: Record<string, string>
): string {
  return Object.entries(replacements).reduce(
    (acc, [token, value]) => acc.replaceAll(`{${token}}`, value),
    template
  );
}

export const servicesList: ServiceItem[] = Object.values(serviceModules)
  .filter((item) => item.published !== false)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

function normalizeSlugValue(raw?: string): string {
  if (!raw || typeof raw !== 'string') return '';
  let decoded = raw.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // Keep original trimmed value if URI decoding fails
  }
  return decoded
    .split(/[?#]/)[0]
    .replace(/^\/+|\/+$/g, '')
    .replace(/^(projects\/)+/i, '')
    .replace(/\/+/g, '-')
    .trim();
}

function slugFromFilename(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename
    .replace(/\.json$/i, '')
    .replace(/^\d+-/, '')
    .trim();
}

function toSlugKey(value?: string): string {
  return normalizeSlugValue(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseOrder(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 99;
}

function normalizeProject(rawItem: Partial<ProjectItem> | null | undefined, filePath: string): ProjectItem {
  const item = rawItem && typeof rawItem === 'object' ? rawItem : {};
  const title = typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Untitled Project';
  const slug =
    normalizeSlugValue(item.slug) ||
    slugFromFilename(filePath) ||
    toSlugKey(title);

  const deliverables = Array.isArray(item.deliverables)
    ? item.deliverables.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
    : [];

  return {
    order: parseOrder(item.order),
    published: item.published !== false,
    slug,
    title,
    category: typeof item.category === 'string' && item.category.trim() ? item.category.trim() : 'Digital Solutions',
    clientType: typeof item.clientType === 'string' ? item.clientType.trim() : '',
    summary: typeof item.summary === 'string' ? item.summary.trim() : '',
    challenge: typeof item.challenge === 'string' ? item.challenge.trim() : '',
    solution: typeof item.solution === 'string' ? item.solution.trim() : '',
    deliverables,
    image: typeof item.image === 'string' ? item.image.trim() : '',
    videoUrl: typeof item.videoUrl === 'string' ? item.videoUrl.trim() : '',
    projectUrl: typeof item.projectUrl === 'string' ? item.projectUrl.trim() : '',
    featured: item.featured ?? true,
    seo:
      item.seo && typeof item.seo === 'object'
        ? {
            title: typeof item.seo.title === 'string' ? item.seo.title : `${title} — TOP TECH Projects`,
            description: typeof item.seo.description === 'string' ? item.seo.description : '',
            ogImage: typeof item.seo.ogImage === 'string' ? item.seo.ogImage : undefined,
          }
        : {
            title: `${title} — TOP TECH Projects`,
            description: typeof item.summary === 'string' ? item.summary.trim() : '',
          },
  };
}

export const projectsList: ProjectItem[] = Object.entries(projectModules)
  .map(([filePath, item]) => normalizeProject(item, filePath))
  .filter((item) => item.published !== false && item.slug.length > 0)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const testimonialsList: TestimonialItem[] = Object.values(testimonialModules)
  .filter((item) => item.visible !== false)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const customPagesList: CustomPageItem[] = Object.values(pageModules).filter(
  (page) => page.published !== false
);

export function getServiceBySlug(slug?: string): ServiceItem | undefined {
  if (!slug) return undefined;
  return servicesList.find((service) => service.slug === slug);
}

export function getProjectBySlug(slug?: string): ProjectItem | undefined {
  const target = normalizeSlugValue(slug);
  if (!target) return undefined;

  const exactMatch = projectsList.find((project) => project.slug === target);
  if (exactMatch) return exactMatch;

  const lowerTarget = target.toLowerCase();
  const caseInsensitiveMatch = projectsList.find(
    (project) => project.slug.toLowerCase() === lowerTarget
  );
  if (caseInsensitiveMatch) return caseInsensitiveMatch;

  const targetKey = toSlugKey(target);
  if (!targetKey) return undefined;

  return projectsList.find(
    (project) => toSlugKey(project.slug) === targetKey || toSlugKey(project.title) === targetKey
  );
}

export function getProjectsForService(service: ServiceItem): ProjectItem[] {
  const categoryKeys = [
    service.name,
    service.slug,
    ...(Array.isArray(service.relatedCategories) ? service.relatedCategories : []),
  ]
    .map((entry) => toSlugKey(entry))
    .filter(Boolean);

  return projectsList.filter((project) => {
    const projectCategoryKey = toSlugKey(project.category);
    return Boolean(projectCategoryKey) && categoryKeys.includes(projectCategoryKey);
  });
}

export function getCustomPageBySlug(slug?: string): CustomPageItem | undefined {
  if (!slug) return undefined;
  return customPagesList.find((page) => page.slug === slug);
}
