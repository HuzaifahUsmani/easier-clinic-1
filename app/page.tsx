"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import LossCalculator from "@/components/LossCalculator";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import MagneticCTA from "@/components/MagneticCTA";
import {
  PinnedChapter,
  LineReveal,
  RisingLines,
} from "@/components/ScrollStage";

export default function Home() {
  return (
    <>
      {/* CHAPTER 01 — THE HOOK: loss + offer */}
      <PinnedChapter id="ch-01" heightVh={340}>
        {(progress) => <Chapter01 progress={progress} />}
      </PinnedChapter>

      {/* CHAPTER 02 — HORIZONTAL WALKTHROUGH: a week at your clinic with us */}
      <Chapter02 />

      <IntegrationsStrip />

      {/* CHAPTER 03 — YOUR NUMBER (interactive calc) */}
      <section
        id="ch-03"
        className="border-b border-rule bg-warn-soft/40 relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <LineReveal className="mb-14">
            <p className="text-xs uppercase tracking-widest text-warn">
              Chapter 03 &mdash; your number
            </p>
          </LineReveal>
          <LossCalculator />
        </div>
      </section>

      {/* CHAPTER 04 — THE THESIS (pinned) */}
      <PinnedChapter id="ch-04" heightVh={220}>
        {(progress) => <Chapter04 progress={progress} />}
      </PinnedChapter>

      {/* CHAPTER 05 — THE FIELD (comparison) */}
      <Chapter05 />

      {/* CHAPTER 06 — BEGIN */}
      <PinnedChapter id="ch-06" heightVh={180}>
        {(progress) => <Chapter06 progress={progress} />}
      </PinnedChapter>
    </>
  );
}

/* ============ CHAPTER 01 — THE HOOK ============ */

