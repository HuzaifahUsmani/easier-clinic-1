import Link from "next/link";
import PageHero from "@/components/PageHero";
import BundleBuilder from "@/components/BundleBuilder";

const tiers = [
  {
    name: "Starter",
    target: "Solo / 2–3 staff",
    monthly: "$1,800–$2,800",
    setup: "$1,500",
    note: "",
    features: [
      "Up to 40 VA hours / month",
      "Up to 5 automations",
      "1 core dashboard",
      "ClickUp — not included",
      "API reporting — not included",
    ],
  },
  {
    name: "Growth",
    target: "4–15 staff",
    monthly: "$4,000–$6,500",
    setup: "$4,500",
    note: "Most clinics land here.",
    features: [
      "80–120 VA hours / month",
      "Full ClickUp workspace build",
      "Up to 15 automations",
      "3 dashboards",
      "Standard API reporting pipeline",
    ],
  },
  {
    name: "Scale",
    target: "15+ staff · multi-site",
    monthly: "$8,500–$15,000+",
    setup: "$12,000+",
    note: "",
    features: [
      "160+ VA hours / month / team",
      "Multi-space ClickUp build",
      "Unlimited automations",
      "Custom dashboard suite",
      "Full API / warehouse pipeline",
    ],
  },
];

const landOffers = [
  {
    name: "Practice Ops Diagnostic",
    price: "Free",
    body: "Sixty-minute strategy call plus a written one-page opportunity map. Our primary entry offer.",
    href: "/book",
  },
  {
    name: "ClickUp Workspace Audit",
    price: "$950",
    body: "Fixed-fee audit of your current ClickUp (or lack of it), plus a written roadmap. Delivered in five business days.",
    href: "/book?offer=clickup-audit",
  },
  {
    name: "Dashboard Starter",
    price: "$2,250",
    body: "One Looker Studio dashboard built against your PMS, plus a one-hour training session. Fast win.",
    href: "/book?offer=dashboard-starter",
  },
  {
    name: "VA Trial Pack",
    price: "$695",
    body: "Twenty hours of clinic-trained VA work over four weeks. No obligation to continue.",
    href: "/book?offer=va-trial",
  },
];

const faqs = [
  ["Are VAs Australia-based or offshore?", "Delivery is offshore and clinic-trained. Project management, escalation and compliance oversight are Australia-based. This is how we keep cost-to-serve sustainable while keeping quality and data handling tight."],
  ["What contract length is required?", "Growth and Scale start on a three-month initial term, rolling month-to-month after that. Land offers have no commitment at all."],
  ["Who pays for ClickUp, Make, Cliniko etc.?", "The clinic owns and pays its own software subscriptions. We recommend tiers and configure for you, but we never resell software."],
  ["Is patient data handled compliantly?", "Yes — documented chain-of-custody, signed confidentiality, VPN or secure-remote access for VAs, Privacy Act 1988 and APPs aligned. See the Compliance page."],
  ["Can we start with just VAs and add the rest later?", "That is the whole point of the Starter package. Most clinics add ClickUp, automation and dashboards over months two to six."],
];

export default function Pricing() {
  return (
    <>
      <PageHero
        kicker="Pricing"
        title={
          <>
            Land small.
            <br />
            <span className="italic">Expand when it works.</span>
          </>
        }
        lede="Clinic owners are risk-averse — rightly so. Start with a single entry offer. Move into a bundle when you have seen the results. No long lock-ins."
      />

      {/* TIERS */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule border-y border-rule">
            {tiers.map((t) => (
              <div key={t.name} className="p-8 md:p-10 flex flex-col">
                <div className="serif text-2xl">{t.name}</div>
                <div className="mt-1 text-sm text-muted">{t.target}</div>

                <div className="mt-8 display text-3xl md:text-4xl tabular-nums">
                  {t.monthly}
                </div>
                <div className="mt-1 text-sm text-muted">
                  per month · AUD ex GST
                </div>
                <div className="mt-2 text-xs text-muted">
                  + one-off setup {t.setup}
                </div>

                {t.note && (
                  <div className="mt-5 text-sm italic serif text-accent">
                    {t.note}
                  </div>
                )}

                <ul className="mt-8 space-y-3 text-sm text-muted flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="grid grid-cols-[1rem_1fr] gap-2">
                      <span>—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className="mt-10 inline-flex items-center border border-ink px-5 py-2.5 text-sm hover:bg-ink hover:text-background transition-colors w-max"
                >
                  Book a diagnostic
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR BUNDLE */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest text-accent mb-6">
                Or build your own
              </p>
              <h2 className="display text-3xl md:text-5xl">
                Want a mix that isn&apos;t in the three tiers?
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-muted md:text-lg leading-relaxed self-end">
              Toggle modules to configure your own bundle. Conflicts and
              dependencies resolve automatically, so the price on the right
              always reflects a workable scope.
            </div>
          </div>
          <BundleBuilder />
        </div>
      </section>

      {/* LAND OFFERS */}
      <section id="land-offers" className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="display text-3xl md:text-4xl">
                Not ready for a bundle? <span className="italic">Start here.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ul className="divide-y divide-rule border-t border-b border-rule">
                {landOffers.map((o) => (
                  <li key={o.name}>
                    <Link
                      href={o.href}
                      className="py-6 grid grid-cols-[1fr_auto] gap-6 items-baseline hover:opacity-70 transition-opacity"
                    >
                      <div>
                        <h3 className="serif text-xl">{o.name}</h3>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                          {o.body}
                        </p>
                      </div>
                      <div className="text-right serif text-xl tabular-nums">
                        {o.price}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RISK REVERSAL */}
      <section className="border-b border-rule bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                What we carry &mdash; so you don&apos;t
              </p>
              <h2 className="display text-3xl md:text-4xl">
                Most clinic owners have been burned before. <span className="italic">We expect that.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ul className="divide-y divide-rule border-t border-b border-rule">
                {[
                  ["Three-month initial term, then month-to-month", "No annual lock-ins. If it isn't working, you leave."],
                  ["Named AU-based project lead", "One person owns your account. Not a shared inbox."],
                  ["Replacement VA within 10 business days", "If the match is wrong, we re-match. At our cost."],
                  ["Every SOP is yours", "Documented from day one. You keep them if we part ways."],
                  ["We cap our side at 15% of your revenue", "So you're not ever over-exposed to a single vendor."],
                ].map(([title, body]) => (
                  <li key={title} className="py-5 grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-3 md:gap-6">
                    <div className="serif text-lg">{title}</div>
                    <div className="text-sm text-muted leading-relaxed">{body}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <h2 className="display text-3xl md:text-4xl mb-10">Pricing questions</h2>
          <div className="divide-y divide-rule border-t border-b border-rule">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                  <span className="serif text-lg">{q}</span>
                  <span className="text-muted group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted leading-relaxed max-w-2xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
