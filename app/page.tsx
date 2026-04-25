"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Window from "@/components/os/Window";
import LiveSchedule from "@/components/os/LiveSchedule";
import LiveMetrics from "@/components/os/LiveMetrics";
import TaskQueue from "@/components/os/TaskQueue";
import AutomationFlow from "@/components/os/AutomationFlow";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import LossCalculator from "@/components/LossCalculator";

export default function Home() {
  return (
    <>
      <BootHero />
      <SchedulePanel />
      <TaskPanel />
      <AutomationPanel />
      <MetricsPanel />
      <NumberPanel />
      <IntegrationsStrip />
      <CTAPanel />
    </>
  );
}

/* ============ BOOT HERO ============ */

function BootHero() {
  const [booted, setBooted] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const seq = [
      400, // mount
      300, // line 1
      300, // line 2
      300, // line 3
      400, // line 4
    ];
    let acc = 0;
    seq.forEach((d, i) => {
      acc += d;
      setTimeout(() => setLine(i + 1), acc);
    });
    setTimeout(() => setBooted(true), acc + 600);
  }, []);

  const bootLines = [
    "$ easierclinic boot --clinic=metro-allied --site=sydney",
    "  ✓ secure tunnel · cliniko + halaxy + xero · APP-aligned",
    "  ✓ task queue resumed · 7 open · 0 escalations",
    "  ✓ automations armed · 12 flows · cleared yesterday's run",
    "  ✓ ops lead online · sydney · 09:14 AEST",
  ];

  return (
    <section
      id="ch-01"
      className="relative min-h-[100vh] flex items-center border-b border-rule overflow-hidden"
    >
      <div className="absolute inset-0 console-grid pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-16 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT — terminal boot */}
        <div className="lg:col-span-5">
          <div className="chip mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
            <span>Easierclinic OS · v1</span>
          </div>

          <div className="bevel bg-paper p-5 mono text-[13px] leading-relaxed">
            {bootLines.slice(0, line).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={
                  l.startsWith("$") ? "text-foreground" : "text-muted"
                }
              >
                {l}
              </motion.div>
            ))}
            {line >= bootLines.length && booted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cursor-blink text-accent"
              >
                ready
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT — display headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="display text-5xl md:text-7xl lg:text-[6rem] leading-[0.95]">
              Your clinic,
              <br />
              <span className="text-accent">running in the background.</span>
            </h1>
            <p className="mt-8 text-muted md:text-lg leading-relaxed max-w-xl">
              Every other clinic-services site is a brochure. This one is the
              product. Scroll down — you&apos;re looking at a working snapshot
              of Easierclinic OS, the operating layer we drop into Australian
              clinics.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-flex items-center bg-accent text-background px-6 py-3 text-sm font-medium hover:bg-foreground transition-colors"
              >
                Book a 60-min diagnostic
                <span className="ml-2">→</span>
              </Link>
              <a
                href="#ch-02"
                className="inline-flex items-center border border-rule-strong px-6 py-3 text-sm hover:bg-surface transition-colors"
              >
                Watch the OS run
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 mono text-[10px] uppercase tracking-widest text-muted-2">
              <span>VAs</span>
              <span className="text-rule-strong">·</span>
              <span>ClickUp</span>
              <span className="text-rule-strong">·</span>
              <span>Automation</span>
              <span className="text-rule-strong">·</span>
              <span>Reporting</span>
              <span className="text-rule-strong">·</span>
              <span>Privacy Act 1988</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 mono text-[10px] uppercase tracking-widest text-muted-2 flex flex-col items-center gap-2">
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-accent"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}

/* ============ SCHEDULE PANEL ============ */

function SchedulePanel() {
  return (
    <Module
      id="ch-02"
      moduleNumber="01"
      moduleName="Schedule"
      lede="Reception, but it actually keeps up."
      copy="The same Cliniko / Halaxy / Nookal you already run, except every booking that comes in is triaged, every cancellation is filled from the waitlist, and every status moves on its own. Your team sees the clean version."
    >
      <Window title="Today" status="live" crumb="ec://schedule/today">
        <LiveSchedule />
      </Window>
    </Module>
  );
}

/* ============ TASK QUEUE PANEL ============ */

function TaskPanel() {
  return (
    <Module
      id="ch-03"
      moduleNumber="02"
      moduleName="Task queue"
      lede="One queue. Three VAs. Things actually get done."
      copy="Every booking, claim, recall, and rebook becomes a task. The next clinic-trained VA picks it up the moment it lands. SLA timers run. You see who owns what, when."
      reverse
    >
      <Window title="Inbox" status="live" crumb="ec://tasks/inbox">
        <TaskQueue />
      </Window>
    </Module>
  );
}

/* ============ AUTOMATION PANEL ============ */

function AutomationPanel() {
  return (
    <Module
      id="ch-04"
      moduleNumber="03"
      moduleName="Automations"
      lede="The work that should never have been a task in the first place."
      copy="A single new booking fans out across seven systems without anyone touching it. We build, monitor and version-control these flows. When they break, ClickUp tells the VA — not you."
    >
      <Window title="Flow · new patient onboarding" status="live" crumb="ec://flows/onboarding">
        <AutomationFlow />
      </Window>
    </Module>
  );
}

/* ============ METRICS PANEL ============ */

function MetricsPanel() {
  return (
    <Module
      id="ch-05"
      moduleNumber="04"
      moduleName="Reports"
      lede="Numbers most clinics couldn't pull. Live."
      copy="No more waiting for Friday's report. Live from your PMS, through BigQuery, into a Looker dashboard tied to your phone. The metrics owners actually need to make a decision tomorrow morning."
      reverse
    >
      <Window title="Operations · live" status="live" crumb="ec://reports/ops">
        <LiveMetrics />
      </Window>
    </Module>
  );
}

/* ============ NUMBER PANEL — loss calculator ============ */

function NumberPanel() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.6, 0.8], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.55, 0.7], [0.4, 1]);
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  const so = useSpring(opacity, { stiffness: 60, damping: 18 });

  return (
    <section
      id="ch-06"
      className="relative border-y border-rule"
      style={{ background: "linear-gradient(180deg, var(--background), var(--paper))" }}
    >
      <div className="absolute inset-0 console-dots opacity-50 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-36">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-5">
            <div className="chip mb-6">
              <span className="text-warn">●</span>
              <span>Module 05 · Cost of waiting</span>
            </div>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl">
              Before any of this <span className="italic">is real</span>,
              <br />
              your clinic loses
              <br />
              <motion.span style={{ opacity: so, y: sy }} className="text-warn inline-block">
                this much a month.
              </motion.span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 text-muted leading-relaxed">
            Adjust the sliders. The number is from public IBISWorld and RACGP
            data. The reason most owners do nothing is not that the math is
            wrong — it&apos;s that the cost is invisible.
          </div>
        </div>

        <Window title="Loss · this clinic, this month" status="warn" crumb="ec://reports/cost-of-waiting">
          <div className="p-6 md:p-10">
            <LossCalculator />
          </div>
        </Window>
      </div>
    </section>
  );
}

