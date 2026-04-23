const integrations = [
  "Cliniko",
  "Halaxy",
  "Nookal",
  "Power Diary",
  "Jane",
  "Best Practice",
  "Zanda",
  "HotDoc",
  "Healthengine",
  "Xero",
  "MYOB",
  "ClickUp",
  "Make",
  "Zapier",
  "n8n",
  "Looker Studio",
];

export default function IntegrationsStrip() {
  const doubled = [...integrations, ...integrations];
  return (
    <section className="border-y border-rule bg-paper overflow-hidden">
      <div className="py-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center gap-6 text-xs uppercase tracking-widest text-muted mb-6">
          <span>Integrated with</span>
          <span className="h-px flex-1 bg-rule" />
          <span>{integrations.length} tools & counting</span>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap marquee">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="serif text-2xl md:text-3xl px-10 text-muted"
              >
                {name}
                <span className="ml-10 text-rule-strong">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
