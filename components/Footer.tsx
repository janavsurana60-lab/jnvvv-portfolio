import Link from "next/link";
import { navLinks, profile } from "@/lib/content";
import StatusPill from "./StatusPill";

export default function Footer() {
  return (
    <footer className="border-t border-bone/8">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display disp-tight text-lg font-extrabold text-bone">
              {profile.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.1em] text-bone/82 transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Contact
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.1em] text-bone/82 transition-colors hover:text-lime"
            >
              {profile.email} →
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-bone/8 pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-warm-grey md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name} — EST. {profile.est}
          </span>
          <StatusPill label="Available for work" />
        </div>

        <p className="mt-6 font-mono text-[8px] normal-case tracking-normal text-warm-grey/70">
          Visual direction tips its hat to{" "}
          <a
            href="https://jstechlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-warm-grey/40 underline-offset-2 transition-colors hover:text-lime"
          >
            jstechlabs.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
