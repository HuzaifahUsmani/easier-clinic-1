import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
} from "@/lib/integrations";

export default function IntegrationsIndex() {
  return (
    <>
      <PageHero
        kicker="Integrations"
        title={
          <>
            Every tool we&apos;ve wired.
            <br />
            <span className="italic">And how it fits.</span>
          </>
        }
        lede="A clinic runs on four to seven disconnected tools. We connect the ones you already have, and stop you buying the ones you don't need."
      />

      {INTEGRATION_CATEGORIES.map((cat) => {
        const items = INTEGRATIONS.filter((i) => i.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="border-b border-rule">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
              <div className="grid md:grid-cols-12 gap-10 mb-10">
                <div className="md:col-span-4">
                  <div className="text-xs uppercase tracking-widest text-accent font-mono">
                    {cat}
                  </div>
                  <div className="mt-2 serif text-sm text-muted">
                    {items.length} integration{items.length === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="md:col-span-8 divide-y divide-rule border-t border-b border-rule">
                  {items.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/integrations/${i.slug}`}
                      className="block py-6 grid grid-cols-[1fr_auto] gap-4 items-baseline group"
                    >
                      <div>
                        <div className="serif text-xl group-hover:text-accent transition-colors">
                          {i.name}
                        </div>
                        <div className="mt-1 text-sm text-muted leading-snug">
                          {i.summary}
                        </div>
                      </div>
                      <div className="text-xs text-muted hairline">Detail →</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Running something we haven&apos;t listed?
            </h2>
            <p className="mt-6 text-muted md:text-lg leading-relaxed">
              We&apos;ve wired up most tools in the Australian clinic ecosystem,
              and we add two or three new ones a quarter. Tell us yours on the
              Diagnostic call.
            </p>
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
