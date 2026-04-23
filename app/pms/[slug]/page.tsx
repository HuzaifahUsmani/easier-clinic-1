import Link from "next/link";
import { notFound } from "next/navigation";
import { PMS_LIST, getPMS } from "@/lib/pms";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return PMS_LIST.map((p) => ({ slug: p.slug }));
}

export default async function PMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPMS(slug);
  if (!p) return notFound();

  return (
    <>
      <PageHero
        kicker={`For clinics on ${p.name}`}
        title={
          <>
            {p.name}, <span className="italic">fully wired.</span>
          </>
        }
        lede={p.tagline}
      />

      {/* STRENGTHS + LIMITATIONS */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-6">
              Why we like it
            </p>
            <h2 className="display text-3xl mb-8">What {p.name} does well.</h2>
            <ul className="space-y-4">
              {p.strengths.map((s) => (
                <li key={s} className="grid grid-cols-[1rem_1fr] gap-3 leading-relaxed">
                  <span className="text-accent">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-warn mb-6">
              Where we step in
            </p>
            <h2 className="display text-3xl mb-8">What we fix around it.</h2>
            <ul className="space-y-4">
              {p.limitations.map((s) => (
                <li key={s} className="grid grid-cols-[1rem_1fr] gap-3 leading-relaxed">
                  <span className="text-warn">−</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AUTOMATIONS */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                Automation playbook
              </p>
              <h2 className="display text-3xl md:text-5xl">
                What we typically build on {p.name}.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-muted leading-relaxed self-end md:text-lg">
              Not every flow is right for every clinic. On the Diagnostic we
              scope the two or three that pay back inside 30 days.
            </div>
          </div>

          <div className="divide-y divide-rule border-t border-b border-rule">
            {p.automations.map((a, i) => (
              <div key={a.title} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-sm text-muted tabular-nums font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-4 serif text-xl md:text-2xl">{a.title}</h3>
                <p className="md:col-span-7 text-muted leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARDS */}
      <section className="border-b border-rule bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest text-muted mb-6">
                Reporting built on {p.name}
              </p>
              <h2 className="display text-3xl md:text-5xl">
                Questions you could not answer, <span className="italic">answered.</span>
              </h2>
              <p className="mt-6 text-muted leading-relaxed">{p.notes}</p>
            </div>
            <ul className="md:col-span-6 md:col-start-7 divide-y divide-rule border-t border-b border-rule">
              {p.dashboards.map((d) => (
                <li key={d} className="py-4 serif text-lg">
                  — {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTHER PMS */}
      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
          <div className="text-xs uppercase tracking-widest text-muted mb-6">
            On a different PMS?
          </div>
          <div className="flex flex-wrap gap-4">
            {PMS_LIST.filter((other) => other.slug !== p.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/pms/${other.slug}`}
                className="border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-background transition-colors"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Want this running on <span className="italic">your</span> {p.name}?
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
