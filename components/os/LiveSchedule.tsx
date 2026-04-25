"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusPill from "./StatusPill";

type Appt = {
  id: string;
  time: string;
  patient: string;
  service: string;
  practitioner: string;
  status: "queued" | "running" | "done" | "blocked";
};

const SEED: Appt[] = [
  { id: "1", time: "08:30", patient: "M. Albanese",  service: "Initial physio",       practitioner: "Dr. Lin",    status: "done" },
  { id: "2", time: "09:00", patient: "P. Singh",     service: "Review · NDIS",         practitioner: "Dr. Lin",    status: "done" },
  { id: "3", time: "09:30", patient: "K. Wong",      service: "Dry-needling",          practitioner: "Dr. Lin",    status: "running" },
  { id: "4", time: "10:00", patient: "R. Davies",    service: "Initial physio",       practitioner: "Dr. Patel",  status: "queued" },
  { id: "5", time: "10:30", patient: "A. Kowalski",  service: "Manual therapy",       practitioner: "Dr. Patel",  status: "queued" },
  { id: "6", time: "11:00", patient: "T. Yamamoto",  service: "Review",                practitioner: "Dr. Lin",    status: "queued" },
  { id: "7", time: "11:30", patient: "S. Ahmadi",    service: "NDIS plan review",     practitioner: "Dr. Patel",  status: "blocked" },
];

export default function LiveSchedule() {
  const [items, setItems] = useState<Appt[]>(SEED);

  useEffect(() => {
    let i = 0;
    const cycle = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        // Walk forward: queued -> running -> done
        const runningIdx = next.findIndex((x) => x.status === "running");
        const queuedIdx = next.findIndex((x) => x.status === "queued");
        if (runningIdx >= 0) next[runningIdx] = { ...next[runningIdx], status: "done" };
        if (queuedIdx >= 0) next[queuedIdx] = { ...next[queuedIdx], status: "running" };
        // Resolve a block now and then
        if (i % 3 === 0) {
          const blockedIdx = next.findIndex((x) => x.status === "blocked");
          if (blockedIdx >= 0) next[blockedIdx] = { ...next[blockedIdx], status: "queued" };
        }
        i++;
        return next;
      });
    }, 3500);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-[64px_1fr_1.5fr_1fr_auto] gap-3 px-4 py-2.5 border-b border-rule mono text-[10px] uppercase tracking-widest text-muted-2">
        <div>Time</div>
        <div>Patient</div>
        <div>Service</div>
        <div>Practitioner</div>
        <div className="text-right">Status</div>
      </div>

      {/* Rows */}
      <ul>
        <AnimatePresence initial={false}>
          {items.map((a) => (
            <motion.li
              key={a.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-[64px_1fr_1.5fr_1fr_auto] gap-3 px-4 py-3 border-b border-rule items-center hover:bg-surface-2 transition-colors"
            >
              <div className="mono tabular-nums text-sm">{a.time}</div>
              <div className="text-sm truncate">{a.patient}</div>
              <div className="text-sm text-muted truncate">{a.service}</div>
              <div className="text-sm text-muted truncate">{a.practitioner}</div>
              <div className="text-right">
                <StatusPill status={a.status} />
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
