import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { INTEGRATIONS, getIntegration } from "@/lib/integrations";

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export default async function IntegrationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIntegration(slug);
  if (!i) return notFound();

  return (
    <>
      <PageHero
        kicker={`${i.category} · Integration`}
        title={
          <>
            {i.name}, <span className="italic">in our hands.</span>
          </>
        }
        lede={i.summary}
      />

      {/* WHAT WE DO */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                How we deploy it
              </p>
              <h2 className="display text-3xl md:text-4xl">
                The four or five things we configure on day one.
              </h2>
            </div>
            <ul className="md:col-span-7 md:col-start-6 divide-y divide-rule border-t border-b border-rule">
              {i.whatWeDo.map((w, idx) => (
                <li key={w} className="py-5 grid grid-cols-[auto_1fr] gap-5">
                  <span className="text-xs text-muted tabular-nums font-mono mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PAIRS WITH */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
          <div className="text-xs uppercase tracking-widest text-muted mb-6">
            Typically paired with
          </div>
          <div className="flex flex-wrap gap-3">
            {i.pairsWith.map((other) => (
              <span
                key={other}
                className="border border-rule-strong bg-background px-4 py-2 text-sm"
              >
                {other}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MORE */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-6">
            <div className="text-xs uppercase tracking-widest text-muted">
              More in {i.category}
            </div>
            <Link href="/integrations" className="hairline text-sm">
              All integrations →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {INTEGRATIONS.filter(
              (o) => o.category === i.category && o.slug !== i.slug
            )
              .slice(0, 3)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`/integrations/${o.slug}`}
                  className="block p-6 border border-rule hover:border-ink transition-colors"
                >
                  <div className="serif text-xl">{o.name}</div>
                  <div className="mt-2 text-sm text-muted leading-snug">
                    {o.summary}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Want us to wire {i.name} into <span className="italic">your</span> stack?
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
