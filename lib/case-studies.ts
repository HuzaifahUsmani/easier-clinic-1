export type CaseStudy = {
  slug: string;
  name: string;
  kind: string;
  city: string;
  staff: string;
  lede: string;
  summary: string;
  challenge: string[];
  approach: string[];
  metrics: { label: string; value: number; prefix?: string; suffix?: string; note?: string }[];
  pullQuote: string;
  quoteAttribution: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "metro-physio",
    name: "Metro Physio Group",
    kind: "Multi-site physiotherapy",
    city: "Sydney, NSW",
    staff: "14 staff · 3 clinics",
    lede: "A growing allied-health group burning six hours a week on reporting alone — and still making clinical decisions off two-week-old numbers.",
    summary:
      "A composite drawn from our early partner work with 3-to-5 site physio groups in metro NSW. Numbers below are the blended medians across those engagements in the first 90 days.",
    challenge: [
      "Three Cliniko instances, zero roll-up. Practice manager spent Friday afternoons cutting and pasting spreadsheets.",
      "No-show rate sitting at 11.8% across the group. Reminders were SMS-only, sent 24 hours out, no follow-up.",
      "Recall conversion invisible. Nobody knew how many eligible patients went un-booked each month.",
      "Onboarding new practitioners took 3 weeks per hire, because the SOPs lived in the owner's head.",
    ],
    approach: [
      "Consolidated PMS data into a BigQuery warehouse with nightly syncs from each Cliniko site.",
      "Built a single Looker Studio executive dashboard — site, practitioner, service — live to the owner's phone.",
      "Rebuilt the recall engine in Make with segmented flows: post-op, 6-week, annual review, and cold.",
      "ClickUp workspace for onboarding, with a 10-day checklist per new practitioner. VA runs it.",
    ],
    metrics: [
      { label: "No-show rate — start", value: 11.8, suffix: "%" },
      { label: "No-show rate — day 90", value: 4.1, suffix: "%" },
      { label: "Recall conversion", value: 87, suffix: "%", note: "from untracked" },
      { label: "Admin hours / week saved", value: 34, suffix: " hrs" },
      { label: "Revenue per visit uplift", value: 14, prefix: "+$" },
      { label: "New practitioner ramp", value: 9, suffix: " days", note: "was 21" },
    ],
    pullQuote:
      "We were looking for a VA agency. What we got was an operating system. The dashboards alone changed how I run the group.",
    quoteAttribution: "Owner · 3-site physio group, Sydney",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
