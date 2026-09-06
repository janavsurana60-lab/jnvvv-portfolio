import type { Metadata } from "next";
import { profile } from "@/lib/content";
import StatusPill from "@/components/StatusPill";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>Contact</span>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h1 className="font-display disp-tight text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.015em]">
            SOMETHING
            <br />
            <span className="chrome-text">WORTH STARTING?</span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
            Details get a reply within a day or two. If it&apos;s a fit,
            specifics get worked out from there.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6 border-t border-bone/8 pt-10">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block font-mono text-sm text-bone transition-colors hover:text-lime"
              >
                {profile.email} →
              </a>
            </div>
            <StatusPill label="Available for work" />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
