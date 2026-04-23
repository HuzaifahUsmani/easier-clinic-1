"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
  { href: "/hiring-onshore", label: "Hire onshore" },
  { href: "/compliance", label: "Compliance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-rule bg-background sticky top-0 z-30">
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="font-medium tracking-tight text-lg">
          Easier<span className="serif italic">clinic</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-1.5 text-sm transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[15px] h-[2px] bg-ink" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
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
