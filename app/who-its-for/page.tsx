import Link from "next/link";
import PageHero from "@/components/PageHero";

const segments = [
  {
    name: "Allied health",
    size: "3–15 staff",
    note: "Best fit.",
    why: "Fast-growing (6.2% CAGR in physio), highly fragmented, owners are hands-on buyers. Strong fit for Cliniko, Nookal and Power Diary integrations.",
  },
  {
    name: "Psychology & mental health",
    size: "3–10 staff",
    note: "Best fit.",
    why: "Heavy Medicare and NDIS admin, owners value patient continuity and data privacy. A strong fit for structured workflow and reporting.",
  },
  {
    name: "Multi-site allied health groups",
    size: "2–10 sites",
    note: "Highest LTV.",
    why: "Highest lifetime value. Multi-site reporting pain is acute and almost never solved elsewhere. These buyers can absorb premium pricing.",
  },
  {
    name: "Dental practices",
    size: "4–20 staff",
    note: "Strong fit.",
    why: "Private-pay heavy with lower margin sensitivity. Strong fit for review automation, recall workflows, and referral tracking.",
  },
  {
    name: "Cosmetic & aesthetics",
    size: "2–15 staff",
    note: "Strong fit.",
    why: "High revenue per patient, sales-driven. Dashboards and lead-source reporting land hard. Fast decision-makers.",
  },
];

export default function WhoItsFor() {
  return (
    <>
      <PageHero
        kicker="Who it's for"
        title={
          <>
            We don&apos;t work with every clinic.
            <br />
            <span className="italic">Here&apos;s who we do our best work for.</span>
          </>
        }
        lede="Australia has 35,000+ private clinics. We are deliberately focused — because specialisation is how we deliver outcomes that generic VA agencies and ClickUp consultants cannot."
      />

      {/* SEGMENTS */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {segments.map((s, i) => (
              <div key={s.name} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-sm text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4">
                  <h3 className="serif text-2xl md:text-3xl">{s.name}</h3>
                  <div className="mt-2 text-sm text-muted">{s.size}</div>
                </div>
                <p className="md:col-span-5 text-muted leading-relaxed">{s.why}</p>
                <div className="md:col-span-2 text-sm md:text-right italic serif text-accent">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICP */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="display text-3xl md:text-4xl">
                Are we <span className="italic">a fit for you?</span>
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                The answer is on the right. If you&apos;re on the left side,
                we&apos;ll tell you on the diagnostic call and send you to a
                better fit.
              </p>
            </div>

            <div className="md:col-span-7 grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-5">
                  Probably not
                </h3>
                <ul className="space-y-4 text-muted">
                  <li>Solo practitioner, no staff.</li>
                  <li>Hospital or corporate chain with a 9&ndash;18 month procurement cycle.</li>
                  <li>You want hours only, no systems work.</li>
                  <li>Operations not yet a line item in the budget.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-accent mb-5">
                  Yes
                </h3>
                <ul className="space-y-4">
                  <li>3&ndash;15 staff, metro Australia.</li>
                  <li>Running Cliniko, Halaxy, Nookal, Power Diary or Jane.</li>
                  <li>Revenue AU$500K&ndash;$5M, owner or practice manager decides.</li>
                  <li>Growing &mdash; hiring, opening a second site, or stretched.</li>
                  <li>Tried one-off hires before. Got burned.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Think you&apos;re <span className="italic">a fit?</span>
            </h2>
            <p className="mt-6 text-muted md:text-lg leading-relaxed">
              Book a diagnostic. We&apos;ll tell you honestly whether we&apos;re
              the right partner.
            </p>
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
