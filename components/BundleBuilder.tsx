"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Module = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  setup: number;
  requires?: string[];
};

const MODULES: Module[] = [
  {
    id: "va-part",
    name: "Virtual assistants — 40 hrs/mo",
    tagline: "Reception, recalls, billing admin. One dedicated VA, AU-led.",
    monthly: 1800,
    setup: 800,
  },
  {
    id: "va-full",
    name: "Virtual assistants — 120 hrs/mo",
    tagline: "Upgrade tier. Full daily coverage across two practitioners.",
    monthly: 3800,
    setup: 1200,
  },
  {
    id: "clickup",
    name: "ClickUp workspace",
    tagline: "Real workflows for intake, recall, team ops and marketing.",
    monthly: 600,
    setup: 3200,
  },
  {
    id: "automation-5",
    name: "Automation — 5 flows",
    tagline: "Make/Zapier/n8n. Booking → PMS → accounting → marketing.",
    monthly: 400,
    setup: 1800,
  },
  {
    id: "automation-15",
    name: "Automation — 15 flows",
    tagline: "Full automation suite across every system. Upgrade tier.",
    monthly: 850,
    setup: 4800,
  },
  {
    id: "dashboards-core",
    name: "Core dashboard",
    tagline: "Looker Studio: no-shows, utilisation, revenue per visit.",
    monthly: 350,
    setup: 1900,
  },
  {
    id: "dashboards-exec",
    name: "Executive dashboard suite",
    tagline: "Multi-practitioner, multi-site, with scheduled weekly reports.",
    monthly: 900,
    setup: 5200,
  },
  {
    id: "api-pipeline",
    name: "API / warehouse pipeline",
    tagline: "BigQuery sync from PMS + accounting + marketing. Full historical.",
    monthly: 1200,
    setup: 6500,
    requires: ["dashboards-exec"],
  },
  {
    id: "qbr",
    name: "Quarterly business review",
    tagline: "90-day ops review + roadmap update. On-site if metro.",
    monthly: 450,
    setup: 0,
  },
];

// Conflicts: can only pick one VA tier, one automation tier, one dashboard tier
const CONFLICTS: Record<string, string[]> = {
  "va-part": ["va-full"],
  "va-full": ["va-part"],
  "automation-5": ["automation-15"],
  "automation-15": ["automation-5"],
  "dashboards-core": ["dashboards-exec"],
  "dashboards-exec": ["dashboards-core"],
};

const fmt = (n: number) => "$" + n.toLocaleString("en-AU");

export default function BundleBuilder() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "va-part": true,
    clickup: true,
    "automation-5": true,
    "dashboards-core": true,
    qbr: true,
  });

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id] && CONFLICTS[id]) {
        CONFLICTS[id].forEach((c) => (next[c] = false));
      }
      // Enforce requires
      Object.keys(next).forEach((key) => {
        const mod = MODULES.find((m) => m.id === key);
        if (mod?.requires && next[key]) {
          const missing = mod.requires.some((r) => !next[r]);
          if (missing) next[key] = false;
        }
      });
      return next;
    });
  };

  const chosen = useMemo(
    () => MODULES.filter((m) => selected[m.id]),
    [selected]
  );
  const monthly = chosen.reduce((s, m) => s + m.monthly, 0);
  const setup = chosen.reduce((s, m) => s + m.setup, 0);
  const yearOne = monthly * 12 + setup;

  // Suggest a tier
  const tier =
    monthly <= 2800
      ? "Starter-range bundle"
      : monthly <= 6500
      ? "Growth-range bundle"
      : "Scale-range bundle";

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      {/* Modules */}
      <div className="lg:col-span-7">
        <div className="border-t border-b border-rule-strong divide-y divide-rule">
          {MODULES.map((m) => {
            const active = !!selected[m.id];
            const conflicted = CONFLICTS[m.id]?.some((c) => selected[c]);
            const requirementsMet =
              !m.requires || m.requires.every((r) => selected[r]);
            const disabled = !active && (!!conflicted || !requirementsMet);
            return (
              <button
                key={m.id}
                type="button"
                disabled={disabled}
                onClick={() => toggle(m.id)}
                className={`w-full py-5 text-left grid grid-cols-[auto_1fr_auto] gap-5 items-center transition-opacity ${
                  active ? "opacity-100" : disabled ? "opacity-25 cursor-not-allowed" : "opacity-50 hover:opacity-80"
                }`}
              >
                <div
                  className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                    active ? "border-ink bg-ink text-background" : "border-rule-strong"
                  }`}
                  aria-hidden
                >
                  {active && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                      <path d="M2 6.5L5 9.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="serif text-lg">{m.name}</div>
                  <div className="mt-1 text-sm text-muted leading-snug">{m.tagline}</div>
                  {m.requires && !requirementsMet && (
                    <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-warn">
                      Requires: {m.requires.join(", ")}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="serif tabular-nums">{fmt(m.monthly)}/mo</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">
                    + {fmt(m.setup)} setup
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted italic leading-relaxed">
          Indicative pricing built on the midpoint of the Starter/Growth/Scale
          bands. The real quote on the Diagnostic call accounts for your actual
          stack, volumes and existing tooling.
        </p>
      </div>

      {/* Quote panel */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="border border-rule-strong bg-paper">
            <div className="p-8 border-b border-rule-strong">
              <div className="text-[11px] uppercase tracking-widest text-muted font-mono mb-3">
                Your configured bundle
              </div>
              <div className="display text-5xl md:text-6xl tabular-nums">
                {fmt(monthly)}
                <span className="text-lg text-muted font-sans ml-2 not-italic">
                  / mo
                </span>
              </div>
              <div className="mt-2 text-sm text-muted">
                + {fmt(setup)} one-off setup
              </div>
              <div className="mt-1 text-sm text-muted">
                Year one total {fmt(yearOne)}
              </div>
            </div>

            <div className="p-8 border-b border-rule-strong">
              <div className="text-[11px] uppercase tracking-widest text-accent font-mono mb-3">
                Suggested tier
              </div>
              <div className="serif text-2xl">{tier}</div>
              <div className="mt-2 text-xs text-muted leading-relaxed">
                {chosen.length} module{chosen.length === 1 ? "" : "s"} selected.
                Final scope confirmed on the Diagnostic call.
              </div>
            </div>

            <div className="p-8">
              <Link
                href="/book"
                className="inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
              >
                Lock this in — book diagnostic
              </Link>
              <p className="mt-4 text-xs text-muted italic leading-relaxed">
                No commitment. We&apos;ll review your stack and confirm the final
                quote before either of us signs anything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
