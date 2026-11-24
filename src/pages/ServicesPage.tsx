import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesList, servicesOverviewContent } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { PageHeader } from '../components/PageHeader';
import { DynamicIcon } from '../components/DynamicIcon';
import { OrderActionButton } from '../components/OrderActionButton';
import { SmartImage } from '../components/SmartImage';
import { TiltCard } from '../components/effects/TiltCard';
import { MagneticButton } from '../components/effects/MagneticButton';

export function ServicesPage() {
  useSeo({
    title: servicesOverviewContent.seo?.title || 'Services — TOP TECH',
    description: servicesOverviewContent.seo?.description,
    ogImage: servicesOverviewContent.seo?.ogImage || servicesList[0]?.image,
    schema: {
      '@type': 'CollectionPage',
      name: servicesOverviewContent.seo?.title || 'Services — TOP TECH',
      description: servicesOverviewContent.seo?.description,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div>
      <PageHeader
        kicker={servicesOverviewContent.kicker}
        headline={servicesOverviewContent.headline}
        subtitle={servicesOverviewContent.subtitle}
      />

      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <TiltCard className="w-full overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/95 dark:bg-[#0B1224]/90 backdrop-blur-sm transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-blue-950/30">
                  <article className="group flex flex-col justify-between h-full">
                    <div>
                      <Link
                        to={`/services/${service.slug}`}
                        className="block relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-900"
                      >
                        <SmartImage
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                        />
                      </Link>

                      <div className="p-6 space-y-4">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/15 dark:border-blue-400/20 bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:scale-105">
                          <DynamicIcon name={service.icon} className="w-5 h-5" />
                        </div>

                        <div className="space-y-2">
                          <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                            <Link
                              to={`/services/${service.slug}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {service.name}
                            </Link>
                          </h2>
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {service.shortDescription}
                          </p>
                        </div>

                        <ul className="space-y-1.5 pt-1 border-t border-slate-200/70 dark:border-slate-800/70">
                          {(Array.isArray(service.deliverables) ? service.deliverables : [])
                            .slice(0, 3)
                            .map((item, itemIdx) => (
                              <li
                                key={`${service.slug}-${itemIdx}-${item}`}
                                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                              >
                              <CheckCircle2
                                className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060B18] hover:border-blue-500/50 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>

                      <OrderActionButton service={service} className="min-h-[42px] flex-1" />
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50/70 dark:bg-[#050A18]/65">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                {servicesOverviewContent.ctaTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {servicesOverviewContent.ctaDescription}
              </p>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
