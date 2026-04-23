export type Resource = {
  slug: string;
  title: string;
  kind: "template" | "calculator" | "guide";
  summary: string;
  sections?: { title: string; body: string }[];
};

export const RESOURCES: Resource[] = [
  {
    slug: "diagnostic-template",
    title: "Clinic Ops Diagnostic — the template we use",
    kind: "template",
    summary:
      "The one-pager we hand clinic owners at the end of our free Diagnostic call. Use it yourself, share it with your practice manager, or just skip ahead and book the call.",
    sections: [
      {
        title: "Section 1 — Admin load",
        body:
          "Hours per week, per role, split by task type. Ranked by what a non-clinical person could do with the right system.",
      },
      {
        title: "Section 2 — Tool audit",
        body:
          "Every tool in use, what it is paying for, and where data flows break. Rated green / amber / red.",
      },
      {
        title: "Section 3 — Workflow gaps",
        body:
          "The five processes every clinic has that most clinics run manually. Spot which ones are costing you.",
      },
      {
        title: "Section 4 — Opportunity map",
        body:
          "The two or three changes that pay back fastest, with an estimated cost-to-serve impact and time-to-implement.",
      },
    ],
  },
  {
    slug: "onshore-cost-calculator",
    title: "Onshore cost calculator",
    kind: "calculator",
    summary:
      "The interactive tool that shows what hiring this team in-house would cost you. Toggle roles, watch the number move.",
  },
  {
    slug: "loss-calculator",
    title: "Monthly exposure calculator",
    kind: "calculator",
    summary:
      "What your clinic is losing right now to admin burden, no-shows, missed recalls, and billing rework.",
  },
];

export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}
