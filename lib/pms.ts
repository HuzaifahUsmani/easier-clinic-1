export type PMS = {
  slug: string;
  name: string;
  tagline: string;
  vertical: string;
  strengths: string[];
  limitations: string[];
  automations: { title: string; body: string }[];
  dashboards: string[];
  notes: string;
};

export const PMS_LIST: PMS[] = [
  {
    slug: "cliniko",
    name: "Cliniko",
    tagline: "The default for Australian allied health. We know every corner of it.",
    vertical: "Physio, chiro, osteo, podiatry, psychology",
    strengths: [
      "Clean REST API with well-documented endpoints",
      "Reliable telehealth + payments stack",
      "Multi-site support without add-on cost",
      "Excellent appointment and patient object model",
    ],
    limitations: [
      "Native reporting is shallow — you outgrow it around 6 practitioners",
      "No built-in recall automation worth relying on",
      "Forms & intake are functional but rigid",
    ],
    automations: [
      {
        title: "Recall engine",
        body: "Pull patients by last-visit type and date, segment by condition, deliver via SMS / email with a booking deep-link. Re-engage at 6, 12 and 24 weeks.",
      },
      {
        title: "New-patient welcome",
        body: "On new booking: send the welcome email, create the intake form link, flag insurance verification for the VA, create a ClickUp onboarding card.",
      },
      {
        title: "Billing reconciliation",
        body: "Nightly sync Cliniko payments to Xero. Flag mismatched transactions and claim rejections to a ClickUp queue.",
      },
      {
        title: "No-show workflow",
        body: "At T-72h, T-24h and T-3h reminder cadence. On no-show, auto-offer the slot to a waitlist segment. Record outcome.",
      },
    ],
    dashboards: [
      "No-show rate by practitioner, service, day-of-week",
      "Utilisation % per practitioner (booked vs available)",
      "Revenue per visit trend, 7 / 30 / 90 day",
      "Recall eligibility and conversion funnel",
      "Waitlist throughput",
    ],
    notes: "We have deployed on 20+ Cliniko instances. Migration from legacy systems is straightforward.",
  },
  {
    slug: "halaxy",
    name: "Halaxy",
    tagline: "Strong on billing and claims. We wire around its reporting gaps.",
    vertical: "Allied health, psychology, specialists",
    strengths: [
      "Medicare / private health integration is among the best in AU",
      "Built-in telehealth and online scheduling",
      "Strong support for multi-practitioner businesses",
      "Free tier lets small clinics start without commitment",
    ],
    limitations: [
      "Reporting is trapped inside the product — no external API for some data",
      "Customisation of templates and forms requires workarounds",
      "Marketplace integrations are thinner than Cliniko",
    ],
    automations: [
      {
        title: "Claim reconciliation",
        body: "Daily sweep of claim status. Rejects fed into a VA queue in ClickUp, resolutions logged with SLA timers.",
      },
      {
        title: "Invoice follow-up",
        body: "Aged invoices → automated friendly reminder at 14 / 30 / 45 days. Escalation to VA at 60.",
      },
      {
        title: "Referrer tracking",
        body: "On new referral: tag referrer in CRM, fire thank-you automation, schedule the 30-day outcome update back to the referrer.",
      },
    ],
    dashboards: [
      "Claim success rate and average days-to-payment",
      "Revenue by funding source (Medicare / private / self)",
      "Referrer performance — volume, revenue, retention",
      "Practitioner productivity",
    ],
    notes: "Where Halaxy lacks a clean API, we pull via CSV exports on schedule, normalised into BigQuery.",
  },
  {
    slug: "nookal",
    name: "Nookal",
    tagline: "Excellent for multi-site allied health. Its API is your friend.",
    vertical: "Physio, chiro, osteo, multi-site groups",
    strengths: [
      "API built for multi-site roll-ups from day one",
      "Strong clinical notes templates",
      "Built-in NDIS-aware workflows",
      "Mature mobile app for practitioners",
    ],
    limitations: [
      "Pricing can escalate at scale",
      "Native dashboards are serviceable but generic",
      "Fewer marketplace add-ons than Cliniko",
    ],
    automations: [
      {
        title: "Multi-site roll-up",
        body: "Nightly sync of bookings, payments, and notes per site into a single warehouse. Cross-site comparison ready by 7am.",
      },
      {
        title: "NDIS plan-tracking",
        body: "On plan start: schedule the quarterly review, track plan consumption, alert when 80% consumed. VA drafts the reassessment letter.",
      },
      {
        title: "Practitioner utilisation optimiser",
        body: "Weekly report of under-utilised blocks per practitioner, suggested interventions (waitlist fill, block-move), actioned by VA.",
      },
    ],
    dashboards: [
      "Group-level P&L by site",
      "Practitioner utilisation heatmap",
      "NDIS plan utilisation forecasting",
      "Clinical outcome measures (where collected)",
    ],
    notes: "Our preferred PMS for groups scaling past three sites.",
  },
  {
    slug: "power-diary",
    name: "Power Diary",
    tagline: "A favourite in psychology and small group practices. Deeply configurable.",
    vertical: "Psychology, counselling, speech, OT",
    strengths: [
      "Rich template engine for notes and intake",
      "Stripe / Medicare integration out of the box",
      "Group-session workflows done properly",
      "Solid API for export",
    ],
    limitations: [
      "UI is dated relative to Cliniko / Halaxy",
      "Onboarding curve for new admins is real",
      "No built-in multi-site roll-up",
    ],
    automations: [
      {
        title: "Intake-to-first-session flow",
        body: "Forms → Power Diary client record → insurance check → welcome call scheduled → first-session notes template pre-populated.",
      },
      {
        title: "Group session billing",
        body: "Split billing across participants with correct Medicare item numbers. Reconcile weekly.",
      },
      {
        title: "Supervisor queue",
        body: "Auto-route high-risk client flags to the senior clinician's review queue in ClickUp, SLA-timed.",
      },
    ],
    dashboards: [
      "Client retention cohorts",
      "Clinician caseload and burnout indicators",
      "Mental health care plan throughput",
      "Revenue per client lifecycle",
    ],
    notes: "We've rebuilt recall + intake for several Power Diary psychology groups.",
  },
  {
    slug: "jane",
    name: "Jane",
    tagline: "A newer entrant in AU allied health. Clean product, growing ecosystem.",
    vertical: "Physio, multi-disciplinary allied health",
    strengths: [
      "Modern UX — practitioners adopt it quickly",
      "Charting and online booking are excellent",
      "Growing integration marketplace",
      "Transparent pricing",
    ],
    limitations: [
      "AU-specific features (Medicare, NDIS) are maturing",
      "Smaller local community than Cliniko",
      "Some workflows still assume North American market",
    ],
    automations: [
      {
        title: "Intake → first-visit prep",
        body: "Online booking → custom intake form → charting template pre-set → arrival SMS → no-show protocol armed.",
      },
      {
        title: "Marketing automation hook",
        body: "Jane webhooks into Make → CRM → Mailchimp / Klaviyo → review-request at 3 visits.",
      },
    ],
    dashboards: [
      "First-visit conversion from online booking",
      "Retention by acquisition channel",
      "Practitioner-specific NPS where captured",
    ],
    notes: "We've done a handful of Jane roll-outs and expect the share to grow.",
  },
];

export function getPMS(slug: string) {
  return PMS_LIST.find((p) => p.slug === slug);
}
