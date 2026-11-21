import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, PlayCircle } from 'lucide-react';
import { projectsList } from '../../lib/cms';
import { isValidExternalUrl } from '../../lib/assets';
import { SmartImage } from '../SmartImage';
import { TiltCard } from '../effects/TiltCard';

interface ProjectsSectionProps {
  showHeading?: boolean;
}

export function ProjectsSection({ showHeading = false }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projectsList.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projectsList;
    return projectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75 border-b border-slate-200 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          {showHeading ? (
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Portfolio &amp; Showcase
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                Selected Capabilities &amp; Concept Showcases
              </h2>
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Showing <span className="font-mono-num font-semibold text-slate-950 dark:text-white">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </p>
          )}

          {/* Interactive Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100/90 dark:bg-[#0B1224]/90 border border-slate-200 dark:border-slate-800"
          >
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const hasExternalLink = isValidExternalUrl(project.projectUrl);
              const hasVideo = isValidExternalUrl(project.videoUrl);

              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex"
                >
                  <TiltCard className="w-full flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-[#0B1224]/90 backdrop-blur-sm transition-colors hover:border-blue-500/50">
                    <article className="group flex flex-col justify-between h-full">
                      <div>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="block relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-900"
                        >
                          <SmartImage
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        </Link>

                        <div className="p-6 space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {project.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.clientType}</span>
                          </div>

                          <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {project.title}
                            </Link>
                          </h3>

                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {project.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 dark:border-slate-800/70 mt-2">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>Project Details</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>

                        <div className="flex items-center gap-3">
                          {hasVideo && (
                            <Link
                              to={`/projects/${project.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap"
                            >
                              <PlayCircle className="w-4 h-4" aria-hidden="true" />
                              <span>Video Demo</span>
                            </Link>
                          )}
                          {hasExternalLink && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap"
                            >
                              <span>Visit</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
