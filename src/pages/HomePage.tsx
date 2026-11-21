import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  homeContent,
  processContent,
  projectsList,
  servicesList,
} from '../lib/cms';
import { useSeo } from '../lib/seo';
import { HeroSection } from '../components/sections/HeroSection';
import { DynamicIcon } from '../components/DynamicIcon';
import { OrderActionButton } from '../components/OrderActionButton';
import { SmartImage } from '../components/SmartImage';
import { MagneticButton } from '../components/effects/MagneticButton';
import { TiltCard } from '../components/effects/TiltCard';

export function HomePage() {
  useSeo({
    title: homeContent.seo?.title,
    description: homeContent.seo?.description,
    ogImage: homeContent.seo?.ogImage || homeContent.hero.heroImage,
    schema: {
      '@type': 'ProfessionalService',
      name: 'TOP TECH',
      slogan: 'Technology. Creativity. Innovation.',
      description:
        homeContent.seo?.description ||
        'Digital agency specializing in websites, e-commerce, web and mobile applications, graphic design, building plans, and practical AI training.',
      serviceType: servicesList.map((s) => s.name),
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const featuredServices = homeContent.featuredServicesSection.featuredSlugs
    .map((slug) => servicesList.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const displayedServices =
    featuredServices.length > 0 ? featuredServices : servicesList.slice(0, 4);

  const selectedProjects = projectsList
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Brief Company Introduction */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {homeContent.introSection.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {homeContent.introSection.headline}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {homeContent.introSection.summary}
              </p>
              <div>
                <Link
                  to="/about"
                  className="inline-flex min-h-[42px] items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>{homeContent.introSection.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#050A18]/65 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {homeContent.featuredServicesSection.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {homeContent.featuredServicesSection.headline}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                {homeContent.featuredServicesSection.subtitle}
              </p>
            </div>

            <MagneticButton>
              <Link
                to="/services"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>{homeContent.featuredServicesSection.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedServices.map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="flex"
              >
                <TiltCard className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 hover:border-blue-500/50 transition-colors">
                  <article className="flex flex-col justify-between h-full space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          <DynamicIcon name={service.icon} className="w-5 h-5" />
                        </div>
                        <span className="font-mono-num text-xs text-slate-400 dark:text-slate-500">
                          {service.code}.
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                          <Link
                            to={`/services/${service.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {service.name}
                          </Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-2">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                      <OrderActionButton service={service} className="w-full min-h-[40px]" />
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {homeContent.selectedProjectsSection.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {homeContent.selectedProjectsSection.headline}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                {homeContent.selectedProjectsSection.subtitle}
              </p>
            </div>

            <MagneticButton>
              <Link
                to="/projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>{homeContent.selectedProjectsSection.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="flex"
              >
                <TiltCard className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                  <article className="group flex flex-col justify-between h-full">
                    <div>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="block aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-900"
                      >
                        <SmartImage
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </Link>
                      <div className="p-6 space-y-2.5">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {project.category}
                          </span>{' '}
                          · {project.clientType}
                        </p>
                        <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                          <Link
                            to={`/projects/${project.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-5">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Reasons to Choose Us */}
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#050A18]/65 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {homeContent.whyChooseSection.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {homeContent.whyChooseSection.headline}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                {homeContent.whyChooseSection.subtitle}
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{homeContent.whyChooseSection.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeContent.whyChooseSection.items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="flex"
              >
                <TiltCard maxTilt={3.5} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief Working Process Overview */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {homeContent.processOverviewSection.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {homeContent.processOverviewSection.headline}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300">
                {homeContent.processOverviewSection.subtitle}
              </p>
            </div>

            <Link
              to="/process"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{homeContent.processOverviewSection.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {processContent.steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-5 space-y-2"
              >
                <span className="font-mono-num text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {step.stepNumber}
                </span>
                <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Call-to-Action Section */}
      <section className="py-16 sm:py-24 bg-slate-50/60 dark:bg-[#050A18]/55">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-md p-8 sm:p-12 text-center space-y-6"
          >
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {homeContent.ctaSection.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white max-w-2xl mx-auto text-balance">
              {homeContent.ctaSection.headline}
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {homeContent.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] px-6 py-3 text-sm font-semibold text-white transition-all whitespace-nowrap shrink-0"
                >
                  <span>{homeContent.ctaSection.primaryButtonLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  to="/services"
                  className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-[1.5px] border-slate-400/90 dark:border-blue-400/50 bg-slate-50 dark:bg-[#0D1836] hover:border-blue-600 dark:hover:border-cyan-400 hover:bg-blue-50/75 dark:hover:bg-[#13234B] active:scale-[0.98] px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-all whitespace-nowrap shrink-0"
                >
                  <span>{homeContent.ctaSection.secondaryButtonLabel}</span>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
