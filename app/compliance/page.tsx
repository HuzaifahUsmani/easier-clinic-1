import Link from "next/link";
import PageHero from "@/components/PageHero";

const areas = [
  {
    n: "01",
    title: "Privacy Act 1988 & the APPs",
    body: "Clinics handle health information — classified as sensitive information under the Privacy Act. Every engagement is scoped around the Australian Privacy Principles, with documented processes for collection, storage, access and destruction.",
  },
  {
    n: "02",
    title: "Documented chain-of-custody for PHI",
    body: "Every VA touching patient data operates under a signed confidentiality agreement, VPN or secure remote desktop access, role-based permissions in the PMS, and a written access log that we review monthly with you.",
  },
  {
    n: "03",
    title: "ClickUp & HIPAA-equivalent handling",
    body: "ClickUp's native HIPAA support is Enterprise-tier only. Where a clinic is not on Enterprise, we architect the workspace so identifiable patient data never enters ClickUp — it stays inside the PMS, with ClickUp holding only de-identified task references.",
  },
  {
    n: "04",
    title: "Offshore data handling, disclosed properly",
    body: "Using offshore VAs to touch patient data is legal in Australia, provided it is disclosed and handled correctly. We bake that into onboarding — patient-facing privacy copy, internal SOPs, and a single written chain-of-custody document per clinic.",
  },
];

export default function Compliance() {
  return (
    <>
      <PageHero
        kicker="Compliance"
        title={
          <>
            Compliance is a sales enabler.
            <br />
            <span className="italic">Not a tick-box.</span>
          </>
        }
        lede="Operating in Australian healthcare introduces obligations a generic VA agency can ignore. We don't — and it is a large part of why clinic owners trust us with work they would not trust anyone else with."
      />

      {/* AREAS */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {areas.map((a) => (
              <div key={a.n} className="py-10 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-1 text-sm text-muted tabular-nums">
                  {a.n}
                </div>
                <h3 className="md:col-span-4 serif text-2xl md:text-3xl">
                  {a.title}
                </h3>
                <p className="md:col-span-7 text-muted leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE + RISK */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h2 className="display text-3xl md:text-4xl">
              Insured, end-to-end.
            </h2>
            <ul className="mt-8 space-y-3 text-muted">
              <li>— Professional indemnity insurance</li>
              <li>— Cyber liability insurance</li>
              <li>— Public liability for any on-site work</li>
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7 border-l border-rule pl-8">
            <div className="text-xs uppercase tracking-widest text-muted mb-4">
              A note on commercial risk
            </div>
            <p className="text-muted leading-relaxed">
              We cap client concentration below fifteen percent per account,
              document SOPs from client one, and stay tool-agnostic in how we
              market so your operations don&apos;t get tied to any single
              vendor&apos;s roadmap. Boring, but it is what keeps us &mdash; and
              you &mdash; safe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Questions about how we handle <span className="italic">your data?</span>
            </h2>
            <p className="mt-6 text-muted md:text-lg leading-relaxed">
              We walk through our compliance architecture on the free
              diagnostic call. No NDA required.
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
