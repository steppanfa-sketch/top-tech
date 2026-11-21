import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getCustomPageBySlug } from '../lib/cms';
import { isValidExternalUrl } from '../lib/assets';
import { useSeo } from '../lib/seo';
import { useOrder } from '../context/OrderContext';
import { SmartImage } from '../components/SmartImage';
import { VideoEmbed } from '../components/VideoEmbed';
import { MagneticButton } from '../components/effects/MagneticButton';
import { NotFoundPage } from './NotFoundPage';

export function CustomPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setPreselectedService } = useOrder();
  const page = getCustomPageBySlug(slug);

  useSeo({
    title: page?.seo?.title || (page ? `${page.title} — TOP TECH` : undefined),
    description: page?.seo?.description || page?.heroSubtitle,
    ogImage: page?.seo?.ogImage || page?.heroImage,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!page) {
    return <NotFoundPage />;
  }

  const handleCtaClick = () => {
    if (!page.ctaTarget) return;
    if (page.ctaTarget.includes('contact')) {
      const urlParts = page.ctaTarget.split('?service=');
      const serviceParam = urlParts[1] ? decodeURIComponent(urlParts[1]) : '';
      if (serviceParam) {
        setPreselectedService(serviceParam);
      }
      navigate('/contact', { state: { service: serviceParam } });
      return;
    }
    const normalizedRoute = page.ctaTarget.replace(/^\/?#/, '');
    navigate(normalizedRoute.startsWith('/') ? normalizedRoute : `/${normalizedRoute}`);
  };

  return (
    <div className="bg-slate-50/60 dark:bg-[#050A18]/55 min-h-[75vh]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {page.kicker && (
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {page.kicker}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
            {page.title}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {page.heroSubtitle}
          </p>
        </motion.div>

        {page.heroImage && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 aspect-[16/9]">
            <SmartImage
              src={page.heroImage}
              alt={page.title}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {page.videoUrl && <VideoEmbed url={page.videoUrl} title={page.title} />}

        <div className="space-y-6">
          {page.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 sm:p-8 space-y-4"
            >
              <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {section.body}
              </p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2.5 pt-1">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-1 shrink-0 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {page.ctaLabel && page.ctaTarget && (
          <div className="pt-2">
            <MagneticButton>
              {isValidExternalUrl(page.ctaTarget) ? (
                <a
                  href={page.ctaTarget}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  <span>{page.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>{page.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </MagneticButton>
          </div>
        )}
      </div>
    </div>
  );
}
