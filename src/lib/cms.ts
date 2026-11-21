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

export const projectsList: ProjectItem[] = Object.values(projectModules)
  .filter((item) => item.published !== false)
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
  if (!slug) return undefined;
  return projectsList.find((project) => project.slug === slug);
}

export function getProjectsForService(service: ServiceItem): ProjectItem[] {
  const categories = service.relatedCategories?.length
    ? service.relatedCategories
    : [service.name];
  return projectsList.filter((project) =>
    categories.some(
      (cat) => cat.toLowerCase() === project.category.toLowerCase()
    )
  );
}

export function getCustomPageBySlug(slug?: string): CustomPageItem | undefined {
  if (!slug) return undefined;
  return customPagesList.find((page) => page.slug === slug);
}
