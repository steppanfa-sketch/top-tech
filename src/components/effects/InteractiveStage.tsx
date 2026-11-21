import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useMotionCapabilities } from '../../hooks/useMotionCapabilities';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  colorIndex: number;
  alpha: number;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const DARK_COLORS = [
  '59, 130, 246', // Electric blue
  '34, 211, 238', // Cyan
  '139, 92, 246', // Violet
];

const LIGHT_COLORS = [
  '37, 99, 235', // Cobalt blue
  '14, 165, 233', // Sky blue
  '99, 102, 241', // Indigo/violet
];

export function InteractiveStage() {
  const { theme } = useTheme();
  const { prefersReducedMotion, isTouchDevice, isPageVisible } = useMotionCapabilities();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const followerRingRef = useRef<HTMLDivElement>(null);

  const themeRef = useRef(theme);
  const isHomeRef = useRef(isHomePage);
  const reducedMotionRef = useRef(prefersReducedMotion);
  const touchRef = useRef(isTouchDevice);
  const visibleRef = useRef(isPageVisible);

  themeRef.current = theme;
  isHomeRef.current = isHomePage;
  reducedMotionRef.current = prefersReducedMotion;
  touchRef.current = isTouchDevice;
  visibleRef.current = isPageVisible;

  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fxCanvas = fxCanvasRef.current;
    if (!bgCanvas || !fxCanvas) return;

    const bgCtx = bgCanvas.getContext('2d');
    const fxCtx = fxCanvas.getContext('2d');
    if (!bgCtx || !fxCtx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = {
      x: width * 0.5,
      y: height * 0.35,
      lastTrailX: width * 0.5,
      lastTrailY: height * 0.35,
      active: false,
      hoveringInteractive: false,
    };

    const smoothSpotlight = { x: width * 0.5, y: height * 0.35 };
    const smoothDot = { x: width * 0.5, y: height * 0.35, opacity: 0 };
    const smoothRing = { x: width * 0.5, y: height * 0.35, scale: 1, opacity: 0 };

    let particles: Particle[] = [];
    const trailParticles: TrailParticle[] = [];
    const ripples: Ripple[] = [];
    let rafId: number | null = null;

    const hideCursorOverlays = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (followerRingRef.current) followerRingRef.current.style.opacity = '0';
    };

    const createParticles = () => {
      const area = width * height;
      const isMobile = width < 768;
      const densityDivisor = isMobile ? 34000 : isHomeRef.current ? 24000 : 31000;
      const maxCount = isMobile ? 24 : isHomeRef.current ? 56 : 40;
      const minCount = isMobile ? 14 : 24;
      const targetCount = Math.max(minCount, Math.min(maxCount, Math.floor(area / densityDivisor)));

      particles = Array.from({ length: targetCount }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.14 + Math.random() * 0.28;
        const baseVx = Math.cos(angle) * speed;
        const baseVy = Math.sin(angle) * speed;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: 1.2 + Math.random() * 1.6,
          colorIndex: index % 3,
          alpha: 0.35 + Math.random() * 0.45,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      bgCanvas.width = Math.floor(width * dpr);
      bgCanvas.height = Math.floor(height * dpr);
      bgCanvas.style.width = `${width}px`;
      bgCanvas.style.height = `${height}px`;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fxCanvas.width = Math.floor(width * dpr);
      fxCanvas.height = Math.floor(height * dpr);
      fxCanvas.style.width = `${width}px`;
      fxCanvas.style.height = `${height}px`;
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    resize();

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || touchRef.current) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (!reducedMotionRef.current && trailParticles.length < 3) {
        const dx = pointer.x - pointer.lastTrailX;
        const dy = pointer.y - pointer.lastTrailY;
        if (dx * dx + dy * dy > 324) {
          const isDark = themeRef.current === 'dark';
          const color = isDark
            ? trailParticles.length % 2 === 0
              ? '59, 130, 246'
              : '34, 211, 238'
            : '37, 99, 235';

          trailParticles.push({
            x: pointer.x,
            y: pointer.y,
            vx: -dx * 0.02 + (Math.random() - 0.5) * 0.25,
            vy: -dy * 0.02 + (Math.random() - 0.5) * 0.25,
            radius: 1.8,
            alpha: isDark ? 0.65 : 0.38,
            color,
          });
          pointer.lastTrailX = pointer.x;
          pointer.lastTrailY = pointer.y;
        }
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.hoveringInteractive = false;
    };

    const onMouseOver = (event: MouseEvent) => {
      if (touchRef.current) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;
      pointer.hoveringInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], [role="tab"], input, select, textarea, [data-interactive]'
        )
      );
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotionRef.current || event.pointerType === 'touch' || touchRef.current) return;
      const isDark = themeRef.current === 'dark';
      const palette = isDark ? ['59, 130, 246', '139, 92, 246'] : ['37, 99, 235', '99, 102, 241'];
      const color = palette[Math.floor(Math.random() * palette.length)];
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        radius: 5,
        maxRadius: 38,
        alpha: isDark ? 0.36 : 0.22,
        color,
      });
      if (ripples.length > 4) {
        ripples.shift();
      }
    };

    const drawStaticFrame = () => {
      const isDark = themeRef.current === 'dark';
      const palette = isDark ? DARK_COLORS : LIGHT_COLORS;
      const lineOpacityBase = isDark ? (isHomeRef.current ? 0.14 : 0.09) : 0.07;

      bgCtx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const rgb = palette[p.colorIndex];
        const pointAlpha = isDark ? p.alpha * 0.7 : p.alpha * 0.38;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 15625) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 125) * lineOpacityBase;
            bgCtx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            bgCtx.lineWidth = 0.8;
            bgCtx.beginPath();
            bgCtx.moveTo(p.x, p.y);
            bgCtx.lineTo(p2.x, p2.y);
            bgCtx.stroke();
          }
        }

        bgCtx.fillStyle = `rgba(${rgb}, ${pointAlpha.toFixed(3)})`;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        bgCtx.fill();
      }
      fxCtx.clearRect(0, 0, width, height);
      hideCursorOverlays();
    };

    const tick = () => {
      if (!visibleRef.current) {
        rafId = null;
        return;
      }

      if (reducedMotionRef.current) {
        drawStaticFrame();
        rafId = null;
        return;
      }

      const isDark = themeRef.current === 'dark';
      const isHome = isHomeRef.current;
      const palette = isDark ? DARK_COLORS : LIGHT_COLORS;
      const maxConnectDist = width < 768 ? 95 : 130;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const lineOpacityBase = isDark ? (isHome ? 0.18 : 0.11) : isHome ? 0.085 : 0.055;
      const particleOpacityScale = isDark ? (isHome ? 0.85 : 0.58) : isHome ? 0.42 : 0.28;

      bgCtx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (pointer.active && !touchRef.current) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;
          const interactRadius = 155;
          if (distSq < interactRadius * interactRadius && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / interactRadius) * 0.04;
            if (dist < 44) {
              p.vx -= (dx / dist) * force * 1.35;
              p.vy -= (dy / dist) * force * 1.35;
            } else {
              p.vx += (dx / dist) * force * 0.5;
              p.vy += (dy / dist) * force * 0.5;
            }
          }
        }

        p.vx += (p.baseVx - p.vx) * 0.025;
        p.vy += (p.baseVy - p.vy) * 0.025;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -16) p.x = width + 16;
        if (p.x > width + 16) p.x = -16;
        if (p.y < -16) p.y = height + 16;
        if (p.y > height + 16) p.y = -16;

        const rgb = palette[p.colorIndex];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * lineOpacityBase;
            bgCtx.strokeStyle = `rgba(${rgb}, ${lineAlpha.toFixed(3)})`;
            bgCtx.lineWidth = 0.85;
            bgCtx.beginPath();
            bgCtx.moveTo(p.x, p.y);
            bgCtx.lineTo(p2.x, p2.y);
            bgCtx.stroke();
          }
        }

        const coreAlpha = p.alpha * particleOpacityScale;
        if (isDark && isHome) {
          bgCtx.fillStyle = `rgba(${rgb}, ${(coreAlpha * 0.2).toFixed(3)})`;
          bgCtx.beginPath();
          bgCtx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          bgCtx.fill();
        }

        bgCtx.fillStyle = `rgba(${rgb}, ${coreAlpha.toFixed(3)})`;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        bgCtx.fill();
      }

      if (pointer.active && !touchRef.current) {
        const cursorRgb = palette[0];
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 16900) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 130) * (isDark ? 0.18 : 0.08);
            bgCtx.strokeStyle = `rgba(${cursorRgb}, ${alpha.toFixed(3)})`;
            bgCtx.lineWidth = 0.75;
            bgCtx.beginPath();
            bgCtx.moveTo(p.x, p.y);
            bgCtx.lineTo(pointer.x, pointer.y);
            bgCtx.stroke();
          }
        }
      }

      // Render subtle max-3 trail particles + restrained click ripples on fxCanvas
      fxCtx.clearRect(0, 0, width, height);

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const tp = trailParticles[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha *= 0.84;
        tp.radius *= 0.96;

        if (tp.alpha < 0.03) {
          trailParticles.splice(i, 1);
          continue;
        }

        fxCtx.fillStyle = `rgba(${tp.color}, ${tp.alpha.toFixed(3)})`;
        fxCtx.beginPath();
        fxCtx.arc(tp.x, tp.y, tp.radius, 0, Math.PI * 2);
        fxCtx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.14 + 0.85;
        ripple.alpha *= 0.9;

        if (ripple.alpha < 0.015 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        fxCtx.strokeStyle = `rgba(${ripple.color}, ${ripple.alpha.toFixed(3)})`;
        fxCtx.lineWidth = 1.25;
        fxCtx.beginPath();
        fxCtx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        fxCtx.stroke();
      }

      if (!touchRef.current) {
        // Ultra-subtle ambient spotlight (130px radius max)
        smoothSpotlight.x += (pointer.x - smoothSpotlight.x) * 0.12;
        smoothSpotlight.y += (pointer.y - smoothSpotlight.y) * 0.12;

        // Crisp 5px main neon cursor dot
        smoothDot.x += (pointer.x - smoothDot.x) * 0.72;
        smoothDot.y += (pointer.y - smoothDot.y) * 0.72;
        smoothDot.opacity += ((pointer.active ? 1 : 0) - smoothDot.opacity) * 0.28;

        // Smooth 24px follower ring that expands cleanly on interactive hover
        smoothRing.x += (pointer.x - smoothRing.x) * 0.18;
        smoothRing.y += (pointer.y - smoothRing.y) * 0.18;
        const targetScale = pointer.hoveringInteractive ? 1.52 : 1;
        const targetOpacity = pointer.active ? (pointer.hoveringInteractive ? 0.95 : 0.75) : 0;
        smoothRing.scale += (targetScale - smoothRing.scale) * 0.18;
        smoothRing.opacity += (targetOpacity - smoothRing.opacity) * 0.18;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${smoothSpotlight.x}px, ${smoothSpotlight.y}px, 0) translate(-50%, -50%)`;
          spotlightRef.current.style.opacity = pointer.active ? '1' : '0';
        }

        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${smoothDot.x}px, ${smoothDot.y}px, 0) translate(-50%, -50%)`;
          cursorDotRef.current.style.opacity = smoothDot.opacity.toFixed(3);
        }

        if (followerRingRef.current) {
          followerRingRef.current.style.transform = `translate3d(${smoothRing.x}px, ${smoothRing.y}px, 0) translate(-50%, -50%) scale(${smoothRing.scale.toFixed(3)})`;
          followerRingRef.current.style.opacity = smoothRing.opacity.toFixed(3);
        }
      } else {
        hideCursorOverlays();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null && visibleRef.current) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    redrawRef.current = () => {
      if (reducedMotionRef.current) {
        drawStaticFrame();
      } else {
        startLoop();
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        startLoop();
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    startLoop();

    return () => {
      redrawRef.current = null;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    redrawRef.current?.();
  }, [prefersReducedMotion, theme, isHomePage, isPageVisible]);

  return (
    <>
      {/* Background Ambient Stage (z-0, behind translucent sections) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Subtle Animated Architectural Grid */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHomePage
              ? 'opacity-[0.04] dark:opacity-[0.065]'
              : 'opacity-[0.025] dark:opacity-[0.04]'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Slow-Moving Ambient Gradient Orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={
                isPageVisible
                  ? { x: [0, 32, 0], y: [0, -24, 0], scale: [1, 1.06, 1] }
                  : undefined
              }
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute -top-40 right-[8%] h-[460px] w-[460px] rounded-full blur-3xl ${
                theme === 'dark'
                  ? isHomePage
                    ? 'bg-blue-600/18'
                    : 'bg-blue-600/10'
                  : isHomePage
                  ? 'bg-blue-400/14'
                  : 'bg-blue-400/8'
              }`}
            />
            <motion.div
              animate={
                isPageVisible
                  ? { x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }
                  : undefined
              }
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute top-[42%] -left-36 h-[420px] w-[420px] rounded-full blur-3xl ${
                theme === 'dark'
                  ? isHomePage
                    ? 'bg-violet-600/14'
                    : 'bg-violet-600/8'
                  : isHomePage
                  ? 'bg-sky-400/12'
                  : 'bg-sky-400/7'
              }`}
            />
            <motion.div
              animate={
                isPageVisible
                  ? { x: [0, 24, 0], y: [0, 18, 0] }
                  : undefined
              }
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute -bottom-36 right-[22%] h-[380px] w-[380px] rounded-full blur-3xl ${
                theme === 'dark'
                  ? isHomePage
                    ? 'bg-cyan-500/12'
                    : 'bg-cyan-500/7'
                  : isHomePage
                  ? 'bg-indigo-400/10'
                  : 'bg-indigo-400/6'
              }`}
            />
          </>
        )}

        {/* Background HTML5 Canvas Particle Constellation */}
        <canvas ref={bgCanvasRef} className="absolute inset-0 block" />
      </div>

      {/* Minimal Neon Cursor Overlay (z-30, strictly pointer-events-none, preserves native cursor) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {/* Ultra-Subtle Micro Cursor Spotlight (130px max radius) */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 rounded-full transition-opacity duration-200 will-change-transform"
          style={{
            width: '260px',
            height: '260px',
            opacity: 0,
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(59,130,246,0.065) 0%, rgba(34,211,238,0.025) 45%, transparent 72%)'
                : 'radial-gradient(circle, rgba(37,99,235,0.035) 0%, rgba(99,102,241,0.015) 45%, transparent 72%)',
          }}
        />

        {/* Minimal Neon Follower Ring (24px diameter, expands subtly on hover) */}
        <div
          ref={followerRingRef}
          className={`absolute top-0 left-0 rounded-full will-change-transform ${
            theme === 'dark'
              ? 'border border-cyan-400/55 shadow-[0_0_10px_rgba(34,211,238,0.22)]'
              : 'border border-blue-600/40 shadow-[0_0_6px_rgba(37,99,235,0.12)]'
          }`}
          style={{
            width: '24px',
            height: '24px',
            opacity: 0,
          }}
        />

        {/* Main 5px Glowing Cursor Indicator Dot */}
        <div
          ref={cursorDotRef}
          className={`absolute top-0 left-0 rounded-full will-change-transform ${
            theme === 'dark'
              ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.85)]'
              : 'bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.45)]'
          }`}
          style={{
            width: '5px',
            height: '5px',
            opacity: 0,
          }}
        />

        {/* Subtle Trail Particles (max 3) & Click Ripples Canvas */}
        <canvas ref={fxCanvasRef} className="absolute inset-0 block" />
      </div>
    </>
  );
}
