import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Compass, Layers } from 'lucide-react';
import { interfaceCopy } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { MagneticButton } from '../components/effects/MagneticButton';

export function NotFoundPage() {
  const { prefersReducedMotion } = useMotionCapabilities();

  useSeo({
    title: interfaceCopy.notFoundPage.seoTitle,
    description: interfaceCopy.notFoundPage.seoDescription,
    noindex: true,
  });

  return (
    <div className="min-h-[72vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-slate-50/55 dark:bg-[#050A18]/50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-md p-8 sm:p-12 shadow-xl shadow-slate-950/5 dark:shadow-blue-950/20"
      >
        {/* Animated Orbital 404 Visual Element */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          {!prefersReducedMotion && (
            <>
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-blue-500/45 dark:border-cyan-400/45"
              />
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-blue-500/12 dark:bg-blue-500/20 blur-md"
              />
            </>
          )}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-50 dark:bg-[#060B18] text-blue-600 dark:text-cyan-400 shadow-inner">
            <Compass className="w-7 h-7" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono-num text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-cyan-400">
            {interfaceCopy.notFoundPage.kicker}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            {interfaceCopy.notFoundPage.headline}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {interfaceCopy.notFoundPage.description}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <Link
              to="/"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{interfaceCopy.notFoundPage.homeButtonLabel}</span>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              to="/services"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#060B18] hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <span>{interfaceCopy.notFoundPage.servicesButtonLabel}</span>
            </Link>
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
}
