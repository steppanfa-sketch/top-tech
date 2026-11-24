import { Link } from 'react-router-dom';
import { Github, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { contactConfig, navigationConfig, servicesList, siteConfig } from '../lib/cms';
import { isValidExternalUrl } from '../lib/assets';
import { BrandLogo } from './BrandLogo';

function SocialIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  if (key.includes('linkedin')) return <Linkedin className="w-4 h-4" aria-hidden="true" />;
  if (key.includes('github')) return <Github className="w-4 h-4" aria-hidden="true" />;
  if (key.includes('x') || key.includes('twitter')) return <Twitter className="w-4 h-4" aria-hidden="true" />;
  if (key.includes('instagram')) return <Instagram className="w-4 h-4" aria-hidden="true" />;
  return <Globe className="w-4 h-4" aria-hidden="true" />;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#040813]/90 backdrop-blur-sm text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex">
              <BrandLogo />
            </Link>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {siteConfig.tagline}
            </p>
            <p className="text-sm leading-relaxed max-w-sm">
              {siteConfig.shortDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {contactConfig.socialLinks
                .filter((social) => isValidExternalUrl(social.url))
                .map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TOP TECH on ${social.platform}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] text-slate-600 dark:text-slate-300 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navigationConfig.headerLinks.map((link) => (
                <li key={link.label}>
                  {link.type === 'external' ? (
                    <a
                      href={link.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.target}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesList.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-sm font-semibold text-slate-950 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  {contactConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <a
                  href={`tel:${contactConfig.phone.replace(/[^+\d]/g, '')}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>{contactConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row — cleared from floating WhatsApp trigger across all viewports */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 pr-16 sm:pr-56 lg:pr-52 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-x-6 gap-y-3 text-xs">
          <p>
            &copy; {currentYear} {siteConfig.copyrightHolder}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navigationConfig.footerLegalLinks.map((item) => (
              <Link
                key={item.target}
                to={item.target}
                className="inline-flex min-h-[36px] items-center hover:text-slate-950 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
