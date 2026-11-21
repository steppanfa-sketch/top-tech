import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { contactConfig } from '../lib/cms';
import { MagneticButton } from './effects/MagneticButton';

export function FloatingWhatsAppButton() {
  if (contactConfig.floatingWhatsappEnabled === false) {
    return null;
  }

  const digits = (contactConfig.whatsappNumber || '').replace(/\D/g, '');
  if (!digits) {
    return null;
  }

  const label = contactConfig.floatingWhatsappLabel?.trim() || 'Chat on WhatsApp';
  const prefill =
    contactConfig.whatsappPrefill?.trim() ||
    'Hello TOP TECH, I would like to discuss a new project.';
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(prefill)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30"
    >
      <MagneticButton strength={4}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-emerald-500/35 dark:border-emerald-400/35 bg-white/95 dark:bg-[#0B1224]/95 px-3.5 sm:px-4 text-sm font-semibold text-slate-900 dark:text-white shadow-lg shadow-slate-950/10 dark:shadow-blue-950/40 backdrop-blur-md hover:border-emerald-500/70 hover:bg-emerald-50/90 dark:hover:bg-[#0E1832] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0B1224]"
            />
          </span>
          <span className="hidden sm:inline whitespace-nowrap pr-0.5">{label}</span>
        </a>
      </MagneticButton>
    </motion.div>
  );
}
