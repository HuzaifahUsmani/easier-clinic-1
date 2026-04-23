import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function JournalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const otherPosts = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-rule">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="mb-10">
            <Link href="/journal" className="hairline text-xs uppercase tracking-widest text-muted">
              ← Journal
            </Link>
          </div>
          <div className="text-[11px] uppercase tracking-widest text-accent font-mono mb-6">
            {post.category} · {post.published} · {post.readTime}
          </div>
          <h1 className="display text-4xl md:text-6xl leading-[1.05]">
            {post.title}
          </h1>
          <p className="mt-8 serif text-xl md:text-2xl text-muted leading-snug">
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* BODY */}
      <article className="border-b border-rule">
        <div className="max-w-[720px] mx-auto px-6 lg:px-10 py-16 md:py-24 space-y-6 md:text-lg leading-relaxed">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="display text-3xl md:text-4xl mt-12 mb-2">
                  {block.text as string}
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3 key={i} className="serif text-xl md:text-2xl mt-8 mb-1">
                  {block.text as string}
                </h3>
              );
            }
            if (block.type === "pull") {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-2 border-accent pl-6 serif text-2xl md:text-3xl italic leading-snug"
                >
                  &ldquo;{block.text as string}&rdquo;
                </blockquote>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="space-y-2 pl-6 list-disc marker:text-muted">
                  {(block.text as string[]).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              );
            }
            const isFirstP =
              block.type === "p" &&
              post.body.findIndex((b) => b.type === "p") === i;
            return (
              <p
                key={i}
                className={`text-foreground ${isFirstP ? "dropcap" : ""}`}
              >
                {block.text as string}
              </p>
            );
          })}
        </div>
      </article>

      {/* MORE */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="text-xs uppercase tracking-widest text-muted mb-8">
            More from the journal
          </div>
          <ul className="grid md:grid-cols-2 gap-6">
            {otherPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="block p-8 border border-rule hover:border-ink transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-widest text-muted font-mono mb-3">
                    {p.category} · {p.readTime}
                  </div>
                  <div className="serif text-xl md:text-2xl leading-tight">
                    {p.title}
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
