"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "covering" | "holding" | "revealing";

/**
 * Two-stage route transition:
 *   1. Intercept internal link clicks → cover viewport with a dark+accent curtain.
 *   2. When the curtain is fully covering, programmatically navigate via router.push.
 *   3. When the new route mounts (pathname changes), reveal the curtain upward.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const pending = useRef<string | null>(null);
  const lastPath = useRef(pathname);

  // Intercept clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as HTMLElement | null)?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (a.target && a.target !== "_self") return;

      let path = href;
      if (/^https?:\/\//.test(href)) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
          path = url.pathname + url.search + url.hash;
        } catch {
          return;
        }
      }

      const samePath = path.split("#")[0].split("?")[0] === pathname;
      if (samePath) return;

      e.preventDefault();
      pending.current = path;
      setStage("covering");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // When pathname changes while covered, start reveal.
  useEffect(() => {
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;
      if (stage === "holding") {
        // small beat to let new content paint
        const t = setTimeout(() => setStage("revealing"), 120);
        return () => clearTimeout(t);
      }
    }
  }, [pathname, stage]);

  return (
    <AnimatePresence>
      {stage !== "idle" && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[60] pointer-events-none"
          aria-hidden
        >
          {/* Base layer — ink sweep */}
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ y: "100%" }}
            animate={
              stage === "covering" || stage === "holding"
                ? { y: "0%" }
                : stage === "revealing"
                ? { y: "-100%" }
                : { y: "100%" }
            }
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            onAnimationComplete={() => {
              if (stage === "covering") {
                setStage("holding");
                const href = pending.current;
                pending.current = null;
                if (href) router.push(href);
              }
              if (stage === "revealing") {
                setStage("idle");
              }
            }}
          />

          {/* Offset accent layer for a theatrical feel */}
          <motion.div
            className="absolute inset-0 bg-accent"
            initial={{ y: "100%" }}
            animate={
              stage === "covering" || stage === "holding"
                ? { y: "0%" }
                : stage === "revealing"
                ? { y: "-100%" }
                : { y: "100%" }
            }
            transition={{
              duration: 0.7,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.08,
            }}
          />

          {/* Brand mark shown during hold */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "holding" ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <span
              className="serif text-3xl md:text-5xl"
              style={{ color: "var(--background)" }}
            >
              Easier<span className="italic">clinic</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
