import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { interfaceCopy, projectsOverviewContent, siteConfig } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { PageHeader } from '../components/PageHeader';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { MagneticButton } from '../components/effects/MagneticButton';

export function ProjectsPage() {
  useSeo({
    title: projectsOverviewContent.seo?.title || interfaceCopy.portfolio.fallbackSeoTitle,
    description: projectsOverviewContent.seo?.description,
    ogImage: projectsOverviewContent.seo?.ogImage,
    schema: {
      '@type': 'CollectionPage',
      name: projectsOverviewContent.seo?.title || interfaceCopy.portfolio.fallbackSeoTitle,
      description: projectsOverviewContent.seo?.description,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="bg-transparent">
      <PageHeader
        kicker={projectsOverviewContent.kicker}
        headline={projectsOverviewContent.headline}
        subtitle={projectsOverviewContent.subtitle}
      />

      <ProjectsSection showHeading={false} />

      <TestimonialsSection />

      <section className="py-16 bg-white/80 dark:bg-[#070D1F]/75">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0B1224]/90 backdrop-blur-sm p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                {projectsOverviewContent.ctaTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {projectsOverviewContent.ctaDescription}
              </p>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>{siteConfig.startProjectLabel || 'Start a Project'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
