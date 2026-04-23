"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useCountUp(target: number, active: boolean, duration = 900) {
  const [v, setV] = useState(0);
  const lastTarget = useRef(0);
  useEffect(() => {
    if (!active) return;
    const start = lastTarget.current;
    const end = target;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(start + (end - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else lastTarget.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return v;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

const fmt = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-AU");

export default function LossCalculator() {
  const [practitioners, setPractitioners] = useState(6);
  const [fee, setFee] = useState(140);
  const [noShow, setNoShow] = useState(12);
  const [missedRecall, setMissedRecall] = useState(30);

  // Working constants
  const daysPerMonth = 20;
  const apptsPerPractitionerWeek = 30;
  const clinicalOpportunityRate = 95;
  const adminHoursPerDay = 2;

  // Admin time opportunity cost
  const adminLoss =
    adminHoursPerDay * practitioners * daysPerMonth * clinicalOpportunityRate;

  // No-shows vs a 4% reminder-driven baseline
  const totalAppointments = apptsPerPractitionerWeek * practitioners * 4;
  const baselineNoShow = 0.04;
  const actualNoShow = noShow / 100;
  const noShowLoss = Math.max(0, (actualNoShow - baselineNoShow) * totalAppointments * fee);

  // Missed recalls — assume 40 eligible/month/practitioner, X% not rebooked
  const eligibleRecalls = 40 * practitioners;
  const recallLoss = (missedRecall / 100) * eligibleRecalls * fee;

  // Billing gaps & re-work — ~5 hrs/wk at $45/hr for clinic admin rate
  const billingLoss = 5 * 4 * 45;

  const total = adminLoss + noShowLoss + recallLoss + billingLoss;

  const { ref, seen } = useInView<HTMLDivElement>();
  const animatedTotal = useCountUp(total, seen);

  return (
    <div ref={ref} className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-5">
        <p className="text-xs uppercase tracking-widest text-warn mb-6">
          The cost of doing nothing &mdash; your clinic
        </p>
        <h2 className="display text-3xl md:text-5xl">
          Adjust the numbers. <span className="italic">Watch what a month of waiting costs.</span>
        </h2>
        <p className="mt-8 text-muted leading-relaxed max-w-md">
          Based on IBISWorld, RACGP and Canberra Times reporting. Defaults
          reflect a typical metro allied-health practice. Override with your own.
        </p>

        <div className="mt-10 space-y-7">
          <Slider
            label="Practitioners"
            value={practitioners}
            min={1}
            max={20}
            step={1}
            onChange={setPractitioners}
            format={(v) => String(v)}
          />
          <Slider
            label="Average fee per appointment"
            value={fee}
            min={60}
            max={300}
            step={5}
            onChange={setFee}
            format={(v) => "$" + v}
          />
          <Slider
            label="Current no-show rate"
            value={noShow}
            min={0}
            max={25}
            step={1}
            onChange={setNoShow}
            format={(v) => v + "%"}
          />
          <Slider
            label="Missed recalls (eligible, not rebooked)"
            value={missedRecall}
            min={0}
            max={60}
            step={1}
            onChange={setMissedRecall}
            format={(v) => v + "%"}
          />
        </div>
      </div>

      <div className="md:col-span-6 md:col-start-7">
        <div className="border border-rule bg-paper p-8 md:p-10">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-muted">
              Monthly exposure
            </span>
            <span className="text-xs text-muted tabular-nums">
              {practitioners} practitioner{practitioners === 1 ? "" : "s"}
            </span>
          </div>
          <div className="display text-5xl md:text-7xl tabular-nums text-warn">
            {fmt(animatedTotal)}
          </div>
          <div className="mt-2 text-sm text-muted tabular-nums">
            {fmt(total * 12)} / year, at current rates.
          </div>

          <div className="mt-8 border-t border-rule divide-y divide-rule">
            {[
              { line: "Practitioner admin time", value: adminLoss, detail: "2 hrs/day × 20 days × $95 clinical opportunity cost" },
              { line: "Excess no-shows", value: noShowLoss, detail: `${noShow}% vs 4% baseline, ~${totalAppointments} appts/month` },
              { line: "Missed recalls", value: recallLoss, detail: `${missedRecall}% of ${eligibleRecalls} eligible, at $${fee} fee` },
              { line: "Billing gaps & re-work", value: billingLoss, detail: "~5 hrs/wk re-keying & claim rejections" },
            ].map((r) => (
              <div key={r.line} className="py-4 grid grid-cols-[1fr_auto] gap-6 items-baseline">
                <div>
                  <div className="serif">{r.line}</div>
                  <div className="mt-1 text-xs text-muted">{r.detail}</div>
                </div>
                <div className="serif tabular-nums">{fmt(r.value)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Link
            href="/book"
            className="inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
          >
            Get your real number &mdash; free
          </Link>
          <p className="text-xs text-muted italic max-w-[18rem]">
            Most clinics we diagnose under-estimate this figure by 40&ndash;60%.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm">{label}</span>
        <span className="serif text-lg tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full slider"
        style={{
          background: `linear-gradient(to right, var(--ink) 0%, var(--ink) ${pct}%, var(--rule) ${pct}%, var(--rule) 100%)`,
        }}
      />
      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          cursor: pointer;
          outline: none;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: var(--ink);
          border: 2px solid var(--background);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: var(--ink);
          border: 2px solid var(--background);
          cursor: pointer;
          border-radius: 0;
        }
      `}</style>
    </label>
  );
}
