import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { getResource } from "@/lib/resources";

export default function DiagnosticTemplatePage() {
  const r = getResource("diagnostic-template");
  if (!r) return null;

  return (
    <>
      <PageHero
        kicker="Template · Free"
        title={<>{r.title}</>}
        lede={r.summary}
      />

      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12">
          {/* Sections */}
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-muted mb-6">
              What&apos;s inside
            </div>
            <div className="divide-y divide-rule border-t border-b border-rule">
              {r.sections?.map((s, i) => (
                <div key={s.title} className="py-6 grid grid-cols-[auto_1fr] gap-5">
                  <span className="text-xs text-muted tabular-nums font-mono mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="serif text-xl">{s.title}</div>
                    <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted italic leading-relaxed">
              A PDF version is emailed after you submit. Same content, printable
              A4, room for notes on the right-hand margin — because you&apos;ll
              fill it in, not bin it.
            </p>
          </div>

          {/* Form */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <LeadMagnetForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
