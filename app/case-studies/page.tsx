import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function CaseStudiesIndex() {
  return (
    <>
      <PageHero
        kicker="Case studies"
        title={
          <>
            Numbers, not adjectives.
            <br />
            <span className="italic">What the work actually produced.</span>
          </>
        }
        lede="Each case study is a composite drawn from real partner engagements in the same segment. Numbers are blended medians from the first 90 days. No names, no logos — because our clients don't want the attention."
      />

      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {CASE_STUDIES.map((c, i) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="block py-10 grid md:grid-cols-12 gap-6 items-baseline group"
              >
                <div className="md:col-span-1 text-sm text-muted tabular-nums font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {c.kind}
                  </div>
                  <h2 className="mt-2 serif text-2xl md:text-3xl group-hover:text-accent transition-colors">
                    {c.name}
                  </h2>
                  <div className="mt-1 text-sm text-muted">
                    {c.city} · {c.staff}
                  </div>
                </div>
                <p className="md:col-span-6 text-muted leading-relaxed">
                  {c.lede}
                </p>
                <div className="md:col-span-1 text-right text-sm hairline">
                  Read &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
