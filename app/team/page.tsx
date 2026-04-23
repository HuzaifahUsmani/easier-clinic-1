import Link from "next/link";
import PageHero from "@/components/PageHero";

const team = [
  {
    name: "Huzaifah Usmani",
    role: "Founder · Principal",
    bio: "Ran operations at Evolve Psychiatry. Built the analytics platform and workflow systems that Easierclinic is modelled on. Lives in Sydney.",
    focus: ["Strategy", "Ops architecture", "Data & reporting"],
  },
  {
    name: "AU Project Lead",
    role: "Your named operations lead",
    bio: "Every engagement is anchored by one Australia-based project lead. They know your clinic, your stack, your team, and own escalations. You will meet them on the Diagnostic call.",
    focus: ["Weekly cadence", "VA oversight", "Escalation path"],
  },
  {
    name: "Clinic-trained VA team",
    role: "Offshore delivery · AU-managed",
    bio: "Our VAs are clinic-trained, not generalist. They join under signed confidentiality, VPN / secure-remote access, and an audit trail. Role-matched to your PMS.",
    focus: ["Cliniko", "Halaxy", "Nookal", "Power Diary", "Jane"],
  },
  {
    name: "Automation & BI partners",
    role: "Technical build team",
    bio: "The engineers and analysts who build your ClickUp workspace, Make/Zapier flows, API pipelines and Looker dashboards. Contracted specialists, managed by us.",
    focus: ["Make · Zapier · n8n", "BigQuery", "Looker Studio"],
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="The team"
        title={
          <>
            A small, accountable team.
            <br />
            <span className="italic">Run by people you&apos;ll actually meet.</span>
          </>
        }
        lede="We are not a reseller, a marketplace, or a middleman. Every engagement is led by a named Australia-based principal. Delivery is run by clinic-trained specialists we vet, manage and stand behind."
      />

      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {team.map((m, i) => (
              <div key={m.name} className="py-10 grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-1 text-sm text-muted tabular-nums font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4">
                  <h2 className="serif text-2xl md:text-3xl">{m.name}</h2>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted font-mono">
                    {m.role}
                  </div>
                </div>
                <p className="md:col-span-4 text-muted leading-relaxed">{m.bio}</p>
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] uppercase tracking-widest font-mono border border-rule-strong px-2.5 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-muted mb-6">
              How we work
            </p>
            <h2 className="display text-3xl md:text-4xl">
              Boring principles. <span className="italic">They hold up.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="divide-y divide-rule border-t border-b border-rule">
              {[
                ["Fewer clients, more depth", "We cap new engagements per month so every client has our attention."],
                ["SOPs from day one", "Nothing lives in one person's head. Your processes are documented, yours to keep."],
                ["Compliance before convenience", "If a flow is fast but sloppy on patient data, we don't ship it."],
                ["One named lead per clinic", "No shared inboxes. You know who to call."],
                ["Price for outcomes, not hours", "We bundle so you are paying for a functioning clinic, not a timesheet."],
              ].map(([t, b]) => (
                <div key={t} className="py-5 grid grid-cols-[1fr] md:grid-cols-[1fr_1.5fr] gap-3 md:gap-6">
                  <div className="serif text-lg">{t}</div>
                  <div className="text-sm text-muted leading-relaxed">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Meet us on the <span className="italic">Diagnostic call.</span>
            </h2>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
            >
              Book it
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
