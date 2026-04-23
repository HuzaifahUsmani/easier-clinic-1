"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compliance", label: "Compliance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-rule bg-background">
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-medium tracking-tight text-lg">
          Easier<span className="serif italic">clinic</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hairline text-sm text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-sm font-medium border border-ink px-4 py-2 hover:bg-ink hover:text-background transition-colors"
          >
            Book a diagnostic
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-sm"
          aria-label="menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-rule">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-sm"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 py-2 text-sm border border-ink text-center"
            >
              Book a diagnostic
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
