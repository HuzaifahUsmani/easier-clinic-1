"use client";

import { useEffect, useState } from "react";

type Palette = {
  background: string;
  paper: string;
  surface: string;
  foreground: string;
  ink: string;
  muted: string;
  rule: string;
  "rule-strong": string;
  accent: string;
  "accent-soft": string;
  warn: string;
  "warn-soft": string;
};

type Theme = {
  id: string;
  name: string;
  schema: string;
  rationale: string;
  palette: Palette;
};

const THEMES: Theme[] = [
  {
    id: "default",
    name: "Editorial Forest",
    schema: "Publication · Considered",
    rationale:
      "Cream + forest. Reads like a broadsheet — slow, quiet, premium. Best when the buyer wants to feel they are being advised, not sold to.",
    palette: {
      background: "#f5f1e8",
      paper: "#faf7f0",
      surface: "#ffffff",
      foreground: "#121212",
      ink: "#0a0a0a",
      muted: "#565248",
      rule: "#d9d2c0",
      "rule-strong": "#b4ac96",
      accent: "#1e4d3a",
      "accent-soft": "#e7ebe3",
      warn: "#b8472d",
      "warn-soft": "#f3e6df",
    },
  },
  {
    id: "clinical",
    name: "Clinical Navy",
    schema: "Authority · Institution",
    rationale:
      "Navy + bone. Hospital-grade, compliance-forward. Signals 'we know the rules' to owners nervous about Privacy Act and PHI handling.",
    palette: {
      background: "#f4f3ee",
      paper: "#fbfaf5",
      surface: "#ffffff",
      foreground: "#0f1a2a",
      ink: "#0a1424",
      muted: "#4a5565",
      rule: "#d8d9d4",
      "rule-strong": "#a8acae",
      accent: "#0f3555",
      "accent-soft": "#e3eaf0",
      warn: "#c2410c",
      "warn-soft": "#fbe7d8",
    },
  },
  {
    id: "sage",
    name: "Sage Apothecary",
    schema: "Calm · Wellness",
    rationale:
      "Sage + bone + clay. Feels industry-native for allied health and psychology — the tone of a modern wellness brand without being frivolous.",
    palette: {
      background: "#f1ece0",
      paper: "#f8f4ea",
      surface: "#ffffff",
      foreground: "#1d2420",
      ink: "#15201c",
      muted: "#5f655c",
      rule: "#d0cdbb",
      "rule-strong": "#a3a28f",
      accent: "#546b4c",
      "accent-soft": "#e5e7d9",
      warn: "#9e553a",
      "warn-soft": "#efdfd4",
    },
  },
  {
    id: "oxford",
    name: "Oxford Medical",
    schema: "Gravity · Journal",
    rationale:
      "Oxblood + warm white. Reads like The Lancet or a legal memo. Aggressive confidence for buyers who have been burned by generic agencies.",
    palette: {
      background: "#f7f3ec",
      paper: "#fbf8f2",
      surface: "#ffffff",
      foreground: "#1a1210",
      ink: "#120806",
      muted: "#58514c",
      rule: "#ddd4c7",
      "rule-strong": "#b2a795",
      accent: "#6e1e1e",
      "accent-soft": "#ede3e1",
      warn: "#8a5200",
      "warn-soft": "#f3e5cc",
    },
  },
  {
    id: "desert",
    name: "Desert Sandstone",
    schema: "Grounded · Australian",
    rationale:
      "Warm sand + terracotta. Locally-rooted, handmade feel. Good for independent multi-site groups that want a partner, not a vendor.",
    palette: {
      background: "#f4ead9",
      paper: "#fbf3e3",
      surface: "#ffffff",
      foreground: "#1e1a14",
      ink: "#120e08",
      muted: "#6b5e48",
      rule: "#d8c9aa",
      "rule-strong": "#a8956e",
      accent: "#7a3d1a",
      "accent-soft": "#efe1ca",
      warn: "#a1381f",
      "warn-soft": "#f2dcd2",
    },
  },
];

const STORAGE_KEY = "ec-theme";

function applyPalette(palette: Palette) {
  const root = document.documentElement;
  (Object.entries(palette) as [keyof Palette, string][]).forEach(([k, v]) => {
    root.style.setProperty(`--${k}`, v);
  });
}

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const theme = THEMES.find((t) => t.id === saved);
      if (theme) {
        setActive(saved);
        applyPalette(theme.palette);
      }
    }
  }, []);

  const choose = (id: string) => {
    const theme = THEMES.find((t) => t.id === id);
    if (!theme) return;
    setActive(id);
    applyPalette(theme.palette);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const current = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 border border-ink bg-background/95 backdrop-blur px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-ink hover:text-background transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        aria-expanded={open}
        aria-label="Theme picker"
      >
        <span
          className="inline-block w-3 h-3 border border-ink/30"
          style={{ background: current.palette.accent }}
          aria-hidden
        />
        <span>Theme · {current.name}</span>
      </button>

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
                        style={{ background: t.palette.background }}
                        aria-hidden
                      />
                      <span
                        className="block w-7 h-2"
                        style={{ background: t.palette.accent }}
                        aria-hidden
                      />
                      <span
                        className="block w-7 h-1"
                        style={{ background: t.palette.ink }}
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
