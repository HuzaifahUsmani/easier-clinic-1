import { ReactNode } from "react";

export default function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: string;
}) {
  return (
    <section className="border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            {kicker && (
              <p className="text-sm text-muted mb-8">{kicker}</p>
            )}
            <h1 className="display text-4xl md:text-6xl lg:text-7xl">{title}</h1>
          </div>
          {lede && (
            <div className="md:col-span-4 md:pl-8 md:border-l border-rule text-muted leading-relaxed md:mt-3">
              {lede}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
