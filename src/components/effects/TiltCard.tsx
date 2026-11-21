import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMotionCapabilities } from '../../hooks/useMotionCapabilities';
import { useTheme } from '../../context/ThemeContext';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 4.5,
}: TiltCardProps) {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 240, damping: 24, mass: 0.6 });
  const rotateY = useSpring(rawRotateY, { stiffness: 240, damping: 24, mass: 0.6 });

  const disabled = prefersReducedMotion || isTouchDevice;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const tiltY = (px - 0.5) * 2 * maxTilt;
    const tiltX = (0.5 - py) * 2 * maxTilt;

    rawRotateX.set(tiltX);
    rawRotateY.set(tiltY);

    if (sheenRef.current) {
      const sheenColor =
        theme === 'dark'
          ? 'rgba(59, 130, 246, 0.12)'
          : 'rgba(37, 99, 235, 0.06)';
      sheenRef.current.style.background = `radial-gradient(280px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, ${sheenColor}, transparent 75%)`;
    }
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType === 'touch') return;
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.div>
  );
}
