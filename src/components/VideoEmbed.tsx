import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { interfaceCopy } from '../lib/cms';
import { parseVideoEmbed } from '../lib/assets';

interface VideoEmbedProps {
  url?: string;
  title: string;
}

export function VideoEmbed({ url, title }: VideoEmbedProps) {
  const parsed = parseVideoEmbed(url);
  if (!parsed) return null;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1224]/90 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
          <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span>{interfaceCopy.media.videoSectionTitle}</span>
        </div>
        {(parsed.kind === 'youtube' || parsed.kind === 'vimeo') && (
          <a
            href={parsed.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>{interfaceCopy.media.videoOpenSourceLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </div>

      {parsed.kind === 'youtube' || parsed.kind === 'vimeo' ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-200/50 dark:border-slate-800">
          <iframe
            src={parsed.embedUrl}
            title={`${title} ${interfaceCopy.media.videoIframeTitleSuffix}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : parsed.kind === 'direct' ? (
        <video
          src={parsed.embedUrl}
          controls
          preload="metadata"
          playsInline
          className="w-full rounded-xl bg-black aspect-video"
        />
      ) : (
        <a
          href={parsed.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span>{interfaceCopy.media.videoWatchExternalLabel}</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
