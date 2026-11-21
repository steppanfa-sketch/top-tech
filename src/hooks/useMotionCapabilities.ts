import { useEffect, useState } from 'react';

export interface MotionCapabilities {
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
  isPageVisible: boolean;
}

export function useMotionCapabilities(): MotionCapabilities {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const noHover = window.matchMedia?.('(hover: none)').matches ?? false;
    return coarse || noHover;
  });

  const [isPageVisible, setIsPageVisible] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return document.visibilityState !== 'hidden';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onPointerChange = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const noHover = window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(coarse || noHover);
    };
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState !== 'hidden');
    };

    motionQuery.addEventListener('change', onMotionChange);
    pointerQuery.addEventListener('change', onPointerChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      pointerQuery.removeEventListener('change', onPointerChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return { prefersReducedMotion, isTouchDevice, isPageVisible };
}
