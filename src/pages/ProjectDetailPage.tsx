import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug } from '../lib/cms';
import { isValidExternalUrl } from '../lib/assets';
import { useSeo } from '../lib/seo';
import { useOrder } from '../context/OrderContext';
import { SmartImage } from '../components/SmartImage';
import { VideoEmbed } from '../components/VideoEmbed';
import { MagneticButton } from '../components/effects/MagneticButton';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setPreselectedService } = useOrder();
  const project = getProjectBySlug(slug);

  useSeo({
    title: project?.seo?.title || (project ? `${project.title} — TOP TECH` : undefined),
    description: project?.seo?.description || project?.summary,
    ogImage: project?.seo?.ogImage || project?.image,
    type: 'article',
    schema: project
      ? {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          genre: project.category,
          creator: {
            '@type': 'Organization',
            name: 'TOP TECH',
          },
        }
      : undefined,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return <NotFoundPage />;
  }

  const hasExternalUrl = isValidExternalUrl(project.projectUrl);
  const deliverables = Array.isArray(project.deliverables) ? project.deliverables : [];
  const hasChallenge = Boolean(project.challenge?.trim());
  const hasSolution = Boolean(project.solution?.trim());

  const handleStartSimilar = () => {
    const serviceTopic = project.category || 'Website Development';
    setPreselectedService(serviceTopic);
    navigate('/contact', { state: { service: serviceTopic } });
  };

  return (
    <div className="bg-slate-50/60 dark:bg-[#050A18]/55 min-h-[75vh]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {(project.category || project.clientType) && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              {project.category && (
                <span className="font-medium text-blue-600 dark:text-blue-400">{project.category}</span>
              )}
              {project.category && project.clientType && <span aria-hidden="true">·</span>}
              {project.clientType && <span>{project.clientType}</span>}
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
            {project.title}
          </h1>

          {project.summary && (
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
              {project.summary}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton>
              <button
                type="button"
                onClick={handleStartSimilar}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                <span>Request Similar Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </MagneticButton>

            {hasExternalUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1224] px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white hover:border-blue-500/60 transition-colors"
              >
                <span>Open Live Link</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[16/9]">
          <SmartImage
            src={project.image}
            alt={project.title}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        {project.videoUrl && <VideoEmbed url={project.videoUrl} title={project.title} />}

        {(hasChallenge || hasSolution) && (
          <div className={`grid grid-cols-1 ${hasChallenge && hasSolution ? 'md:grid-cols-2' : ''} gap-6`}>
            {hasChallenge && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 sm:p-8 space-y-3">
                <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                  The Challenge
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.challenge}
                </p>
              </div>
            )}

            {hasSolution && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 sm:p-8 space-y-3">
                <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                  Our Approach &amp; Solution
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {deliverables.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
              Key Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
