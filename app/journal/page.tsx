import Link from "next/link";
import PageHero from "@/components/PageHero";
import { POSTS } from "@/lib/posts";

export default function JournalIndex() {
  return (
    <>
      <PageHero
        kicker="Journal"
        title={
          <>
            Field notes from inside
            <br />
            <span className="italic">Australian clinic ops.</span>
          </>
        }
        lede="What we learn from the work. Written for practice managers and clinic owners, not for SEO."
      />

      <section className="border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <ul className="divide-y divide-rule border-t border-b border-rule">
            {POSTS.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="block py-10 grid md:grid-cols-12 gap-6 items-baseline group"
                >
                  <div className="md:col-span-1 text-sm text-muted tabular-nums font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-2 text-[11px] uppercase tracking-widest text-muted font-mono">
                    {p.category}
                    <div className="mt-1 text-xs opacity-80">
                      {p.published} · {p.readTime}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="serif text-2xl md:text-3xl group-hover:text-accent transition-colors leading-tight">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-muted leading-relaxed">{p.subtitle}</p>
                  </div>
                  <div className="md:col-span-1 text-right text-sm hairline">
                    Read →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
