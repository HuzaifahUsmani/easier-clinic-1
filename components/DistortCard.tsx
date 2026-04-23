"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Pricing/feature card with a CSS-perspective 3D tilt on hover, plus a
 * cursor-following spotlight. No WebGL needed — still feels "expensive".
 */
export default function DistortCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const smx = useSpring(mx, { stiffness: 120, damping: 18 });
  const smy = useSpring(my, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(smx, [0, 1], [-intensity, intensity]);

  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 200px at ${spotX.get()} ${spotY.get()}, rgba(255,255,255,0.12), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
