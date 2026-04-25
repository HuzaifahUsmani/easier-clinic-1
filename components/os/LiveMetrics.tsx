"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Metric = {
  label: string;
  value: number;
  unit: string;
  delta: number;
  format: "currency" | "pct" | "number";
};

const SEED: Metric[] = [
  { label: "Bookings · today", value: 64, unit: "", delta: +3, format: "number" },
  { label: "No-show rate · 7d", value: 4.1, unit: "%", delta: -0.4, format: "pct" },
  { label: "Recall conversion · 7d", value: 87, unit: "%", delta: +2, format: "pct" },
  { label: "Revenue · today", value: 11420, unit: "", delta: +480, format: "currency" },
  { label: "Admin hrs saved · this wk", value: 34.5, unit: " hrs", delta: +1.2, format: "number" },
  { label: "Open escalations", value: 0, unit: "", delta: 0, format: "number" },
];

function fmt(m: Metric) {
  if (m.format === "currency") return "$" + Math.round(m.value).toLocaleString("en-AU");
  if (m.format === "pct")
    return m.value.toLocaleString("en-AU", { maximumFractionDigits: 1 }) + m.unit;
  return (m.value % 1 !== 0
    ? m.value.toLocaleString("en-AU", { maximumFractionDigits: 1 })
    : Math.round(m.value).toLocaleString("en-AU")) + m.unit;
}

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>(SEED);

  useEffect(() => {
    const i = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          // Random small drift
          let nv = m.value;
          if (m.format === "currency") nv += Math.round((Math.random() - 0.3) * 60);
          else if (m.format === "pct") nv = Math.max(0, nv + (Math.random() - 0.5) * 0.15);
          else nv += Math.random() < 0.4 ? (Math.random() < 0.5 ? -1 : 1) * 0.5 : 0;
          return { ...m, value: nv };
        })
      );
    }, 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3">
      {metrics.map((m, i) => {
        const positive = m.delta > 0 && m.label !== "Open escalations" && m.label !== "No-show rate · 7d";
        const goodNegative = m.delta < 0 && m.label === "No-show rate · 7d";
        const good = positive || goodNegative;
        return (
          <div
            key={m.label}
            className={`p-5 md:p-6 border-b border-rule ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 === 0 ? "border-r lg:border-r" : ""}`}
          >
            <div className="mono text-[10px] uppercase tracking-widest text-muted-2">
              {m.label}
            </div>
            <motion.div
              key={Math.round(m.value * 10)}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="mt-3 display text-3xl md:text-4xl tabular-nums"
            >
              {fmt(m)}
            </motion.div>
            <div className={`mt-2 mono text-[11px] ${good ? "text-accent" : m.delta === 0 ? "text-muted-2" : "text-warn"}`}>
              {m.delta === 0
                ? "—"
                : `${m.delta > 0 ? "+" : ""}${m.format === "currency" ? "$" : ""}${Math.abs(m.delta).toLocaleString("en-AU")}${m.format === "pct" ? "%" : ""} vs last`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
