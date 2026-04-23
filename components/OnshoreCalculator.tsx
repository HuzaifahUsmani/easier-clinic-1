"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Role = {
  id: string;
  title: string;
  seniority: string;
  base: number;
  fte: number;        // fraction of a full-time person needed
  overhead: number;   // desk, tools, software, etc. per year
  covers: string;
  note?: string;
};

const ROLES: Role[] = [
  {
    id: "receptionist",
    title: "Medical receptionist",
    seniority: "Full-time, clinic-trained",
    base: 58000,
    fte: 1,
    overhead: 8500,
    covers: "Phones, bookings, check-in, rebooking, patient messaging",
  },
  {
    id: "billing",
    title: "Billing & claims officer",
    seniority: "Full-time",
    base: 72000,
    fte: 0.6,
    overhead: 6500,
    covers: "Medicare, private health, NDIS claims and reconciliation",
    note: "Often wrapped into receptionist — and done badly.",
  },
  {
    id: "pm",
    title: "Practice manager",
    seniority: "Senior, 5+ years",
    base: 105000,
    fte: 0.5,
    overhead: 12000,
    covers: "Team ops, rostering, vendor management, reporting",
  },
  {
    id: "clickup",
    title: "ClickUp consultant",
    seniority: "Contract, AU-based",
    base: 18000,
    fte: 1,
    overhead: 0,
    covers: "Workspace build + 12 months of optimisation",
    note: "Priced as project + retainer, not salary.",
  },
  {
    id: "automation",
    title: "Automation engineer",
    seniority: "Mid-senior",
    base: 125000,
    fte: 0.4,
    overhead: 10000,
    covers: "Make / Zapier / n8n flows across PMS, booking, billing, marketing",
  },
  {
    id: "analyst",
    title: "Dashboard / BI analyst",
    seniority: "Mid-level",
    base: 108000,
    fte: 0.4,
    overhead: 9000,
    covers: "Looker Studio builds, API pipelines, monthly reporting",
  },
];

// Fully-loaded multiplier (super 11.5% + payroll tax ~4.85% + leave loading + workers comp + unproductive time)
// Applied to base × fte. Overhead added flat.
const LOADED_MULTIPLIER = 1.28;

function loadedCost(r: Role) {
  return Math.round(r.base * r.fte * LOADED_MULTIPLIER + r.overhead);
}

const EC_GROWTH_MONTHLY_MID = 5250; // midpoint of $4,000–$6,500
const EC_SETUP = 4500;

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-AU");

export default function OnshoreCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(ROLES.map((r) => [r.id, true]))
  );

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const chosen = useMemo(
    () => ROLES.filter((r) => selected[r.id]),
    [selected]
  );

  const onshoreAnnual = chosen.reduce((sum, r) => sum + loadedCost(r), 0);
  const ecAnnual = EC_GROWTH_MONTHLY_MID * 12 + EC_SETUP;
  const ecOngoing = EC_GROWTH_MONTHLY_MID * 12;
  const saving = onshoreAnnual - ecAnnual;
  const savingOngoing = onshoreAnnual - ecOngoing;
  const savingPct = onshoreAnnual > 0 ? Math.round((saving / onshoreAnnual) * 100) : 0;

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      {/* LEFT — role selector */}
      <div className="lg:col-span-7">
        <div className="border-t border-b border-rule-strong divide-y divide-rule">
          {ROLES.map((r) => {
            const active = !!selected[r.id];
            const loaded = loadedCost(r);
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => toggle(r.id)}
                className={`w-full py-6 text-left grid grid-cols-[auto_1fr_auto] gap-5 items-baseline transition-colors ${
                  active ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-1 ${
                    active ? "border-ink bg-ink text-background" : "border-rule-strong"
                  }`}
                  aria-hidden
                >
                  {active && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                      <path
                        d="M2 6.5L5 9.5L10 3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="serif text-xl">{r.title}</span>
                    <span className="text-xs text-muted">{r.seniority}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted leading-snug">
                    {r.covers}
                  </div>
                  {r.note && (
                    <div className="mt-1 text-xs text-warn italic">{r.note}</div>
                  )}
                  <div className="mt-2 text-[11px] uppercase tracking-widest text-muted font-mono">
                    Base {fmt(r.base)}
                    {r.fte < 1 && <> &middot; {Math.round(r.fte * 100)}% FTE</>}
                    {r.overhead > 0 && <> &middot; +{fmt(r.overhead)} overhead</>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="serif text-xl tabular-nums">{fmt(loaded)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">
                    loaded / yr
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted leading-relaxed">
          Loaded = base &times; FTE &times; 1.28 (super 11.5%, payroll tax ~4.85%,
          leave loading, workers comp, unproductive time) + workspace overhead.
          Salary midpoints from SEEK &amp; Hays 2025 AU reports. Contract lines
          priced at market rate.
        </p>
      </div>

      {/* RIGHT — comparison panel, sticky */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="border border-rule-strong bg-paper">
            {/* onshore total */}
            <div className="p-8 border-b border-rule-strong">
              <div className="text-[11px] uppercase tracking-widest text-muted font-mono mb-3">
                Onshore, fully loaded
              </div>
              <div className="display text-5xl md:text-6xl tabular-nums">
                {fmt(onshoreAnnual)}
                <span className="text-lg text-muted font-sans not-italic ml-2">
                  / yr
                </span>
              </div>
              <div className="mt-2 text-sm text-muted">
                {chosen.length} role{chosen.length === 1 ? "" : "s"} ·{" "}
                {chosen.reduce((s, r) => s + r.fte, 0).toFixed(1)} FTE equivalent
              </div>
            </div>

            {/* ec total */}
            <div className="p-8 border-b border-rule-strong">
              <div className="text-[11px] uppercase tracking-widest text-accent font-mono mb-3">
                Easierclinic · Growth tier
              </div>
              <div className="display text-5xl md:text-6xl tabular-nums text-accent">
                {fmt(ecAnnual)}
                <span className="text-lg text-muted font-sans not-italic ml-2">
                  / yr 1
                </span>
              </div>
              <div className="mt-2 text-sm text-muted">
                {fmt(EC_GROWTH_MONTHLY_MID)}/mo + {fmt(EC_SETUP)} setup ·
                year 2 onward {fmt(ecOngoing)}
              </div>
            </div>

            {/* saving */}
            <div className="p-8">
              <div className="text-[11px] uppercase tracking-widest text-muted font-mono mb-3">
                You keep
              </div>
              <div className="display text-6xl md:text-7xl tabular-nums text-warn">
                {fmt(Math.max(0, saving))}
              </div>
              <div className="mt-2 text-sm text-muted">
                Year one &middot; {savingPct}% less cost
              </div>
              <div className="mt-1 text-sm text-muted">
                Year two onward: {fmt(Math.max(0, savingOngoing))} saved annually
              </div>

              <Link
                href="/book"
                className="mt-8 inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
              >
                See your actual number &rarr;
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted italic leading-relaxed">
            And that&apos;s before recruitment fees, churn, training, sick
            leave cover, and the six months spent building ClickUp and
            dashboards in-house.
          </p>
        </div>
      </div>
    </div>
  );
}
