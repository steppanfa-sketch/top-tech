import siteData from '../content/site.json';
import navigationData from '../content/navigation.json';
import homeData from '../content/home.json';
import aboutData from '../content/about.json';
import processData from '../content/process.json';
import servicesOverviewData from '../content/services-overview.json';
import projectsOverviewData from '../content/projects-overview.json';
import contactData from '../content/contact.json';
import type {
  AboutContent,
  ContactConfig,
  CustomPageItem,
  HomeContent,
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
  const categories = service.relatedCategories?.length
    ? service.relatedCategories
    : [service.name];
  return projectsList.filter((project) => {
    const projectCategory = (project.category || '').toLowerCase();
    return Boolean(projectCategory) && categories.some((cat) => cat.toLowerCase() === projectCategory);
  });
}

export function getCustomPageBySlug(slug?: string): CustomPageItem | undefined {
  if (!slug) return undefined;
  return customPagesList.find((page) => page.slug === slug);
}
