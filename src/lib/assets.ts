/**
 * Resolves relative or root-relative asset paths safely for both root hosting
 * and GitHub Pages repository subpaths (via Vite's import.meta.env.BASE_URL).
 */
export function resolveAssetUrl(assetPath?: string): string {
  if (!assetPath) {
    return '';
  }

  const trimmed = assetPath.trim();
  if (!trimmed) {
    return '';
  }

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = trimmed.replace(/^\/+/, '').replace(/^public\//, '');

  return `${normalizedBase}${cleanPath}`;
}

export function isValidExternalUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return /^https?:\/\/.+/i.test(trimmed);
}

export interface ParsedVideoSource {
  kind: 'youtube' | 'vimeo' | 'direct' | 'external';
  embedUrl: string;
  originalUrl: string;
}

export function parseVideoEmbed(url?: string): ParsedVideoSource | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Support relative/uploaded video files as well as http/https external links
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return {
      kind: 'direct',
      embedUrl: isValidExternalUrl(trimmed) ? trimmed : resolveAssetUrl(trimmed),
      originalUrl: trimmed,
    };
  }

  if (!isValidExternalUrl(trimmed)) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./i, '').toLowerCase();

    // YouTube watch, short, shorts, or embed URLs
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      let videoId = parsed.searchParams.get('v') || '';
      if (!videoId && parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/')[2] || '';
      } else if (!videoId && parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/')[2] || '';
      }
      if (videoId && /^[\w-]{6,20}$/.test(videoId)) {
        return {
          kind: 'youtube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
          originalUrl: trimmed,
        };
      }
    }

    if (host === 'youtu.be') {
      const videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0];
      if (videoId && /^[\w-]{6,20}$/.test(videoId)) {
        return {
          kind: 'youtube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
          originalUrl: trimmed,
        };
      }
    }

    // Vimeo standard and player URLs
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const segments = parsed.pathname.split('/').filter(Boolean);
      const numericId = [...segments].reverse().find((seg) => /^\d+$/.test(seg));
      if (numericId) {
        return {
          kind: 'vimeo',
          embedUrl: `https://player.vimeo.com/video/${numericId}?dnt=1`,
          originalUrl: trimmed,
        };
      }
    }
  } catch {
    return null;
  }

  return {
    kind: 'external',
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}
