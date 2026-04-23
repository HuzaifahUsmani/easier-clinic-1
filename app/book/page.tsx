"use client";

import { useState } from "react";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-6">
            <p className="text-sm text-muted mb-8">
              Free Practice Ops Diagnostic
            </p>
            <h1 className="display text-4xl md:text-6xl">
              Let&apos;s see what&apos;s{" "}
              <span className="italic">actually</span> costing you time.
            </h1>
            <p className="mt-8 text-muted md:text-lg leading-relaxed max-w-md">
              Sixty minutes. No sales pitch. You walk away with a written
              one-page map of the highest-leverage ops wins in your clinic.
            </p>

            <dl className="mt-12 divide-y divide-rule border-t border-b border-rule text-sm">
              {[
                ["Duration", "60 minutes"],
                ["Format", "Video call with an Australia-based ops lead"],
                ["Cost", "Nothing. Ever. Not even if we don't work together."],
                ["You keep", "A written 1-page opportunity map"],
                ["Next step", "Optional. Seriously."],
              ].map(([k, v]) => (
                <div key={k} className="py-4 grid grid-cols-[8rem_1fr] gap-6">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-6 md:col-start-8">
            {submitted ? (
              <div className="border border-rule p-8 md:p-10">
                <h2 className="serif text-2xl">You&apos;re in.</h2>
                <p className="mt-4 text-muted leading-relaxed">
                  We reply within one business day with a calendar link. Check
                  your inbox.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="border border-rule p-8 md:p-10 space-y-6 bg-surface"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="First name" required name="firstName" />
                  <Field label="Last name" required name="lastName" />
                </div>
                <Field label="Work email" required type="email" name="email" />
                <Field label="Clinic name" required name="clinic" />
                <div className="grid sm:grid-cols-2 gap-6">
                  <Select
                    label="Clinic type"
                    name="type"
                    options={[
                      "Allied health",
                      "Psychology / mental health",
                      "Dental",
                      "Cosmetic / aesthetics",
                      "General practice",
                      "Other",
                    ]}
                  />
                  <Select
                    label="Team size"
                    name="size"
                    options={["1–2", "3–5", "6–10", "11–20", "20+"]}
                  />
                </div>
                <Field
                  label="What is hurting most right now?"
                  textarea
                  name="pain"
                  placeholder="e.g. We spend 20+ hrs/week on recall admin and still lose patients."
                />

                <button
                  type="submit"
                  className="w-full border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
                >
                  Send it through
                </button>

                <p className="text-xs text-muted">
                  We reply within one business day. Privacy Act 1988 compliant.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  type = "text",
  name,
  textarea,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  name: string;
  textarea?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full px-0 py-2 border-0 border-b border-rule bg-transparent focus:outline-none focus:border-ink transition-colors";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted">
        {label} {required && <span>*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={3}
          className={`mt-2 ${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={`mt-2 ${base}`}
        />
      )}
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      <select
        name={name}
        className="mt-2 w-full px-0 py-2 border-0 border-b border-rule bg-transparent focus:outline-none focus:border-ink transition-colors"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
