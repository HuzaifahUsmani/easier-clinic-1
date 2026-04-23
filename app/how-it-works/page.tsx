import Link from "next/link";
import PageHero from "@/components/PageHero";

const pillars = [
  {
    n: "01",
    title: "Clinic-trained virtual assistants",
    tag: "Labour",
    bullets: [
      "Offshore delivery, Australia-based project lead",
      "Trained on Cliniko, Halaxy, Nookal, Power Diary, Jane",
      "Reception, recalls, billing, NDIS admin, insurance claims",
      "Documented chain of custody for patient data access",
    ],
  },
  {
    n: "02",
    title: "ClickUp workspace design",
    tag: "Workflow",
    bullets: [
      "Patient intake, recall, and discharge flows",
      "Team ops — onboarding, leave, performance reviews",
      "Marketing calendar and referrer tracking",
      "Dashboards tied to clinic goals, not vanity metrics",
    ],
  },
  {
    n: "03",
    title: "Automation",
    tag: "Glue",
    bullets: [
      "Booking → PMS → accounting sync",
      "New-patient intake → welcome sequence → first-visit ops",
      "Recall reminders, review requests, no-show follow-ups",
      "Built in Make, Zapier or n8n — whichever fits",
    ],
  },
  {
    n: "04",
    title: "Dashboards & API reporting",
    tag: "Visibility",
    bullets: [
      "No-show rate by practitioner, service, day-of-week",
      "Revenue per visit and per practitioner trends",
      "Recall conversion and patient lifetime value",
      "Multi-site roll-up for groups, live from each PMS",
    ],
  },
];

const journey = [
  ["Discovery call", "30 min · free", "We learn your clinic, your stack, your team, and what is actually breaking. No pitch."],
  ["Practice Ops Diagnostic", "60 min · free · 1-pager delivered", "A structured walkthrough of admin, tools and workflows. You leave with a written opportunity map."],
  ["Proposal & onboarding", "2–4 weeks", "Starter, Growth or Scale. VA matching, ClickUp build, first automation, first dashboard."],
  ["Live & optimising", "Ongoing", "Your VA team is embedded. Systems run themselves. Dashboards update daily."],
  ["Quarterly review", "Every 90 days", "What worked, what to change, what to build next."],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title={
          <>
            Four pillars.
            <br />
            <span className="italic">One accountable team.</span>
          </>
        }
        lede="The typical clinic runs four to seven disconnected tools with no unified view of performance. We fix that — with a delivery model built for Australian healthcare."
      />

      {/* PILLARS */}
      <section className="border-b border-rule relative">
        <span className="ordinal absolute top-16 right-6 md:right-10 text-[10rem] md:text-[14rem] leading-none text-rule-strong/30 select-none pointer-events-none">
          I
        </span>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 relative">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {pillars.map((p) => (
              <div key={p.n} className="py-10 md:py-14 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <div className="text-sm text-muted tabular-nums">{p.n} &middot; {p.tag}</div>
                  <h3 className="mt-3 serif text-2xl md:text-3xl">{p.title}</h3>
                </div>
                <ul className="md:col-span-7 md:col-start-6 space-y-3 text-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="grid grid-cols-[1.25rem_1fr] gap-2">
                      <span className="text-muted">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-b border-rule bg-paper relative">
        <span className="ordinal absolute top-16 right-6 md:right-10 text-[10rem] md:text-[14rem] leading-none text-rule-strong/30 select-none pointer-events-none">
          II
        </span>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 relative">
          <h2 className="display text-3xl md:text-4xl max-w-2xl">
            From first call to full embed, in <span className="italic">four to six weeks.</span>
          </h2>

          <ol className="mt-14 divide-y divide-rule border-t border-b border-rule">
            {journey.map(([title, dur, body], i) => (
              <li key={title} className="py-7 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-1 text-sm text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-3 serif text-xl">{title}</h3>
                <div className="md:col-span-2 text-xs uppercase tracking-wider text-muted">{dur}</div>
                <p className="md:col-span-6 text-muted leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Ready to see what this looks like <span className="italic">for your clinic?</span>
            </h2>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
            >
              Book a diagnostic
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
