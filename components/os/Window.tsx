"use client";

import { ReactNode } from "react";

/**
 * A console "window" frame. Title bar with traffic dots + crumb, body content.
 */
export default function Window({
  title,
  crumb,
  children,
  className = "",
  status,
}: {
  title: string;
  crumb?: string;
  children: ReactNode;
  className?: string;
  status?: "live" | "idle" | "warn";
}) {
  return (
    <div
      className={`bevel bg-surface relative ${className}`}
      style={{ borderRadius: 4 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-rule">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rule-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule-strong" />
        </div>
        <div className="ml-2 mono text-[11px] text-muted-2 truncate flex-1">
          {crumb || `easierclinic / ${title.toLowerCase().replace(/\s+/g, "-")}`}
        </div>
        {status && (
          <div className="flex items-center gap-1.5 mono text-[10px] uppercase tracking-widest">
            {status === "live" && (
              <>
                <span className="relative flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                </span>
                <span className="text-accent">Live</span>
              </>
            )}
            {status === "idle" && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-2" />
                <span className="text-muted-2">Idle</span>
              </>
            )}
            {status === "warn" && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-warn" />
                <span className="text-warn">Watching</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div>{children}</div>
    </div>
  );
}
