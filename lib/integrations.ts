export type Integration = {
  slug: string;
  name: string;
  category: "PMS" | "Accounting" | "Messaging" | "Booking" | "Marketing" | "Workflow" | "Automation" | "BI";
  summary: string;
  whatWeDo: string[];
  pairsWith: string[];
};

export const INTEGRATIONS: Integration[] = [
  {
    slug: "clickup",
    name: "ClickUp",
    category: "Workflow",
    summary: "The ops layer. Where every patient journey, hire, and SOP lives.",
    whatWeDo: [
      "Build per-clinic spaces: Front Desk, Clinical, Marketing, HR",
      "Task templates for intake, recall, discharge, hiring",
      "SLA timers on every escalatable workflow",
      "Connect via API to each PMS so patient context follows the task",
    ],
    pairsWith: ["Cliniko", "Halaxy", "Nookal", "Xero"],
  },
  {
    slug: "make",
    name: "Make",
    category: "Automation",
    summary: "Our default automation canvas. Visual flows, enterprise reliability.",
    whatWeDo: [
      "Connect PMS, accounting, marketing and messaging in one scenario",
      "Error-handling and alerting routes feed back into ClickUp",
      "Version control — every flow has a change log we maintain",
    ],
    pairsWith: ["Cliniko", "ClickUp", "Xero", "HotDoc"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Automation",
    summary: "Lighter-weight flows where Make would be overkill. We use both.",
    whatWeDo: [
      "Simple linear flows (webhook → one action)",
      "Apps that Make doesn't support yet",
      "Useful for rapid prototyping a flow before graduating to Make",
    ],
    pairsWith: ["Cliniko", "Halaxy", "Mailchimp"],
  },
  {
    slug: "n8n",
    name: "n8n",
    category: "Automation",
    summary: "Self-hosted automation when compliance or cost rules out SaaS.",
    whatWeDo: [
      "Host inside your own AU cloud / VPC when patient data must not leave",
      "Build flows with unlimited operations",
      "Integrate with custom internal APIs",
    ],
    pairsWith: ["BigQuery", "Postgres"],
  },
  {
    slug: "looker-studio",
    name: "Looker Studio",
    category: "BI",
    summary: "The reporting layer most clinics need. Free, sharable, fast.",
    whatWeDo: [
      "Live dashboards from BigQuery / Google Sheets / CSV",
      "Executive + per-practitioner + per-site views",
      "Scheduled weekly PDF to your inbox",
    ],
    pairsWith: ["BigQuery", "Cliniko", "Nookal"],
  },
  {
    slug: "xero",
    name: "Xero",
    category: "Accounting",
    summary: "The AU default. We sync PMS payments and classify them correctly.",
    whatWeDo: [
      "Nightly sync of bookings, payments, refunds",
      "Correct tax codes and contact mapping",
      "Reconciliation queue in ClickUp for mismatches",
    ],
    pairsWith: ["Cliniko", "Halaxy", "Power Diary"],
  },
  {
    slug: "myob",
    name: "MYOB",
    category: "Accounting",
    summary: "For practices on MYOB. Same story as Xero, different endpoints.",
    whatWeDo: [
      "Sync of sales, payments, and payroll touch-points",
      "Month-end close automation for clinic ops",
    ],
    pairsWith: ["Cliniko", "Halaxy"],
  },
  {
    slug: "hotdoc",
    name: "HotDoc",
    category: "Booking",
    summary: "Patient-facing booking. We wire it properly into the rest of ops.",
    whatWeDo: [
      "On booking: create intake task, welcome sequence, insurance check",
      "Cancel / reschedule flows that don't leave orphaned appointments",
      "Analytics so you know where patients come from",
    ],
    pairsWith: ["Cliniko", "Best Practice"],
  },
  {
    slug: "healthengine",
    name: "Healthengine",
    category: "Booking",
    summary: "Similar scope to HotDoc, different footprint. We support both.",
    whatWeDo: [
      "Review request automation on visit completion",
      "Lead-source attribution to your dashboard",
    ],
    pairsWith: ["Cliniko", "Best Practice"],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "Marketing",
    summary: "Email marketing, segmented by real clinic behaviour.",
    whatWeDo: [
      "Segments driven by PMS data — last visit, service, spend band",
      "Automations: welcome, recall, reactivation, referral",
      "Clean audiences — no more duplicates, no bounces",
    ],
    pairsWith: ["Cliniko", "Halaxy"],
  },
  {
    slug: "twilio",
    name: "Twilio",
    category: "Messaging",
    summary: "SMS for reminders, two-way messaging, and waitlist outreach.",
    whatWeDo: [
      "Reminder cadence tuned per clinic (T-72h, T-24h, T-3h)",
      "Waitlist fill on cancellation",
      "Two-way for confirmations / reschedules into the VA queue",
    ],
    pairsWith: ["Cliniko", "ClickUp"],
  },
  {
    slug: "bigquery",
    name: "BigQuery",
    category: "BI",
    summary: "The warehouse when you have multiple sites or need historical trend.",
    whatWeDo: [
      "Nightly ELT from every PMS + accounting system into a single warehouse",
      "Historical backfill on initial load",
      "Row-level access if you want site managers to see only their data",
    ],
    pairsWith: ["Nookal", "Cliniko", "Xero", "Looker Studio"],
  },
];

export const INTEGRATION_CATEGORIES = [
  "PMS",
  "Booking",
  "Accounting",
  "Messaging",
  "Marketing",
  "Workflow",
  "Automation",
  "BI",
] as const;

export function getIntegration(slug: string) {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
