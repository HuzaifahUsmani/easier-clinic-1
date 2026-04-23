"use client";

import { useMemo, useState } from "react";

/**
 * Self-contained booking calendar. Two-step: pick a day, pick a time.
 * Skips weekends, generates realistic AEST slots, and reports the selection.
 */

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isWeekend(d: Date) {
  const day = d.getDay();
  return day === 0 || day === 6;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

const TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "11:30",
  "13:00",
  "14:00",
  "14:30",
  "15:30",
  "16:00",
];

export default function BookingCalendar({
  onChange,
}: {
  onChange?: (iso: string | null) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Next 14 business days
  const days = useMemo(() => {
    const list: Date[] = [];
    let cursor = addDays(today, 1);
    while (list.length < 10) {
      if (!isWeekend(cursor)) list.push(new Date(cursor));
      cursor = addDays(cursor, 1);
    }
    return list;
  }, [today]);

  const commit = (day: Date | null, time: string | null) => {
    setSelectedDay(day);
    setSelectedTime(time);
    if (!onChange) return;
    if (day && time) {
      const [h, m] = time.split(":").map(Number);
      const iso = new Date(day);
      iso.setHours(h, m, 0, 0);
      onChange(iso.toISOString());
    } else {
      onChange(null);
    }
  };

  return (
    <div className="border border-rule-strong bg-surface">
      <div className="border-b border-rule px-6 py-4 flex items-baseline justify-between gap-6">
        <div className="text-[11px] uppercase tracking-widest text-muted font-mono">
          Pick a slot · AEST
        </div>
        <div className="text-xs text-muted">30-min Diagnostic</div>
      </div>

      {/* Day picker */}
      <div className="border-b border-rule">
        <div className="px-6 py-5 text-xs uppercase tracking-widest text-muted font-mono">
          Step 1 &middot; day
        </div>
        <div className="px-6 pb-5 flex gap-2 overflow-x-auto">
          {days.map((d) => {
            const active =
              selectedDay && startOfDay(d).getTime() === selectedDay.getTime();
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => commit(d, null)}
                className={`shrink-0 w-16 py-3 text-center border transition-colors ${
                  active
                    ? "bg-ink text-background border-ink"
                    : "border-rule hover:border-ink"
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest">
                  {d.toLocaleDateString("en-AU", { weekday: "short" })}
                </div>
                <div className="serif text-xl tabular-nums mt-1">
                  {d.getDate()}
                </div>
                <div className="text-[10px] uppercase tracking-widest mt-0.5">
                  {d.toLocaleDateString("en-AU", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time picker */}
      <div>
        <div className="px-6 py-5 text-xs uppercase tracking-widest text-muted font-mono">
          Step 2 &middot; time
        </div>
        <div className="px-6 pb-6 grid grid-cols-3 md:grid-cols-5 gap-2">
          {TIMES.map((t) => {
            const disabled = !selectedDay;
            const active = t === selectedTime;
            return (
              <button
                key={t}
                type="button"
                disabled={disabled}
                onClick={() => commit(selectedDay!, t)}
                className={`py-3 text-sm tabular-nums border transition-colors ${
                  disabled
                    ? "border-rule text-muted/40 cursor-not-allowed"
                    : active
                    ? "bg-accent border-accent text-background"
                    : "border-rule hover:border-ink"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {selectedDay && selectedTime && (
        <div className="border-t border-rule-strong bg-paper px-6 py-4 flex items-baseline justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted font-mono">
              Locked in
            </div>
            <div className="mt-0.5 serif text-lg">
              {selectedDay.toLocaleDateString("en-AU", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}{" "}
              &middot; {selectedTime} AEST
            </div>
          </div>
          <button
            type="button"
            onClick={() => commit(null, null)}
            className="text-xs text-muted hairline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