/* ============ CTA PANEL ============ */

function CTAPanel() {
  return (
    <section className="relative border-t border-rule overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(94,234,212,0.06),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-32 md:py-40">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="chip mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
              <span>Begin</span>
            </div>
            <h2 className="display text-5xl md:text-7xl lg:text-[7rem] leading-[0.95]">
              Spin it up
              <br />
              <span className="text-accent italic">on your clinic.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <p className="text-muted md:text-lg leading-relaxed">
              Sixty-minute Diagnostic. AU-based ops lead. A written one-page map of
              the highest-leverage wins, in your inbox the next morning. Free.
              Whether you hire us or not.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-flex items-center bg-accent text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground transition-colors"
              >
                Book a diagnostic →
              </Link>
              <Link
                href="/case-studies/metro-physio"
                className="inline-flex items-center border border-rule-strong px-7 py-3.5 text-sm hover:bg-surface transition-colors"
              >
                See it on a real clinic
              </Link>
            </div>
            <div className="mono text-[10px] uppercase tracking-widest text-muted-2">
              <span className="text-accent">●</span> Privacy Act 1988 compliant ·
              Sydney · Melbourne · Brisbane
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ MODULE wrapper ============ */

function Module({
  id,
  moduleNumber,
  moduleName,
  lede,
  copy,
  children,
  reverse = false,
}: {
  id: string;
  moduleNumber: string;
  moduleName: string;
  lede: string;
  copy: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="relative border-b border-rule">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start`}>
          <div className={`lg:col-span-4 ${reverse ? "lg:order-2" : ""}`}>
            <div className="lg:sticky lg:top-28">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-2 mb-4">
                Module {moduleNumber} · {moduleName}
              </div>
              <h3 className="display text-3xl md:text-5xl mb-6">{lede}</h3>
              <p className="text-muted leading-relaxed">{copy}</p>
              <div className="mt-8 flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-muted-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                <span>Live in this snapshot</span>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-8 ${reverse ? "lg:order-1" : ""}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
