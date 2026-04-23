"use client";

import { useState } from "react";

export default function LeadMagnetForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-accent bg-accent-soft p-8">
        <div className="serif text-2xl">Sent.</div>
        <p className="mt-3 text-sm leading-relaxed">
          Check your inbox — the Clinic Ops Diagnostic template is on its way.
          If you don&apos;t see it in five minutes, check spam or reply to any
          email from us and we&apos;ll resend it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="border border-rule bg-surface p-8 space-y-5"
    >
      <div>
        <label className="text-[11px] uppercase tracking-widest text-muted font-mono">
          Your work email
        </label>
        <input
          type="email"
          required
          className="mt-2 w-full px-0 py-2 border-0 border-b border-rule bg-transparent focus:outline-none focus:border-ink"
          placeholder="you@yourclinic.com.au"
        />
      </div>
      <div>
        <label className="text-[11px] uppercase tracking-widest text-muted font-mono">
          Clinic name
        </label>
        <input
          type="text"
          required
          className="mt-2 w-full px-0 py-2 border-0 border-b border-rule bg-transparent focus:outline-none focus:border-ink"
        />
      </div>
      <button
        type="submit"
        className="mt-2 border border-ink bg-ink text-background px-6 py-3 text-sm hover:bg-accent hover:border-accent transition-colors"
      >
        Send me the template
      </button>
      <p className="text-xs text-muted italic leading-relaxed">
        One email, one PDF. No sequence, no chaser. If you want us, you already
        know where to find us.
      </p>
    </form>
  );
}
