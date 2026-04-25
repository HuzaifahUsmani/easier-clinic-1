"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "trigger", label: "New booking", sub: "HotDoc · trigger", x: 6, y: 50 },
  { id: "pms", label: "Cliniko", sub: "create patient record", x: 28, y: 22 },
  { id: "intake", label: "Intake form", sub: "send + track", x: 28, y: 78 },
  { id: "verify", label: "Insurance check", sub: "VA queue · ClickUp", x: 52, y: 22 },
  { id: "welcome", label: "Welcome sequence", sub: "Mailchimp · 3 emails", x: 52, y: 78 },
  { id: "card", label: "Onboarding card", sub: "ClickUp · SLA armed", x: 76, y: 50 },
  { id: "dash", label: "Dashboard", sub: "Looker · live update", x: 96, y: 50 },
];

const EDGES: [string, string][] = [
  ["trigger", "pms"],
  ["trigger", "intake"],
  ["pms", "verify"],
  ["intake", "welcome"],
  ["verify", "card"],
  ["welcome", "card"],
  ["card", "dash"],
];

export default function AutomationFlow() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setPulse((p) => (p + 1) % EDGES.length), 1100);
    return () => clearInterval(i);
  }, []);

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="relative h-[420px] md:h-[480px] console-grid">
      {/* SVG edges */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="flowEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.0)" />
            <stop offset="50%" stopColor="rgba(94,234,212,1)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.0)" />
          </linearGradient>
        </defs>

        {EDGES.map(([fromId, toId], i) => {
          const from = nodeMap[fromId];
          const to = nodeMap[toId];
          if (!from || !to) return null;
          return (
            <g key={i}>
              <path
                d={`M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.25"
                fill="none"
              />
              {pulse === i && (
                <motion.circle
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  r="0.6"
                  fill="var(--accent)"
                  style={{
                    offsetPath: `path('M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}')`,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="bevel bg-surface px-3 py-2 min-w-[140px]">
            <div className="text-xs font-medium">{n.label}</div>
            <div className="mono text-[10px] text-muted-2 mt-0.5">{n.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
