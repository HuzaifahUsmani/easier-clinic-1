"use client";

import { useEffect, useState } from "react";

type Theme = {
  id: string;
  name: string;
  schema: string;
  rationale: string;
  accent: string;
  bg: string;
  ink: string;
};

const THEMES: Theme[] = [
  {
    id: "default",
    name: "Editorial Forest",
    schema: "Publication · Considered",
    rationale:
      "Cream + forest. Reads like a broadsheet — slow, quiet, premium. Best when the buyer wants to feel they are being advised, not sold to.",
    accent: "#1e4d3a",
    bg: "#f5f1e8",
    ink: "#0a0a0a",
  },
  {
    id: "clinical",
    name: "Clinical Navy",
    schema: "Authority · Institution",
    rationale:
      "Navy + bone. Hospital-grade, compliance-forward. Signals 'we know the rules' to owners nervous about Privacy Act and PHI handling.",
    accent: "#0f3555",
    bg: "#f4f3ee",
    ink: "#0a1424",
  },
  {
    id: "sage",
    name: "Sage Apothecary",
    schema: "Calm · Wellness",
    rationale:
      "Sage + bone + clay. Feels industry-native for allied health and psychology — the tone of a modern wellness brand without being frivolous.",
    accent: "#546b4c",
    bg: "#f1ece0",
    ink: "#15201c",
  },
  {
    id: "oxford",
    name: "Oxford Medical",
    schema: "Gravity · Journal",
    rationale:
      "Oxblood + warm white. Reads like The Lancet or a legal memo. Aggressive confidence for buyers who have been burned by generic agencies.",
    accent: "#6e1e1e",
    bg: "#f7f3ec",
    ink: "#120806",
  },
  {
    id: "desert",
    name: "Desert Sandstone",
    schema: "Grounded · Australian",
    rationale:
      "Warm sand + terracotta. Locally-rooted, handmade feel. Good for independent multi-site groups that want a partner, not a vendor.",
    accent: "#7a3d1a",
    bg: "#f4ead9",
    ink: "#120e08",
  },
];

const STORAGE_KEY = "ec-theme";

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("default");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some((t) => t.id === saved)) {
      setActive(saved);
      apply(saved);
    }
  }, []);

  const apply = (id: string) => {
    const root = document.documentElement;
    if (id === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", id);
    }
  };

  const choose = (id: string) => {
    setActive(id);
    apply(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const current = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 border border-ink bg-background/95 backdrop-blur px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-ink hover:text-background transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        aria-expanded={open}
        aria-label="Theme picker"
      >
        <span
          className="inline-block w-3 h-3 border border-ink/30"
          style={{ background: current.accent }}
          aria-hidden
        />
        <span>Theme · {current.name}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-40 w-[min(380px,calc(100vw-2.5rem))] bg-background border border-ink shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
          role="dialog"
          aria-label="Select theme"
        >
          <div className="px-5 py-4 border-b border-rule-strong flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest">
              Color psychology · preview
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-mono text-muted hover:text-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <ul className="divide-y divide-rule max-h-[70vh] overflow-y-auto">
            {THEMES.map((t) => {
              const isActive = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    className={`w-full text-left px-5 py-4 grid grid-cols-[auto_1fr] gap-4 items-start transition-colors ${
                      isActive ? "bg-paper" : "hover:bg-paper/60"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <span
                        className="block w-7 h-7 border border-ink/20"
                        style={{ background: t.bg }}
                        aria-hidden
                      />
                      <span
                        className="block w-7 h-2"
                        style={{ background: t.accent }}
                        aria-hidden
                      />
                      <span
                        className="block w-7 h-1"
                        style={{ background: t.ink }}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="serif text-base">{t.name}</span>
                        {isActive && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11px] font-mono uppercase tracking-widest text-muted">
                        {t.schema}
                      </div>
                      <p className="mt-2 text-xs text-muted leading-relaxed">
                        {t.rationale}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="px-5 py-3 border-t border-rule-strong text-[10px] font-mono uppercase tracking-widest text-muted">
            Choice saves to this browser only.
          </div>
        </div>
      )}
    </>
  );
}
