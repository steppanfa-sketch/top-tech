import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { resolveAssetUrl } from '../lib/assets';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SmartImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resolved = resolveAssetUrl(src);

  useEffect(() => {
    setHasError(false);
    setLoaded(false);
  }, [resolved]);

  if (!resolved || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center gap-2.5 overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-blue-50 dark:from-[#0B152E] dark:via-[#070E20] dark:to-[#0C1D42] text-slate-500 dark:text-slate-400 p-6 text-center ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <ImageIcon className="relative w-7 h-7 opacity-65" aria-hidden="true" />
        <span className="relative text-xs font-medium max-w-[24ch] opacity-85">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      sizes={sizes}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`bg-slate-200 dark:bg-[#0B152E] ${
        !loaded && !priority ? 'animate-pulse' : ''
      } ${className}`}
    />
  );
}
