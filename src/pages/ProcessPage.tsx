import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { processContent } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { PageHeader } from '../components/PageHeader';
import { MagneticButton } from '../components/effects/MagneticButton';

export function ProcessPage() {
  useSeo({
    title: processContent.seo?.title || 'Our Process — TOP TECH',
    description: processContent.seo?.description,
    ogImage: processContent.seo?.ogImage,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div>
      <PageHeader
        kicker={processContent.kicker}
        headline={processContent.headline}
        subtitle={processContent.subtitle}
        actions={
          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <span>{processContent.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
        }
      />

      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {processContent.steps.map((step, idx) => (
            <motion.article
              key={step.stepNumber}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 font-mono-num text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Stage {step.stepNumber} of 0{processContent.steps.length}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                    {step.title}
                  </h2>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-5 lg:pl-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-800">
                  {step.activities && step.activities.length > 0 && (
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                        Key Activities
                      </h3>
                      <ul className="space-y-2">
                        {step.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200"
                          >
                            <CheckCircle2
                              className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                              aria-hidden="true"
                            />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.deliverable && (
                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-sm">
                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        Stage Output:{' '}
                      </span>
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {step.deliverable}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-50/70 dark:bg-[#050A18]/65">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                {processContent.collaborationNoteTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {processContent.collaborationNoteBody}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{processContent.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <Link
                to="/services"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#060B18] hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
