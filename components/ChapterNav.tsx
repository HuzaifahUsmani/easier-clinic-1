"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "ch-01", label: "The hook" },
  { id: "ch-02", label: "A week with us" },
  { id: "ch-03", label: "Your number" },
  { id: "ch-04", label: "The thesis" },
  { id: "ch-05", label: "The field" },
  { id: "ch-06", label: "Begin" },
];

export default function ChapterNav() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);

      let current = 0;
      for (let i = 0; i < chapters.length; i++) {
        const el = document.getElementById(chapters[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.45) current = i;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-16 left-0 h-px bg-ink z-40 pointer-events-none"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Side chapter nav (desktop) */}
      <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 pointer-events-none">
        {chapters.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.id}
              onClick={() => {
                document
                  .getElementById(c.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group flex items-center gap-3 pointer-events-auto"
              aria-label={`Go to chapter ${i + 1}`}
            >
              <span
                className={`tabular-nums text-xs transition-colors ${
                  isActive ? "text-ink" : "text-muted/50"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`block h-px transition-all ${
                  isActive ? "w-10 bg-ink" : "w-4 bg-rule-strong"
                }`}
              />
              <span
                className={`text-xs serif italic whitespace-nowrap transition-all ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
