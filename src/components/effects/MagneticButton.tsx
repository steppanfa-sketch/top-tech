import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMotionCapabilities } from '../../hooks/useMotionCapabilities';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 6,
}: MagneticButtonProps) {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.5 });

  const disabled = prefersReducedMotion || isTouchDevice;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType === 'touch') return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    rawX.set(Math.max(-1, Math.min(1, relX)) * strength);
    rawY.set(Math.max(-1, Math.min(1, relY)) * strength);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (disabled) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={wrapperRef}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
