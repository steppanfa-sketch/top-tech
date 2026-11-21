import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Layers } from 'lucide-react';
import { homeContent, processContent, servicesList, siteConfig } from '../../lib/cms';
import { isValidExternalUrl } from '../../lib/assets';
import { SmartImage } from '../SmartImage';
import { MagneticButton } from '../effects/MagneticButton';

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 20;
    const timer = window.setInterval(() => {
      frame += 1;
      const next = Math.round((frame / totalFrames) * target);
      setCount(next);
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 24);
    return () => window.clearInterval(timer);
  }, [target]);

  return <span className="font-mono-num">{String(count).padStart(2, '0')}</span>;
}

export function HeroSection() {
  const { hero } = homeContent;
  const hasExternalStartUrl = isValidExternalUrl(siteConfig.startProjectUrl);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/45 dark:bg-[#050A18]/45"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-7"
          >
            <p className="text-sm font-medium tracking-wide text-blue-600 dark:text-blue-400">
              {hero.kicker}
            </p>

            <h1
              className="font-display font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.75rem)' }}
            >
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
              {hero.supportingText}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton>
                <Link
                  to="/services"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050A18]"
                >
                  <span>{hero.primaryCtaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                {hasExternalStartUrl ? (
                  <a
                    href={siteConfig.startProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/85 dark:bg-[#0B1224]/85 backdrop-blur-sm hover:border-blue-500 dark:hover:border-blue-400 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{hero.secondaryCtaLabel}</span>
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/85 dark:bg-[#0B1224]/85 backdrop-blur-sm hover:border-blue-500 dark:hover:border-blue-400 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span>{hero.secondaryCtaLabel}</span>
                  </Link>
                )}
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Visual Focal Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
              <SmartImage
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                priority
                className="h-64 sm:h-80 lg:h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A18]/80 via-[#050A18]/20 to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200">
                <span>Web · E-Commerce · Apps · Design · Building Plans · AI</span>
                <span className="font-mono-num text-blue-300">TOP TECH Studio</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Agency Capability Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0B1224]/75 backdrop-blur-sm"
        >
          <Link
            to="/services"
            className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition-colors"
          >
            <Layers className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">
                <AnimatedCounter target={servicesList.length} /> Service Divisions
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dedicated pages &amp; configurable ordering
              </p>
            </div>
          </Link>

          <Link
            to="/process"
            className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition-colors"
          >
            <Compass className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">
                <AnimatedCounter target={processContent.steps.length} /> Delivery Stages
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Structured from discovery to ongoing support
              </p>
            </div>
          </Link>

          <Link
            to="/contact"
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div>
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">
                Direct Ordering &amp; Custom Quotes
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Flexible workflows for individuals &amp; businesses
              </p>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
