import { motion } from 'motion/react';
import React from 'react';

interface PageHeaderProps {
  kicker: string;
  headline: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function PageHeader({ kicker, headline, subtitle, actions }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/55 dark:bg-[#050A18]/55 py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {kicker}
          </p>
          <h1
            className="font-display font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            {headline}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
          {actions && <div className="pt-2 flex flex-wrap items-center gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}
