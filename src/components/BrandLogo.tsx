import { siteConfig } from '../lib/cms';
import { resolveAssetUrl } from '../lib/assets';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  const customLogo = resolveAssetUrl(siteConfig.logoUrl);

  if (customLogo) {
    return (
      <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
        <img
          src={customLogo}
          alt={siteConfig.brandName}
          referrerPolicy="no-referrer"
          className="h-8 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1.5"
          y="1.5"
          width="25"
          height="25"
          rx="6"
          className="stroke-blue-600 dark:stroke-blue-500"
          strokeWidth="1.75"
        />
        <path
          d="M7.5 9.5H20.5M14 9.5V20"
          className="stroke-slate-900 dark:stroke-white"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M18.5 14.5L21 17L18.5 19.5"
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">
        TOP <span className="text-blue-600 dark:text-blue-400">TECH</span>
      </span>
    </span>
  );
}
