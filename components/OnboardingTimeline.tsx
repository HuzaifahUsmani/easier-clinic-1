"use client";

import { motion } from "framer-motion";

type Milestone = {
  day: string;
  when: string;
  title: string;
  body: string;
  who: string;
};

const MILESTONES: Milestone[] = [
  {
    day: "Day 0",
    when: "Kickoff",
    title: "Diagnostic signed, scope locked",
    body: "Your AU-based project lead is assigned. Stack audit starts: PMS, booking, accounting, marketing. We map every data flow before we touch anything.",
    who: "Project lead + you",
  },
  {
    day: "Day 5",
    when: "Week 1",
    title: "VA matched and trained on your stack",
    body: "Two candidate VAs shortlisted. You meet both. Preferred VA is onboarded on your Cliniko/Halaxy/Nookal with role-based access and signed confidentiality.",
    who: "You + shortlisted VAs",
  },
  {
    day: "Day 14",
    when: "Week 2",
    title: "ClickUp workspace goes live",
    body: "Patient intake, recall, team ops and marketing workflows built and populated with current work. Training session for your practice manager.",
    who: "Ops lead + practice manager",
  },
  {
    day: "Day 21",
    when: "Week 3",
    title: "First three automations fire",
    body: "Booking → PMS sync. New-patient welcome sequence. Recall engine fires its first batch. Every flow has a monitoring dashboard.",
    who: "Automation engineer",
  },
  {
    day: "Day 30",
    when: "Month 1 review",
    title: "First core dashboard delivered",
    body: "No-show rate, utilisation, revenue per visit — live from your PMS. 60-minute review call. Any blockers aired, any priorities reshuffled.",
    who: "Project lead + owner",
  },
  {
    day: "Day 45",
    when: "Mid-quarter",
    title: "Full automation suite deployed",
    body: "All 5–15 flows live depending on your tier. Re-keying between systems effectively eliminated. Your team is spending zero hours on the work that ate their week.",
    who: "Automation engineer",
  },
  {
    day: "Day 60",
    when: "Month 2 review",
    title: "SOPs documented, handed over",
    body: "Every process your VA runs is written down, version-controlled, and yours to keep. You are no longer dependent on a single person's knowledge.",
    who: "Project lead",
  },
  {
    day: "Day 90",
    when: "Quarterly review",
    title: "Executive dashboard + roadmap",
    body: "Full exec suite live. Written 90-day results report. Roadmap for the next quarter. This is when most clinics upgrade or expand scope.",
    who: "Project lead + owner + team",
  },
];

export default function OnboardingTimeline() {
  return (
    <div className="relative">
      {/* Vertical rail */}
      <div className="absolute left-[11px] md:left-[15px] top-2 bottom-6 w-px bg-rule-strong" aria-hidden />

      <ol className="space-y-10 md:space-y-12">
        {MILESTONES.map((m, i) => (
          <motion.li
            key={m.day}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.7,
              delay: Math.min(i * 0.05, 0.3),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative pl-10 md:pl-14 grid md:grid-cols-[140px_1fr] gap-6"
          >
            {/* Node */}
            <span
              className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-ink flex items-center justify-center"
              aria-hidden
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
            </span>

            {/* Left column: day marker */}
            <div>
              <div className="serif text-2xl md:text-3xl tabular-nums">
                {m.day}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted font-mono">
                {m.when}
              </div>
            </div>

            {/* Right column: content */}
            <div>
              <h3 className="serif text-xl md:text-2xl">{m.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{m.body}</p>
              <div className="mt-3 text-[11px] uppercase tracking-widest text-muted font-mono">
                Participants: {m.who}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
