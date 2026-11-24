import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  getProjectsForService,
  getServiceBySlug,
  servicesList,
} from '../lib/cms';
import { useSeo } from '../lib/seo';
import { useOrder } from '../context/OrderContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { OrderActionButton } from '../components/OrderActionButton';
import { SmartImage } from '../components/SmartImage';
import { TiltCard } from '../components/effects/TiltCard';
import { MagneticButton } from '../components/effects/MagneticButton';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setPreselectedService } = useOrder();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const service = getServiceBySlug(slug);

  useSeo({
    title: service?.seo?.title || (service ? `${service.name} — TOP TECH` : undefined),
    description: service?.seo?.description || service?.shortDescription,
    ogImage: service?.seo?.ogImage || service?.image,
    schema: service
      ? {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'TOP TECH',
          },
          serviceType: service.name,
        }
      : undefined,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setOpenFaqIndex(0);
  }, [slug]);

  if (!service) {
    return <NotFoundPage />;
  }

  const relevantProjects = getProjectsForService(service);
  const otherServices = servicesList.filter((s) => s.slug !== service.slug).slice(0, 3);

  const handleRequestQuote = () => {
    setPreselectedService(service.name);
    navigate('/contact', { state: { service: service.name } });
  };

  return (
    <div className="bg-transparent">
      {/* Service Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/55 dark:bg-[#050A18]/55 py-8 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 right-[10%] h-[340px] w-[340px] rounded-full bg-blue-500/15 dark:bg-blue-600/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>All Services</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
          >
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  <DynamicIcon name={service.icon} className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Service Division · TOP TECH
                </span>
              </div>

              <h1
                className="font-display font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(1.95rem, 4vw, 3.25rem)' }}
              >
                {service.name}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {service.heroSubtitle || service.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <OrderActionButton service={service} className="min-h-[46px] w-full sm:w-auto px-6" />

                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-[1.5px] border-slate-400/90 dark:border-blue-400/50 bg-white/95 dark:bg-[#0D1836]/90 hover:border-blue-600 dark:hover:border-cyan-400 hover:bg-blue-50/75 dark:hover:bg-[#13234B] active:scale-[0.98] px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span>Discuss Custom Scope</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[300px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-lg">
                <SmartImage
                  src={service.image}
                  alt={service.name}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview, Deliverables & Ideal For */}
      <section className="py-16 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Overview</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                How We Deliver {service.name}
              </h2>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {service.fullDescription}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-6 space-y-2">
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                Ideal For
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {service.idealFor}
              </p>
              {service.slug === 'ai-training' && (
                <div className="pt-2">
                  <Link
                    to="/pages/ai-training-programs"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Explore AI Training Curriculum Tracks</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
              Core Deliverables
            </h2>
            <ul className="space-y-3">
              {(Array.isArray(service.deliverables) ? service.deliverables : []).map((item, idx) => (
                <li
                  key={`${idx}-${item}`}
                  className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2
                    className="w-5 h-5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits & Features */}
      {(service.benefits?.length > 0 || service.features?.length > 0) && (
        <section className="py-16 bg-slate-50/70 dark:bg-[#050A18]/65 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
            {service.benefits?.length > 0 && (
              <div className="space-y-8">
                <div className="max-w-2xl space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Business Value</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                    Key Benefits
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.benefits.map((benefit, idx) => {
                    const BenefitIcon = [Sparkles, ShieldCheck, TrendingUp][idx % 3];
                    return (
                      <motion.div
                        key={`${idx}-${benefit.title}`}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex"
                      >
                        <TiltCard maxTilt={3.5} className="group w-full rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 space-y-3.5 hover:border-blue-500/45 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-blue-950/25 transition-all duration-200">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/15 dark:border-blue-400/20 bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:scale-105">
                            <BenefitIcon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                            {benefit.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {benefit.description}
                          </p>
                        </TiltCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {service.features?.length > 0 && (
              <div className="space-y-8">
                <div className="max-w-2xl space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Capabilities</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                    Included Features
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={`${idx}-${feature.title}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      className="group rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 flex items-start gap-4 hover:border-blue-500/45 hover:shadow-md transition-all duration-200"
                    >
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 dark:border-blue-400/20 bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:scale-105">
                        <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service-Specific Process */}
      {service.processSteps?.length > 0 && (
        <section className="py-16 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Execution</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                How We Deliver Your {service.name} Project
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <motion.div
                  key={`${idx}-${step.step}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/90 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 space-y-3 hover:border-blue-500/45 hover:shadow-md transition-all duration-200"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 font-mono-num text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {step.step}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relevant Projects */}
      {relevantProjects.length > 0 && (
        <section className="py-16 bg-slate-50/70 dark:bg-[#050A18]/65 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Showcase Examples
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                  Relevant Projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div
              className={`grid grid-cols-1 ${
                relevantProjects.length === 1
                  ? 'max-w-xl'
                  : relevantProjects.length === 2
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              } gap-6`}
            >
              {relevantProjects.map((project) => (
                <TiltCard key={project.slug} maxTilt={4} className="rounded-2xl">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group h-full overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-blue-950/30 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-900">
                        <SmartImage
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-6 space-y-2">
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {project.category}
                          {project.clientType ? ` · ${project.clientType}` : ''}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-5 text-sm font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1.5">
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs?.length > 0 && (
        <section className="py-16 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Questions</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={`${idx}-${faq.question}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0B1224]/90 backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-display text-base font-semibold text-slate-950 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Order CTA + Other Services */}
      <section className="py-16 bg-slate-50/70 dark:bg-[#050A18]/65">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                Ready to Order {service.name}?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Proceed through our configured ordering flow or request a tailored project consultation with TOP TECH.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <OrderActionButton service={service} className="min-h-[46px] px-6" />
              <MagneticButton>
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#060B18] hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors cursor-pointer"
                >
                  <span>Contact Us</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
              Explore Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <TiltCard key={other.slug} maxTilt={3.5} className="rounded-2xl">
                  <Link
                    to={`/services/${other.slug}`}
                    className="group flex flex-col justify-between h-full rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-blue-950/30 transition-all duration-200 space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/15 dark:border-blue-400/20 bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:scale-105">
                        <DynamicIcon name={other.icon} className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {other.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {other.shortDescription}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
