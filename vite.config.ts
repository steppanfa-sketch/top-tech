import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

interface JsonDoc {
  slug?: string;
  published?: boolean;
  siteUrl?: string;
}

function readJsonFiles(dirPath: string): JsonDoc[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8')) as JsonDoc;
      } catch {
        return null;
      }
    })
    .filter((doc): doc is JsonDoc => doc !== null);
}

export default defineConfig(() => {
  // Configurable base path for GitHub Pages repository deployment (e.g., VITE_BASE_PATH="/top-tech/")
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ if present so any custom local URLs like
      // "/src/assets/..." still resolve in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      // Generates up-to-date sitemap.xml & robots.txt in dist/ from all published CMS content.
      {
        name: 'generate-cms-seo-manifests',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) return;
          const distDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(distDir)) return;

          let siteUrl = '';
          const siteJsonPath = path.resolve(__dirname, 'src/content/site.json');
          if (fs.existsSync(siteJsonPath)) {
            try {
              const siteJson = JSON.parse(fs.readFileSync(siteJsonPath, 'utf-8')) as JsonDoc;
              siteUrl = (siteJson.siteUrl || '').trim().replace(/\/+$/, '');
            } catch {
              siteUrl = '';
            }
          }

          if (!siteUrl) {
            const envSite = (process.env.SITE_URL || '').trim().replace(/\/+$/, '');
            const normalizedBase = base.endsWith('/') ? base : `${base}/`;
            siteUrl = envSite
              ? `${envSite}${normalizedBase === '/' ? '' : normalizedBase.replace(/\/$/, '')}`
              : `https://toptech-agency.example${normalizedBase === '/' ? '' : normalizedBase.replace(/\/$/, '')}`;
          }

          const urlPrefix = `${siteUrl}/`;
          const today = new Date().toISOString().split('T')[0];

          const staticEntries = [
            {loc: `${urlPrefix}`, changefreq: 'weekly', priority: '1.0'},
            {loc: `${urlPrefix}#/about`, changefreq: 'monthly', priority: '0.8'},
            {loc: `${urlPrefix}#/services`, changefreq: 'weekly', priority: '0.9'},
            {loc: `${urlPrefix}#/projects`, changefreq: 'weekly', priority: '0.8'},
            {loc: `${urlPrefix}#/process`, changefreq: 'monthly', priority: '0.7'},
            {loc: `${urlPrefix}#/contact`, changefreq: 'monthly', priority: '0.8'},
          ];

          const services = readJsonFiles(path.resolve(__dirname, 'src/content/services'))
            .filter((s) => s.published !== false && s.slug)
            .map((s) => ({
              loc: `${urlPrefix}#/services/${s.slug}`,
              changefreq: 'monthly',
              priority: '0.8',
            }));

          const projects = readJsonFiles(path.resolve(__dirname, 'src/content/projects'))
            .filter((p) => p.published !== false && p.slug)
            .map((p) => ({
              loc: `${urlPrefix}#/projects/${p.slug}`,
              changefreq: 'monthly',
              priority: '0.7',
            }));

          const customPages = readJsonFiles(path.resolve(__dirname, 'src/content/pages'))
            .filter((p) => p.published !== false && p.slug)
            .map((p) => ({
              loc: `${urlPrefix}#/pages/${p.slug}`,
              changefreq: 'monthly',
              priority: '0.6',
            }));

          const allEntries = [...staticEntries, ...services, ...projects, ...customPages];
          const xmlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...allEntries.map(
              (e) =>
                `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
            ),
            '</urlset>',
            '',
          ];

          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xmlLines.join('\n'), 'utf-8');

          const robotsTxt = [
            'User-agent: *',
            'Allow: /',
            '',
            `Sitemap: ${urlPrefix}sitemap.xml`,
            '',
          ].join('\n');
          fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
