export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  published: string;
  readTime: string;
  category: string;
  body: { type: "p" | "h2" | "h3" | "ul" | "pull"; text: string | string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "admin-has-doubled",
    title: "Clinic admin has roughly doubled. Here's why, and what to do about it.",
    subtitle: "Three structural changes since 2020 that explain why a GP clinic now spends two hours a day on paperwork after last patient.",
    published: "April 2026",
    readTime: "6 min",
    category: "Industry",
    body: [
      { type: "p", text: "In mid-2025, The Canberra Times ran a piece on the administrative burden falling on Australian GPs. Several clinicians interviewed described the load as having roughly doubled since the early pandemic. That matches what we see inside every allied-health practice we audit. This is the structural explanation." },
      { type: "h2", text: "1. NDIS rewrote the baseline for allied health admin" },
      { type: "p", text: "The scheme's access and review paperwork is real, it is not optional, and it falls on the clinic rather than the scheme. Every allied-health clinic taking plan-managed or agency-managed clients is now running what is effectively a second billing system alongside Medicare. Most are running it in parallel on top of patient management, not integrated with it." },
      { type: "h2", text: "2. Compliance intensified in both directions" },
      { type: "p", text: "RACGP 5th Edition Standards are now in full enforcement. Privacy Act reforms tightened data-handling obligations in a way that touches every clinic, not just the large ones. The MBS bulk-billing incentive changes in late 2025 created a new coding pattern practices had to learn and document. Each change on its own is survivable. Stacked, they create a permanent drag." },
      { type: "h2", text: "3. Tooling fragmented instead of consolidating" },
      { type: "p", text: "A typical allied-health clinic in 2020 ran 2–3 tools. A typical one in 2026 runs 4–7: booking, practice management, accounting, patient messaging, marketing, and increasingly, a separate workflow tool. Each tool is better than the one it replaced. The sum is worse than the parts — because none of them talk to each other." },
      { type: "pull", text: "The clinic tech stack improved. The clinic experience did not. That is an integration problem, not a product problem." },
      { type: "h2", text: "What actually helps" },
      { type: "p", text: "There are three kinds of interventions that move the needle, in increasing order of difficulty." },
      { type: "h3", text: "Cheap: fix the reminder cadence" },
      { type: "p", text: "Most clinics are still running a single-SMS reminder 24 hours out. A three-stage cadence (T-72h, T-24h, T-3h) with two-way reply handling moves no-show rate from 10%+ to sub-5% without adding any headcount. Budget: half a day of setup, ~$40/mo in SMS costs." },
      { type: "h3", text: "Medium: consolidate the reporting layer" },
      { type: "p", text: "You do not need to replace Cliniko / Halaxy / Nookal. You need one dashboard pulling from it, plus accounting, plus your messaging tool. Looker Studio on top of BigQuery will do this for almost nothing — the hard bit is getting data out of each system cleanly. Budget: 2–4 weeks to set up, $200/mo ongoing, halves your reporting burden." },
      { type: "h3", text: "Harder: offload the admin labour to a trained team" },
      { type: "p", text: "The flip side of an automation-heavy operating model is that the work that can't be automated still needs to be done, by somebody who understands the clinic context. A generic VA won't. A clinic-trained VA embedded in your workflows will. Budget: ~$1,800–6,500/mo depending on scope." },
      { type: "h2", text: "Where to start" },
      { type: "p", text: "The cheapest change pays back fastest and almost always buys you political capital for the harder ones. Start with the reminder cadence, watch the no-show rate drop, show the number to the team, then have the consolidation conversation from a position of demonstrated win." },
    ],
  },
  {
    slug: "cliniko-vs-halaxy-vs-nookal",
    title: "Cliniko vs Halaxy vs Nookal — what we actually see across 30+ clinics",
    subtitle: "Opinionated notes from an ops agency that deploys on all three. No affiliate links, no shilling.",
    published: "April 2026",
    readTime: "8 min",
    category: "Systems",
    body: [
      { type: "p", text: "We work across all three systems. We have opinions. Here they are — not because one wins, but because the choice is more contextual than the marketing of any of them suggests." },
      { type: "h2", text: "Cliniko — the default, for good reasons" },
      { type: "p", text: "If you are starting fresh and you do not have a strong reason to pick something else, pick Cliniko. The API is the best-documented of the three. The appointment and patient object models are clean. The support is responsive. Telehealth and payments are first-class." },
      { type: "p", text: "The weakness is reporting. You outgrow the native reports at about six practitioners. At that point you are pulling data into Google Sheets or a warehouse to answer questions the product does not natively surface. That is a solvable problem — but it is a problem." },
      { type: "h2", text: "Halaxy — built on billing" },
      { type: "p", text: "If Medicare and private-health claims are the heart of your admin load, Halaxy's reconciliation features are a genuine advantage. This applies most to specialists and some psychology practices. The tradeoff is a less open ecosystem — the integration surface is narrower and some data is trapped inside the product." },
      { type: "p", text: "We deploy on Halaxy more often than we would otherwise expect because the billing wins are that concrete for the right clinic." },
      { type: "h2", text: "Nookal — the multi-site pick" },
      { type: "p", text: "If you are running more than two locations, Nookal is the one we recommend first. The API was built with multi-site in mind, which sounds small and is actually enormous. Roll-up reporting is tractable in Nookal in a way it is not in Cliniko." },
      { type: "p", text: "Pricing can escalate at scale, and the native dashboards are adequate rather than great. Both are fixable." },
      { type: "pull", text: "The right PMS is a function of your shape, not your preferences. Number of sites, funding mix, and complexity of clinical notes determine the answer." },
      { type: "h2", text: "When you should migrate — and when you shouldn't" },
      { type: "p", text: "Migrations are expensive. A month of lost data quality, two weeks of staff anxiety, and a year of edge cases you forgot about. We try hard to avoid recommending them." },
      { type: "p", text: "Good reasons to migrate: multi-site roll-up the current PMS genuinely can't produce, Medicare reconciliation burden that is eating a full FTE, or an imminent expansion that would force the issue within six months anyway." },
      { type: "p", text: "Bad reasons: dashboard gaps (we can fix those without migrating), integration gaps (same), or a vendor you don't like (change the account manager first)." },
      { type: "h2", text: "The quick answer" },
      { type: "ul", text: [
        "Single-site, starting fresh → Cliniko.",
        "Billing-heavy → Halaxy.",
        "Three-plus sites → Nookal.",
        "Already on something that works → don't migrate.",
      ]},
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
