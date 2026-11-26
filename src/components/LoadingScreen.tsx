import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { interfaceCopy, siteConfig } from '../lib/cms';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { BrandLogo } from './BrandLogo';

interface LoadingScreenProps {
  visible: boolean;
}

export function LoadingScreen({ visible }: LoadingScreenProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!visible || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particles = Array.from({ length: 18 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 18;
      return {
        x: width * 0.5 + Math.cos(angle) * (80 + Math.random() * 140),
        y: height * 0.5 + Math.sin(angle) * (60 + Math.random() * 120),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.2 + Math.random() * 1.4,
        alpha: 0.35 + Math.random() * 0.4,
        color: i % 2 === 0 ? '59, 130, 246' : '34, 211, 238',
      };
    });

    let rafId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18000) {
            const alpha = (1 - Math.sqrt(distSq) / 134) * 0.16;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = window.requestAnimationFrame(draw);
    };

    rafId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [visible, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toptech-loader"
          role="status"
          aria-live="polite"
          aria-label={interfaceCopy.loadingScreen.ariaLabel}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050A18] px-6 select-none"
        >
          {!prefersReducedMotion && (
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block"
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-500/12 dark:bg-blue-600/18 blur-3xl"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center space-y-5"
          >
            <div className="scale-125 sm:scale-[1.35]">
              <BrandLogo />
            </div>

            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-blue-600 dark:text-blue-400">
              {siteConfig.tagline}
            </p>

            <div className="w-44 h-[2px] rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 0.72,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
