"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Task = {
  id: string;
  text: string;
  pms: string;
  age: string;
  picked?: { initials: string; name: string };
};

const TASKS: Task[] = [
  { id: "t1", text: "Confirm Tuesday rebooking — Mrs. Davies", pms: "Cliniko", age: "2m" },
  { id: "t2", text: "Verify HCF cover · physio · 10 sessions", pms: "Halaxy", age: "5m" },
  { id: "t3", text: "Draft NDIS plan-review letter for Singh family", pms: "Power Diary", age: "8m" },
  { id: "t4", text: "Reconcile yesterday's payments to Xero", pms: "Xero · Cliniko", age: "11m" },
  { id: "t5", text: "Resend recall to 23 lapsed patients", pms: "Cliniko · Mailchimp", age: "14m" },
  { id: "t6", text: "Process referral from Dr. Cheng (sports med)", pms: "Cliniko", age: "18m" },
  { id: "t7", text: "Insurance pre-auth — Y. Yamamoto", pms: "Halaxy", age: "21m" },
];

const VAS = [
  { initials: "JM", name: "Jen M." },
  { initials: "RA", name: "Rom A." },
  { initials: "PC", name: "Paul C." },
];

export default function TaskQueue() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);

  useEffect(() => {
    const cycle = setInterval(() => {
      setTasks((prev) => {
        // Pick the first un-picked task and assign a VA
        const idx = prev.findIndex((t) => !t.picked);
        if (idx < 0) {
          // restart
          return TASKS.map((t) => ({ ...t, picked: undefined }));
        }
        const next = [...prev];
        const va = VAS[idx % VAS.length];
        next[idx] = { ...next[idx], picked: va };
        return next;
      });
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-rule mono text-[10px] uppercase tracking-widest text-muted-2">
        <div>Task</div>
        <div className="text-right">Source</div>
        <div className="text-right">VA</div>
      </div>

      <ul>
        <AnimatePresence>
          {tasks.map((t) => (
            <motion.li
              key={t.id}
              layout
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 border-b border-rule items-center text-sm"
            >
              <div className="min-w-0">
                <div className="truncate">{t.text}</div>
                <div className="mono text-[10px] text-muted-2 mt-0.5">
                  picked up {t.age} ago
                </div>
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-muted text-right whitespace-nowrap">
                {t.pms}
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  {t.picked ? (
                    <motion.div
                      key="picked"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 justify-end"
                    >
                      <div className="w-7 h-7 rounded-full bg-accent text-background mono text-[11px] font-semibold flex items-center justify-center">
                        {t.picked.initials}
                      </div>
                      <span className="hidden sm:inline mono text-xs text-muted">
                        {t.picked.name}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mono text-[10px] uppercase tracking-widest text-muted-2"
                    >
                      open
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
