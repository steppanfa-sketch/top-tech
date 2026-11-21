import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from './cms';
import { resolveAssetUrl } from './assets';

interface UseSeoOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function upsertMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function buildCanonicalUrl(pathname: string): string {
  const configuredSiteUrl = siteConfig.siteUrl?.trim().replace(/\/+$/, '');
  const hashSuffix = pathname === '/' ? '' : `#${pathname}`;

  if (configuredSiteUrl) {
    return `${configuredSiteUrl}/${hashSuffix}`;
  }

  const origin = window.location.origin;
  const basePath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  return `${origin}${basePath}${hashSuffix}`;
}

export function useSeo({
  title,
  description,
  ogImage,
  type = 'website',
  noindex = false,
  schema,
}: UseSeoOptions) {
  const location = useLocation();

  useEffect(() => {
    const finalTitle = title || siteConfig.defaultSeo.title;
    const finalDescription = description || siteConfig.defaultSeo.description;
    const canonicalUrl = buildCanonicalUrl(location.pathname);

    const resolvedImagePath = resolveAssetUrl(ogImage || siteConfig.defaultSeo.ogImage);
    const absoluteOgImage = resolvedImagePath
      ? resolvedImagePath.startsWith('http')
        ? resolvedImagePath
        : `${window.location.origin}${resolvedImagePath}`
      : '';

    document.title = finalTitle;

    upsertMetaTag('name', 'description', finalDescription);
    upsertMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMetaTag('property', 'og:type', type);
    upsertMetaTag('property', 'og:site_name', siteConfig.brandName);
    upsertMetaTag('property', 'og:title', finalTitle);
    upsertMetaTag('property', 'og:description', finalDescription);
    upsertMetaTag('property', 'og:url', canonicalUrl);

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', finalTitle);
    upsertMetaTag('name', 'twitter:description', finalDescription);

    if (absoluteOgImage) {
      upsertMetaTag('property', 'og:image', absoluteOgImage);
      upsertMetaTag('name', 'twitter:image', absoluteOgImage);
    }

    upsertLinkTag('canonical', canonicalUrl);

    if (siteConfig.faviconUrl?.trim()) {
      const customFavicon = resolveAssetUrl(siteConfig.faviconUrl);
      if (customFavicon) {
        upsertLinkTag('icon', customFavicon);
      }
    }

    const scriptId = 'toptech-route-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const defaultSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.brandName,
        url: buildCanonicalUrl('/'),
      },
    };

    const finalSchema = schema
      ? Array.isArray(schema)
        ? schema
        : { '@context': 'https://schema.org', ...schema, url: canonicalUrl }
      : defaultSchema;

    scriptEl.textContent = JSON.stringify(finalSchema);
  }, [title, description, ogImage, type, noindex, schema, location.pathname]);
}
