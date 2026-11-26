import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { contactConfig, interfaceCopy } from '../lib/cms';
import { useSeo } from '../lib/seo';
import { useOrder } from '../context/OrderContext';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/sections/ContactSection';

interface ContactLocationState {
  service?: string;
}

export function ContactPage() {
  const location = useLocation();
  const { setPreselectedService } = useOrder();

  useSeo({
    title: contactConfig.seo?.title || interfaceCopy.contactPage.fallbackSeoTitle,
    description: contactConfig.seo?.description,
    ogImage: contactConfig.seo?.ogImage,
    schema: {
      '@type': 'ContactPage',
      name: contactConfig.seo?.title || interfaceCopy.contactPage.fallbackSeoTitle,
      description: contactConfig.seo?.description,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const state = location.state as ContactLocationState | null;
    if (state?.service) {
      setPreselectedService(state.service);
    }
  }, [location.state, setPreselectedService]);

  return (
    <div>
      <PageHeader
        kicker={contactConfig.kicker}
        headline={contactConfig.title}
        subtitle={contactConfig.subtitle}
      />
      <ContactSection />
    </div>
  );
}
