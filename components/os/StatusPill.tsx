"use client";

import { motion, AnimatePresence } from "framer-motion";

type Status = "queued" | "running" | "done" | "blocked";

const styles: Record<Status, { bg: string; text: string; dot: string }> = {
  queued: {
    bg: "bg-rule",
    text: "text-muted",
    dot: "bg-muted-2",
  },
  running: {
    bg: "bg-warn-soft",
    text: "text-warn",
    dot: "bg-warn",
  },
  done: {
    bg: "bg-accent-soft",
    text: "text-accent",
    dot: "bg-accent",
  },
  blocked: {
    bg: "bg-rule",
    text: "text-pink",
    dot: "bg-pink",
  },
};

const labels: Record<Status, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  blocked: "Blocked",
};

export default function StatusPill({ status }: { status: Status }) {
  const s = styles[status];
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={status}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 mono text-[10px] uppercase tracking-widest ${s.bg} ${s.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === "running" ? "pulse-dot" : ""}`} />
        {labels[status]}
      </motion.span>
    </AnimatePresence>
  );
}
