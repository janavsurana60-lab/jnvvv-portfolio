"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone/8 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 lg:px-14">
        <Link
          href="/"
          className="font-display disp-tight text-lg font-extrabold tracking-tight text-bone"
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone md:inline-flex md:items-center md:gap-2"
        >
          Start a Project →
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-bone transition-transform ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bone transition-transform ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-bone/8 bg-ink px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.18em] text-lime"
              >
                Start a Project →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
