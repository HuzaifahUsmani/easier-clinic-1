import Link from "next/link";
import PageHero from "@/components/PageHero";
import OnshoreCalculator from "@/components/OnshoreCalculator";

const hiddenCosts = [
  {
    title: "Recruitment",
    body: "Agency fees of 15–20% of first-year salary. For a $90k practice manager that is $13,500–$18,000 per hire. Internal recruiter time adds 40–80 hours per role.",
  },
  {
    title: "Ramp to productivity",
    body: "A new medical receptionist takes 8–12 weeks to reach full competency on your PMS. You pay full salary for a fraction of full output.",
  },
  {
    title: "Churn",
    body: "Australian medical reception churn sits around 30–40% a year. Every exit resets onboarding, recruitment and cultural fit.",
  },
  {
    title: "Leave cover",
    body: "Annual leave, sick leave, public holidays and carer's leave eat 6–8 weeks per FTE per year. Without cover, the clinic backs up behind them.",
  },
  {
    title: "Tooling & subscriptions",
    body: "Software, headsets, monitors, parking, background checks — the line items you don't itemise on Day 1 but find on Day 90.",
  },
  {
    title: "Management overhead",
    body: "Every FTE you hire needs someone managing them. Usually that's you. That hour is priced at your clinical rate, not theirs.",
  },
];

export default function HiringOnshorePage() {
  return (
    <>
      <PageHero
        kicker="If you hired all of this onshore"
        title={
          <>
            The onshore alternative.
            <br />
            <span className="italic">Done honestly.</span>
          </>
        }
        lede="Every role we replace has a real Australian job title, a real salary band, and a real set of on-costs. Toggle the roles below to see what hiring this team yourself would cost you — fully loaded. Defaults assume a mid-sized metro clinic."
      />

      {/* CALCULATOR */}
      <section className="border-b border-rule">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <OnshoreCalculator />
        </div>
      </section>

      {/* THE HIDDEN COSTS */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                The line items nobody quotes
              </p>
              <h2 className="display text-3xl md:text-4xl">
                Salary is the honest headline. <span className="italic">The rest is the iceberg.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="divide-y divide-rule border-t border-b border-rule">
                {hiddenCosts.map((c, i) => (
                  <div
                    key={c.title}
                    className="py-6 grid grid-cols-[auto_1fr] gap-5"
                  >
                    <div className="text-xs text-muted tabular-nums font-mono mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="serif text-lg">{c.title}</div>
                      <p className="mt-1 text-sm text-muted leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRIDGE COPY */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                Why this math exists at all
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 md:text-lg text-muted leading-relaxed">
              <p className="dropcap text-foreground">
                Most of the work inside a clinic is not clinical. It is process —
                bookings, recalls, claims, re-keying, cross-checking the PMS
                against the accounting system. A practitioner hour is billed at
                $180+. A receptionist hour costs $34 loaded.
              </p>
              <p>
                The onshore model charges you receptionist pay for clerical work
                and practitioner pay for everything that should have been a
                workflow. Our model offshores the clerical, automates what
                repeats, and gives your practitioners their time back. The same
                job costs a fraction because it is built, not staffed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-4xl md:text-6xl">
              Curious what <span className="italic">your</span> number is?
            </h2>
            <p className="mt-6 text-muted md:text-lg leading-relaxed">
              The free 60-minute Diagnostic takes your actual team, stack and
              volumes — and gives you a written comparison. Onshore vs.
              Easierclinic, for your specific clinic.
            </p>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
            >
              Book your diagnostic
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
