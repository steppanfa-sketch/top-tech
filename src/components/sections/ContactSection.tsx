import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { contactConfig, interfaceCopy, servicesList } from '../../lib/cms';
import { isValidExternalUrl } from '../../lib/assets';
import { useOrder } from '../../context/OrderContext';
import { MagneticButton } from '../effects/MagneticButton';

function SocialIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  if (key.includes('linkedin')) return <Linkedin className="w-4 h-4" aria-hidden="true" />;
  if (key.includes('github')) return <Github className="w-4 h-4" aria-hidden="true" />;
  if (key.includes('x') || key.includes('twitter')) return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.594l5.243 6.932zm-1.29 19.49h2.039L6.486 3.24H4.298z" /></svg>;
  if (key.includes('instagram')) return <Instagram className="w-4 h-4" aria-hidden="true" />;
  return <Globe className="w-4 h-4" aria-hidden="true" />;
}

type SubmitStatus = 'idle' | 'submitting' | 'sent' | 'unconfigured' | 'error';

export function ContactSection() {
  const { preselectedService } = useOrder();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(servicesList[0]?.name || 'Website Development');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mountedAt] = useState(() => Date.now());
  const [validationError, setValidationError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorDetail, setErrorDetail] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const hasEndpoint = isValidExternalUrl(contactConfig.formEndpoint);

  const validate = () => {
    if (!name.trim() || name.trim().length < 2) {
      return interfaceCopy.contactForm.validationName;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return interfaceCopy.contactForm.validationEmail;
    }
    if (phone.trim()) {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 7 || !/^[+\d\s().-]+$/.test(phone.trim())) {
        return interfaceCopy.contactForm.validationPhone;
      }
    }
    if (!message.trim() || message.trim().length < 10) {
      return interfaceCopy.contactForm.validationMessage;
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setErrorDetail('');

    // Silent honeypot and rapid-bot submission protection
    if (honeypot.trim().length > 0 || Date.now() - mountedAt < 1200) {
      setValidationError(interfaceCopy.contactForm.validationBot);
      return;
    }

    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }

    if (!hasEndpoint) {
      setSubmitStatus('unconfigured');
      return;
    }

    setSubmitStatus('submitting');
    try {
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        message: message.trim(),
        _gotcha: honeypot,
        subject: `${interfaceCopy.contactForm.emailSubjectPrefix} ${service}`,
      };

      if (contactConfig.formAccessKey?.trim()) {
        payload.access_key = contactConfig.formAccessKey.trim();
      }

      const response = await fetch(contactConfig.formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`${interfaceCopy.contactForm.submitFailedPrefix} (${response.status})`);
      }

      setSubmitStatus('sent');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setHoneypot('');
    } catch (err) {
      setSubmitStatus('error');
      setErrorDetail(
        err instanceof Error
          ? err.message
          : interfaceCopy.contactForm.submitNetworkError
      );
    }
  };

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    contactConfig.whatsappPrefill
  )}`;

  const prefilledWhatsappUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello TOP TECH,\nName: ${name || 'Visitor'}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nMessage: ${message}`
  )}`;

  const prefilledMailtoUrl = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${service}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService of Interest: ${service}\n\nMessage:\n${message}`
  )}`;

  return (
    <section className="py-16 sm:py-20 bg-white/80 dark:bg-[#070D1F]/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                {interfaceCopy.contactPage.channelsHeading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {interfaceCopy.contactPage.channelsSubtitle}
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>{interfaceCopy.contactPage.whatsappButtonLabel}</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1224] hover:border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>{interfaceCopy.contactPage.emailButtonLabel}</span>
                </a>
              </MagneticButton>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 mt-1 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-slate-950 dark:text-white">
                    {interfaceCopy.contactPage.emailLabel}
                  </p>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {contactConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 mt-1 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-slate-950 dark:text-white">
                    {interfaceCopy.contactPage.phoneLabel}
                  </p>
                  <a
                    href={`tel:${contactConfig.phone.replace(/[^+\d]/g, '')}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {contactConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-slate-950 dark:text-white">
                    {interfaceCopy.contactPage.locationLabel}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">{contactConfig.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 mt-1 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-slate-950 dark:text-white">
                    {interfaceCopy.contactPage.availabilityLabel}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">{contactConfig.availabilityNote}</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {contactConfig.socialLinks.some((social) => isValidExternalUrl(social.url)) && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {interfaceCopy.contactPage.socialHeading}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {contactConfig.socialLinks
                    .filter((social) => isValidExternalUrl(social.url))
                    .map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] px-3.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <SocialIcon platform={social.platform} />
                        <span>{social.platform}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1224] p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-slate-950 dark:text-white mb-6">
              {interfaceCopy.contactForm.heading}
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot field for spam bot mitigation */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-company-website">
                  {interfaceCopy.contactForm.honeypotLabel}
                </label>
                <input
                  id="contact-company-website"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {interfaceCopy.contactForm.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={interfaceCopy.contactForm.namePlaceholder}
                    className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B18] px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {interfaceCopy.contactForm.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={interfaceCopy.contactForm.emailPlaceholder}
                    className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B18] px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {interfaceCopy.contactForm.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={interfaceCopy.contactForm.phonePlaceholder}
                    className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B18] px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-service"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {interfaceCopy.contactForm.serviceLabel}
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B18] px-3.5 py-2.5 text-sm text-slate-950 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {servicesList.map((item) => (
                      <option key={item.slug} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                    <option value={interfaceCopy.contactForm.customServiceOption}>
                      {interfaceCopy.contactForm.customServiceOption}
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  {interfaceCopy.contactForm.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={interfaceCopy.contactForm.messagePlaceholder}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B18] px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {validationError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-red-300 dark:border-red-900/70 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{validationError}</span>
                </div>
              )}

              {submitStatus === 'sent' && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-lg border border-emerald-300 dark:border-emerald-900/70 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{interfaceCopy.contactForm.successMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  className="flex flex-col gap-3 rounded-lg border border-red-300 dark:border-red-900/70 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{errorDetail || interfaceCopy.contactForm.errorFallbackMessage}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={prefilledMailtoUrl}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                    >
                      {interfaceCopy.contactForm.fallbackEmailAppLabel}
                    </a>
                    <a
                      href={prefilledWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                    >
                      {interfaceCopy.contactForm.fallbackWhatsappLabel}
                    </a>
                  </div>
                </div>
              )}

              {submitStatus === 'unconfigured' && (
                <div
                  role="status"
                  className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/35 p-4 space-y-3 text-sm"
                >
                  <p className="font-medium text-slate-950 dark:text-white">
                    {interfaceCopy.contactForm.unconfiguredTitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {interfaceCopy.contactForm.unconfiguredDescription}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={prefilledMailtoUrl}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{interfaceCopy.contactForm.unconfiguredEmailLabel}</span>
                    </a>
                    <a
                      href={prefilledWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1224] px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white hover:border-blue-500/60 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <span>{interfaceCopy.contactForm.fallbackWhatsappLabel}</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {submitStatus === 'submitting'
                        ? interfaceCopy.contactForm.submittingLabel
                        : interfaceCopy.contactForm.submitLabel}
                    </span>
                  </button>
                </MagneticButton>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {hasEndpoint
                    ? interfaceCopy.contactForm.configuredHint
                    : interfaceCopy.contactForm.unconfiguredHint}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
