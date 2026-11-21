import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { navigationConfig, servicesList, siteConfig } from '../lib/cms';
import { isValidExternalUrl } from '../lib/assets';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';
import { DynamicIcon } from './DynamicIcon';
import { MagneticButton } from './effects/MagneticButton';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isRouteActive = (target: string) => {
    if (target === '/') return location.pathname === '/';
    return location.pathname === target || location.pathname.startsWith(`${target}/`);
  };

  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const scheduleCloseDropdown = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 140);
  };

  const hasExternalStartUrl = isValidExternalUrl(siteConfig.startProjectUrl);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#050A18]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-white/75 dark:bg-[#050A18]/75 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md py-1"
          aria-label="TOP TECH Home"
        >
          <BrandLogo />
        </Link>

        {/* Zone 2: Clean Multi-Page Navigation Links with Services Dropdown */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {navigationConfig.headerLinks.map((link) => {
            if (link.type === 'services-dropdown') {
              const active = isRouteActive('/services');
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative flex items-center"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      to={link.target}
                      className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm ${
                        active
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active-underline"
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        />
                      )}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="menu"
                      aria-label="Toggle services menu"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      className={`p-1 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        active
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        role="menu"
                        className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1224] shadow-xl p-2 z-50"
                      >
                        <Link
                          to="/services"
                          role="menuitem"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <span>All Services Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                        <div className="my-1.5 h-px bg-slate-200 dark:bg-slate-800" />
                        <div className="space-y-0.5">
                          {servicesList.map((service) => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              role="menuitem"
                              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                location.pathname === `/services/${service.slug}`
                                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-medium'
                                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                              }`}
                            >
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                                <DynamicIcon name={service.icon} className="w-3.5 h-3.5" />
                              </span>
                              <span className="truncate">{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.type === 'external') {
              return (
                <a
                  key={link.label}
                  href={link.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              );
            }

            const active = isRouteActive(link.target);
            return (
              <Link
                key={link.label}
                to={link.target}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm ${
                  active
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Get Started CTA (md+) + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] text-slate-700 dark:text-slate-200 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <div className="hidden md:inline-flex">
            {hasExternalStartUrl ? (
              <MagneticButton>
                <a
                  href={siteConfig.startProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050A18]"
                >
                  <span>{siteConfig.getStartedLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </MagneticButton>
            ) : (
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050A18]"
                >
                  <span>{siteConfig.getStartedLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </MagneticButton>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] text-slate-800 dark:text-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070D1F] max-h-[82vh] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-4 pt-4 pb-6 flex flex-col gap-1">
              {navigationConfig.headerLinks.map((link) => {
                if (link.type === 'services-dropdown') {
                  const active = isRouteActive('/services');
                  return (
                    <div key={link.label} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to="/services"
                          className={`flex min-h-[44px] flex-1 items-center rounded-lg px-3 text-base font-medium transition-colors ${
                            active
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          aria-expanded={mobileServicesOpen}
                          aria-label="Expand service pages"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4 space-y-1"
                          >
                            {servicesList.map((service) => (
                              <Link
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                className={`flex min-h-[40px] items-center gap-2.5 rounded-lg px-3 text-sm transition-colors ${
                                  location.pathname === `/services/${service.slug}`
                                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/70 dark:bg-blue-950/40'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                }`}
                              >
                                <DynamicIcon name={service.icon} className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{service.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.type === 'external') {
                  return (
                    <a
                      key={link.label}
                      href={link.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    >
                      {link.label}
                    </a>
                  );
                }

                const active = isRouteActive(link.target);
                return (
                  <Link
                    key={link.label}
                    to={link.target}
                    className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
                {hasExternalStartUrl ? (
                  <a
                    href={siteConfig.startProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <span>{siteConfig.getStartedLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <span>{siteConfig.getStartedLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