function Chapter01({ progress }: { progress: MotionValue<number> }) {
  const p = useSpring(progress, { stiffness: 80, damping: 22, mass: 0.5 });

  // Three phases: 0→0.33 loss headline | 0.33→0.66 offer overview | 0.66→1 fade out
  const phase1Opacity = useTransform(p, [0, 0.3, 0.35], [1, 1, 0]);
  const phase1Y = useTransform(p, [0, 0.35], ["0%", "-18%"]);

  const phase2Opacity = useTransform(p, [0.3, 0.4, 0.65, 0.75], [0, 1, 1, 0]);
  const phase2Y = useTransform(p, [0.3, 0.4], ["12%", "0%"]);

  const lossNumber = useTransform(p, [0, 0.25], [0, 41620]);
  const ambientScale = useTransform(p, [0, 1], [1, 1.2]);
  const ambientOpacity = useTransform(p, [0, 0.6, 1], [0.45, 0.2, 0.05]);

  return (
    <div className="w-full h-full relative">
      <motion.span
        style={{ scale: ambientScale, opacity: ambientOpacity }}
        className="ordinal absolute left-[-3vw] top-[-6vh] text-[36vw] md:text-[24vw] text-rule-strong/40 pointer-events-none select-none leading-none"
      >
        01
      </motion.span>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 w-full relative h-full flex items-center">
        {/* PHASE 1 — THE LOSS */}
        <motion.div
          style={{ opacity: phase1Opacity, y: phase1Y }}
          className="absolute inset-0 flex items-center px-6 lg:px-10 max-w-[1200px]"
        >
          <div className="w-full">
            <div className="chip mb-10">
              <span className="tabular-nums text-muted">Chapter 01</span>
              <span>Before we pitch anything</span>
            </div>
            <p className="text-sm md:text-base text-muted mb-6 max-w-md">
              A typical six-practitioner Australian allied-health clinic,
              running on Cliniko with no automation, is losing this much a
              month:
            </p>
            <div className="display text-[22vw] md:text-[16vw] lg:text-[12rem] leading-[0.9] text-warn tabular-nums">
              <AnimatedDollar value={lossNumber} />
            </div>
            <p className="mt-8 serif text-xl md:text-2xl max-w-2xl leading-snug">
              Admin hours. Missed recalls. No-shows. Billing re-work.
              <span className="text-muted">
                {" "}
                &mdash; IBISWorld, RACGP, Canberra Times (2025).
              </span>
            </p>
            <p className="mt-10 text-xs uppercase tracking-widest text-muted">
              Scroll ↓ for what stops it
            </p>
          </div>
        </motion.div>

        {/* PHASE 2 — WHAT WE OFFER */}
        <motion.div
          style={{ opacity: phase2Opacity, y: phase2Y }}
          className="absolute inset-0 flex items-center px-6 lg:px-10 max-w-[1200px]"
        >
          <div className="w-full">
            <p className="text-xs uppercase tracking-widest text-accent mb-6">
              Here&apos;s what stops it
            </p>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl max-w-4xl">
              One team.{" "}
              <span className="italic">
                Four moving parts that already talk to each other.
              </span>
            </h2>

            <div className="mt-14 grid md:grid-cols-4 gap-6 md:gap-4">
              {[
                { n: "I", t: "Virtual assistants", s: "Clinic-trained. AU-led." },
                { n: "II", t: "ClickUp workflows", s: "Real. Not a template." },
                { n: "III", t: "Automation", s: "Nothing re-keyed twice." },
                { n: "IV", t: "Dashboards", s: "Live from your PMS." },
              ].map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30%" }}
                  transition={{ delay: 0.1 * i, duration: 0.7 }}
                  className="border-t border-rule-strong pt-5"
                >
                  <div className="text-xs text-muted tabular-nums">{p.n}</div>
                  <div className="mt-2 serif text-xl md:text-2xl">{p.t}</div>
                  <div className="mt-1 text-sm text-muted">{p.s}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap gap-6 items-center">
              <Link
                href="/book"
                className="inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
              >
                Book a 60-min diagnostic
              </Link>
              <Link href="#ch-02" className="hairline text-sm">
                Watch a week with us working →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedDollar({ value }: { value: MotionValue<number> }) {
  const rounded = useTransform(value, (v) =>
    "$" + Math.round(v).toLocaleString("en-AU")
  );
  return <motion.span>{rounded}</motion.span>;
}

/* ============ CHAPTER 02 — HORIZONTAL WALKTHROUGH ============ */

function Chapter02() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const days = [
    {
      day: "Monday",
      time: "07:50",
      kicker: "Reception opens before you do",
      body: "Your Australia-based project lead has briefed the clinic-trained VA. By 7:50 the inbox is triaged, cancellations confirmed, and three NDIS access requests are drafted for your sign-off. You walk in to a cleared decks.",
      stat: "34 admin hrs",
      statLabel: "saved by week's end",
    },
    {
      day: "Tuesday",
      time: "10:15",
      kicker: "The recall engine fires",
      body: "Automation pulls the recall list from Cliniko, segments by last-visit type, and messages 62 eligible patients. 18 rebook themselves before lunch. Nobody on your team touched a spreadsheet.",
      stat: "18 rebooked",
      statLabel: "in one batch",
    },
    {
      day: "Wednesday",
      time: "14:30",
      kicker: "ClickUp shows what is actually happening",
      body: "Your practice manager opens ClickUp. Every patient intake is a card with the stage it is in. SLA timers are on. The Friday slump in utilisation is visible and has a name: one practitioner's 2&ndash;4pm block, three weeks running.",
      stat: "Friday 2–4pm",
      statLabel: "spotted early",
    },
    {
      day: "Thursday",
      time: "09:00",
      kicker: "New patient intake, zero re-keying",
      body: "A new patient books via HotDoc. Automation pushes them into Cliniko, fires the welcome sequence, creates a ClickUp onboarding card, and flags insurance verification. Your VA picks up the card. Total human effort so far: zero.",
      stat: "0 keystrokes",
      statLabel: "from booking to onboarding",
    },
    {
      day: "Friday",
      time: "17:00",
      kicker: "You open the dashboard",
      body: "Revenue per visit: up $14. No-show rate: 4.2%, down from 12. Recall conversion: 87%. The numbers are live from Cliniko — no-one built a spreadsheet this week. You leave at five.",
      stat: "+$14 / visit",
      statLabel: "week over week",
    },
  ];

  // Each day gets a slice of scroll. We pan horizontally across days.
  // Start slightly past 0 to give intro room, end slightly before 1 for outro.
  const x = useTransform(p, [0.08, 0.92], ["4vw", `-${days.length * 90 - 90}vw`]);

  return (
    <section
      id="ch-02"
      ref={ref}
      className="relative bg-ink text-background"
      style={{ height: `${days.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-background/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 md:py-8 flex items-baseline justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/60">
                Chapter 02 &mdash; a week at your clinic
              </p>
              <h2 className="mt-2 display text-2xl md:text-4xl">
                With us running ops in the background.
              </h2>
            </div>
            <ScrollProgress p={p} total={days.length} />
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex items-stretch h-full will-change-transform"
          >
            {days.map((d, i) => (
              <DayPanel key={d.day} {...d} index={i} total={days.length} p={p} />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="shrink-0 border-t border-background/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex justify-between items-center text-xs uppercase tracking-widest text-background/50">
            <span>Scroll ↓ to pan across the week</span>
            <span className="hidden md:inline">
              Monday → Friday &middot; five scenes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DayPanel({
  day,
  time,
  kicker,
  body,
  stat,
  statLabel,
  index,
  total,
  p,
}: {
  day: string;
  time: string;
  kicker: string;
  body: string;
  stat: string;
  statLabel: string;
  index: number;
  total: number;
  p: MotionValue<number>;
}) {
  // Each panel has a peak point based on its index
  const panelStart = 0.08 + (0.84 * index) / total;
  const panelEnd = 0.08 + (0.84 * (index + 1)) / total;
  const center = (panelStart + panelEnd) / 2;

  // Fade/scale content based on proximity to center
  const contentOpacity = useTransform(
    p,
    [panelStart - 0.05, center, panelEnd + 0.05],
    [0.15, 1, 0.15]
  );
  const contentScale = useTransform(
    p,
    [panelStart - 0.05, center, panelEnd + 0.05],
    [0.94, 1, 0.94]
  );

  return (
    <article
      className="shrink-0 h-full flex items-center"
      style={{ width: "90vw" }}
    >
      <div className="w-full px-6 lg:px-16">
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="grid md:grid-cols-12 gap-8 md:gap-14 items-center"
        >
          {/* Left: day marker + big number */}
          <div className="md:col-span-5 relative">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="tabular-nums text-sm text-background/60">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-background/20" />
              <span className="text-xs uppercase tracking-widest text-background/60 tabular-nums">
                {time}
              </span>
            </div>
            <div className="display text-[18vw] md:text-[9rem] lg:text-[11rem] leading-[0.85]">
              {day}
            </div>
            <div className="mt-8 border-t border-background/20 pt-5">
              <div className="display text-4xl md:text-5xl text-accent tabular-nums">
                {stat}
              </div>
              <div className="mt-2 text-sm text-background/60">{statLabel}</div>
            </div>
          </div>

          {/* Right: narrative */}
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-xs uppercase tracking-widest text-accent mb-6">
              {kicker}
            </p>
            <p
              className="serif text-xl md:text-2xl lg:text-3xl leading-[1.35] text-background/90"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>
        </motion.div>
      </div>
    </article>
  );
}

function ScrollProgress({ p, total }: { p: MotionValue<number>; total: number }) {
  const width = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="hidden md:flex items-center gap-4 min-w-[280px]">
      <div className="flex-1 h-px bg-background/20 relative overflow-hidden">
        <motion.div
          style={{ width }}
          className="absolute left-0 top-0 h-full bg-accent"
        />
      </div>
      <span className="text-xs tabular-nums text-background/60">
        {total} scenes
      </span>
    </div>
  );
}

/* ============ CHAPTER 04 — THESIS ============ */

function Chapter04({ progress }: { progress: MotionValue<number> }) {
  const p = useSpring(progress, { stiffness: 80, damping: 20 });
  const leftOpacity = useTransform(p, [0, 0.25, 0.65, 1], [0, 1, 1, 0]);
  const leftX = useTransform(p, [0, 0.25], ["-20%", "0%"]);
  const rightOpacity = useTransform(p, [0.35, 0.55], [0, 1]);
  const rightY = useTransform(p, [0.35, 0.55], ["40%", "0%"]);
  const ambientY = useTransform(p, [0, 1], ["10%", "-20%"]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.span
        style={{ y: ambientY }}
        className="ordinal absolute right-[-4vw] top-[10vh] text-[40vw] md:text-[28vw] text-rule-strong/30 pointer-events-none select-none leading-none"
      >
        04
      </motion.span>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 w-full relative grid md:grid-cols-12 gap-10">
        <motion.div
          style={{ opacity: leftOpacity, x: leftX }}
          className="md:col-span-5"
        >
          <p className="text-xs uppercase tracking-widest text-muted mb-6">
            Chapter 04 &mdash; the thesis
          </p>
          <h2 className="display text-4xl md:text-6xl">
            The market is full of people.
            <br />
            <span className="italic">Or</span> full of tools.
            <br />
            <span className="text-accent">We do both.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: rightOpacity, y: rightY }}
          className="md:col-span-6 md:col-start-7 text-muted leading-relaxed space-y-5 md:text-lg self-end pb-6"
        >
          <p className="dropcap text-foreground">
            GP Hero, Offsiters, BruntWork, Hammerjack &mdash; every Australian
            virtual-assistant agency sells labour. ClickUp consultants,
            integration shops, and dashboard builders sell tools. Almost no-one
            sells both, together, for clinics.
          </p>
          <p>
            That gap is why our clients stop paying two vendors, fire a third,
            and still save hours every week. Labour that understands the
            workflow. Tools that reflect the labour. One accountable team.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ============ CHAPTER 05 — THE FIELD ============ */

function Chapter05() {
  return (
    <section id="ch-05" className="border-y border-rule relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <LineReveal>
          <p className="text-xs uppercase tracking-widest text-muted mb-6">
            Chapter 05 &mdash; the field
          </p>
        </LineReveal>
        <h2 className="display text-4xl md:text-6xl max-w-3xl mb-14">
          Where the market sits, <span className="italic">and where we fit.</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-t border-b border-rule-strong text-sm">
            <thead>
              <tr className="border-b border-rule">
                {["Provider", "VAs", "ClickUp", "Automation", "Dashboards", "Clinic-specific"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`py-4 px-3 font-normal text-xs uppercase tracking-widest text-muted ${
                        i === 0 ? "text-left pr-4" : "text-center"
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {([
                ["GP Hero", true, false, false, false, "GP only"],
                ["Offsiters", true, false, false, false, false],
                ["BruntWork", true, false, false, false, false],
                ["Hammerjack", true, false, false, false, false],
                ["ClinicSync Pro", false, false, true, true, true],
                ["Square Meters Digital", false, false, true, true, "Marketing-led"],
                ["ClickUp consultants (AU)", false, true, "Some", false, false],
              ] as (string | boolean)[][]).map((row, idx) => (
                <motion.tr
                  key={row[0] as string}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="hover:bg-paper transition-colors"
                >
                  <td className="py-4 pr-4 serif">{row[0] as string}</td>
                  {(row.slice(1, 5) as (boolean | string)[]).map((cell, i) => (
                    <td key={i} className="text-center py-4 px-3 text-muted">
                      {cell === true ? (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground" />
                      ) : cell === false ? (
                        <span className="text-rule-strong">—</span>
                      ) : (
                        <span className="text-xs">{cell}</span>
                      )}
                    </td>
                  ))}
                  <td className="text-center py-4 px-3 text-muted text-xs">
                    {typeof row[5] === "boolean"
                      ? row[5]
                        ? "Yes"
                        : "No"
                      : (row[5] as string)}
                  </td>
                </motion.tr>
              ))}
              <motion.tr
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="bg-accent-soft border-t-2 border-accent"
              >
                <td className="py-5 pr-4 serif text-lg text-accent">Easierclinic</td>
                {[1, 2, 3, 4].map((i) => (
                  <td key={i} className="text-center py-5 px-3 text-accent">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                  </td>
                ))}
                <td className="text-center py-5 px-3 text-accent text-xs font-medium">
                  Purpose-built
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ============ CHAPTER 06 — BEGIN ============ */

function Chapter06({ progress }: { progress: MotionValue<number> }) {
  const p = useSpring(progress, { stiffness: 80, damping: 20 });
  const lineClip = useTransform(p, [0, 0.6], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const subOpacity = useTransform(p, [0.45, 0.75], [0, 1]);
  const subY = useTransform(p, [0.45, 0.75], ["40%", "0%"]);
  const ambientScale = useTransform(p, [0, 1], [0.95, 1.1]);

  return (
    <div className="w-full h-full relative bg-ink text-background overflow-hidden">
      <motion.span
        style={{ scale: ambientScale }}
        className="ordinal absolute -left-[2vw] -bottom-[15vh] text-[50vw] md:text-[32vw] leading-none text-background/5 pointer-events-none select-none"
      >
        06
      </motion.span>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <p className="text-xs uppercase tracking-widest text-background/60 mb-8">
          Chapter 06 &mdash; begin
        </p>

        <motion.h2
          style={{ clipPath: lineClip }}
          className="display text-5xl md:text-8xl lg:text-[8rem] leading-[0.95]"
        >
          Start with a free
          <br />
          <span className="italic text-accent">Practice Ops Diagnostic.</span>
        </motion.h2>

        <motion.div
          style={{ opacity: subOpacity, y: subY }}
          className="mt-12 grid md:grid-cols-12 gap-10 items-end"
        >
          <p className="md:col-span-6 text-background/70 md:text-lg leading-relaxed">
            Sixty minutes. No pitch. A written one-page opportunity map, yours
            to keep whether we work together or not.
          </p>
          <div className="md:col-span-5 md:col-start-8 flex md:justify-end">
            <MagneticCTA strength={0.5} radius={160}>
              <Link
                href="/book"
                className="inline-flex items-center border border-background bg-background text-ink px-8 py-4 text-sm hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                Book yours &nbsp;&rarr;
              </Link>
            </MagneticCTA>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
