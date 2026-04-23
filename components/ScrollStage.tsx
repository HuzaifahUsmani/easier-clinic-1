"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * A pinned chapter. The inner content stays visible for the full scroll
 * height of the wrapper, with scroll progress (0 to 1) available to children
 * for building scroll-linked compositions.
 */
export function PinnedChapter({
  id,
  heightVh = 240,
  className = "",
  children,
}: {
  id?: string;
  heightVh?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

/**
 * Reveals its children in a clip-path wipe as it enters view.
 */
export function LineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits text into lines that rise into place as they enter view.
 */
export function RisingLines({
  lines,
  className = "",
  stagger = 0.08,
}: {
  lines: string[];
  className?: string;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export { useScroll, useTransform, motion };
