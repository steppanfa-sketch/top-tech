import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, MessageSquare, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactConfig } from '../lib/cms';
import { useOrder } from '../context/OrderContext';
import { SmartImage } from './SmartImage';

export function OrderFallbackModal() {
  const { fallbackService, closeFallbackOrder, setPreselectedService } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fallbackService) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFallbackOrder();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [fallbackService, closeFallbackOrder]);

  if (!fallbackService) {
    return null;
  }

  const handleGoToContact = () => {
    const selectedName = fallbackService.name;
    setPreselectedService(selectedName);
    closeFallbackOrder();
    navigate('/contact', { state: { service: selectedName } });
  };

  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello TOP TECH, I would like to order or inquire about: ${fallbackService.name}`
  )}`;

  const mailtoUrl = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
    `Service Inquiry: ${fallbackService.name}`
  )}&body=${encodeURIComponent(
    `Hello TOP TECH,\n\nI would like to order or discuss ${fallbackService.name}.\n\nProject details:\n`
  )}`;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-fallback-title"
        onClick={closeFallbackOrder}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1224] shadow-2xl"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <SmartImage
              src={fallbackService.image}
              alt={fallbackService.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
            <button
              type="button"
              onClick={closeFallbackOrder}
              aria-label="Close service ordering dialog"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950/70 text-white hover:bg-slate-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-xs font-medium text-blue-300">
                Service Request
              </p>
              <h3 id="order-fallback-title" className="font-display text-xl font-bold text-white">
                {fallbackService.name}
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {fallbackService.available
                ? 'Direct online checkout for this service is not linked yet. Start your order directly with our team using any option below so we can confirm scope, timeline, and deliverables.'
                : 'This service is currently booked through custom project consultation. Connect with our team below to receive a tailored scope and timeline.'}
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleGoToContact}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Request via Contact Page</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500/60 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={mailtoUrl}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500/60 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
