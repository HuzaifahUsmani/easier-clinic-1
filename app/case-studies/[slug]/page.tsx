import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import CountUp from "@/components/CountUp";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return notFound();

  return (
    <>
      <PageHero
        kicker={`Case study · ${c.kind}`}
        title={<>{c.name}</>}
        lede={c.lede}
      />

      {/* CONTEXT STRIP */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-4 gap-6 text-sm">
          <KV label="Segment" value={c.kind} />
          <KV label="Location" value={c.city} />
          <KV label="Scale" value={c.staff} />
          <KV label="Engagement" value="90-day roll-out + QBR" />
        </div>
      </section>

      {/* METRICS — the headline outcomes */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest text-accent mb-6">
                What changed
              </p>
              <h2 className="display text-3xl md:text-5xl">
                Six numbers. <span className="italic">First ninety days.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-muted md:text-lg leading-relaxed self-end">
              {c.summary}
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule border-y border-rule">
            {c.metrics.map((m) => (
              <div key={m.label} className="p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-widest text-muted font-mono">
                  {m.label}
                </div>
                <div className="mt-3 display text-5xl md:text-6xl">
                  <CountUp
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.value % 1 !== 0 ? 1 : 0}
                  />
                </div>
                {m.note && (
                  <div className="mt-2 text-xs text-muted italic">{m.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-warn mb-6">
              The problem
            </p>
            <h3 className="display text-3xl mb-8">What was broken.</h3>
            <ul className="space-y-5">
              {c.challenge.map((item) => (
                <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 leading-relaxed">
                  <span className="text-muted">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-6">
              What we did
            </p>
            <h3 className="display text-3xl mb-8">The fix.</h3>
            <ul className="space-y-5">
              {c.approach.map((item) => (
                <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 leading-relaxed">
                  <span className="text-accent">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="border-b border-rule bg-ink text-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <figure className="max-w-3xl">
            <blockquote className="serif text-3xl md:text-5xl leading-[1.15]">
              &ldquo;{c.pullQuote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 text-xs uppercase tracking-widest text-background/60">
              {c.quoteAttribution}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Want numbers like these for <span className="italic">your</span> clinic?
            </h2>
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

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted font-mono">
        {label}
      </div>
      <div className="mt-1 serif text-lg">{value}</div>
    </div>
  );
}
