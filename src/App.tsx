import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { OrderProvider } from './context/OrderContext';
import { useMotionCapabilities } from './hooks/useMotionCapabilities';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { OrderFallbackModal } from './components/OrderFallbackModal';
import { InteractiveStage } from './components/effects/InteractiveStage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { CustomPage } from './pages/CustomPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pages/:slug" element={<CustomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const duration = prefersReducedMotion ? 220 : 820;
    const timer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <OrderProvider>
          <HashRouter>
            <LoadingScreen visible={isInitialLoading} />
            <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#050A18] dark:text-slate-100">
              <InteractiveStage />
              <Navbar />
              <main className="relative z-10 flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
              <FloatingWhatsAppButton />
              <OrderFallbackModal />
            </div>
          </HashRouter>
        </OrderProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
