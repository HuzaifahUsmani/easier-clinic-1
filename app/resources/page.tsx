import Link from "next/link";
import PageHero from "@/components/PageHero";
import { RESOURCES } from "@/lib/resources";

export default function ResourcesIndex() {
  return (
    <>
      <PageHero
        kicker="Resources"
        title={
          <>
            The tools we use on the Diagnostic.
            <br />
            <span className="italic">Yours, free.</span>
          </>
        }
        lede="We'd rather you arrived at the Diagnostic call already warmed up. These are the same templates and calculators we use internally — not lead-magnet fluff."
      />

      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="divide-y divide-rule border-t border-b border-rule">
            {RESOURCES.map((r, i) => {
              const href = r.kind === "template" ? `/resources/${r.slug}` : linkForCalc(r.slug);
              return (
                <Link
                  key={r.slug}
                  href={href}
                  className="block py-8 grid md:grid-cols-12 gap-6 items-baseline group"
                >
                  <div className="md:col-span-1 text-sm text-muted tabular-nums font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-1 text-[10px] uppercase tracking-widest text-accent font-mono">
                    {r.kind}
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="serif text-2xl group-hover:text-accent transition-colors">
                      {r.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {r.summary}
                    </p>
                  </div>
                  <div className="md:col-span-3 text-right text-sm hairline">
                    {r.kind === "template" ? "Download →" : "Open →"}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function linkForCalc(slug: string) {
  if (slug === "onshore-cost-calculator") return "/hiring-onshore";
  if (slug === "loss-calculator") return "/#ch-03";
  return "/";
}
