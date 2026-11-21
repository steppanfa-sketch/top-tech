import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { testimonialsList } from '../../lib/cms';

export function TestimonialsSection() {
  if (testimonialsList.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 bg-slate-50/70 dark:bg-[#050A18]/65 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3 mb-12"
        >
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Client Feedback Slots
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
            Client Testimonials
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Manage, publish, hide, or replace client feedback entries directly through Pages CMS without modifying site code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsList.map((item, idx) => (
            <motion.figure
              key={`${item.authorName}-${idx}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1224] p-6 sm:p-7 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{item.serviceCategory}</span>
                  {item.isSamplePlaceholder && (
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      Sample Placeholder
                    </span>
                  )}
                </div>

                <Quote className="w-5 h-5 text-blue-600/70 dark:text-blue-400/70" aria-hidden="true" />

                <blockquote className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                <p className="font-display text-sm font-semibold text-slate-950 dark:text-white">
                  {item.authorName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.role} · {item.organization}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
