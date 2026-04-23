"use client";

import { useEffect, useState } from "react";

export default function EHRStrip() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const date = now
    ? now.toLocaleDateString("en-AU", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })
    : "—";
  const time = now
    ? now.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "—";

  return (
    <div className="bg-ink text-background/80 text-[11px] font-mono tracking-tight border-b border-background/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-7 flex items-center justify-between gap-6 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-2">
            <span className="relative flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-ping opacity-60" />
            </span>
            <span className="uppercase tracking-widest text-[10px]">
              Ops &middot; running
            </span>
          </div>
          <Divider />
          <span className="text-background/60">Clinic</span>
          <span>Metro Allied Health &mdash; demo</span>
          <Divider className="hidden md:inline-block" />
          <span className="text-background/60 hidden md:inline">PMS</span>
          <span className="hidden md:inline">Cliniko</span>
          <Divider className="hidden lg:inline-block" />
          <span className="text-background/60 hidden lg:inline">Automations</span>
          <span className="hidden lg:inline">12 active</span>
          <Divider className="hidden lg:inline-block" />
          <span className="text-background/60 hidden lg:inline">Escalations</span>
          <span className="hidden lg:inline text-accent">0</span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span className="hidden md:inline text-background/60">
            Operations lead
          </span>
          <span className="hidden md:inline">EC Team · Sydney</span>
          <Divider className="hidden md:inline-block" />
          <span className="tabular-nums">
            {date} <span className="text-background/50">·</span> {time} AEST
          </span>
        </div>
      </div>
    </div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-px h-3 bg-background/15 ${className}`}
      aria-hidden
    />
  );
}
