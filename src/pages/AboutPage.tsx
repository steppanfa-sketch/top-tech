import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Eye, Target } from 'lucide-react';
import { aboutContent } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { PageHeader } from '../components/PageHeader';
import { SmartImage } from '../components/SmartImage';
import { DynamicIcon } from '../components/DynamicIcon';
import { TiltCard } from '../components/effects/TiltCard';
import { MagneticButton } from '../components/effects/MagneticButton';

export function AboutPage() {
  useSeo({
    title: aboutContent.seo?.title || 'About Us — TOP TECH',
    description: aboutContent.seo?.description,
    ogImage: aboutContent.seo?.ogImage || aboutContent.image,
    schema: {
      '@type': 'AboutPage',
      name: aboutContent.seo?.title || 'About Us — TOP TECH',
      description: aboutContent.seo?.description || aboutContent.intro,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div>
      <PageHeader
        kicker={aboutContent.kicker}
        headline={aboutContent.headline}
        subtitle={aboutContent.intro}
        actions={
          <>
            <MagneticButton>
              <Link
                to="/services"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1224] hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors"
              >
                <span>Start a Conversation</span>
              </Link>
            </MagneticButton>
          </>
        }
      />

      {/* Agency Overview & Mission/Vision */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900"
            >
              <SmartImage
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                className="h-72 sm:h-80 lg:h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center space-y-6"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Technology, Creative Design &amp; Practical AI Under One Roof
              </h2>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {aboutContent.secondaryText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-5 space-y-2.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    <Target className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {aboutContent.mission.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {aboutContent.mission.description}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-5 space-y-2.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {aboutContent.vision.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {aboutContent.vision.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Principles</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutContent.values.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="space-y-2"
                >
                  <span className="font-mono-num text-xs font-semibold text-blue-600 dark:text-blue-400">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to Work With TOP TECH */}
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#050A18]/65">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Our Standards
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {aboutContent.reasonsHeading}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {aboutContent.reasonsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.reasons.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
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
    </div>
  );
}
