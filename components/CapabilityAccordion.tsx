"use client";

import { useState } from "react";
import { ACCENTS, Capability } from "@/lib/content";
import { handleSpotlightMove } from "@/lib/spotlight";

export default function CapabilityAccordion({
  items,
}: {
  items: Capability[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.slug ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((cap) => {
        const isOpen = open === cap.slug;
        const accent = ACCENTS[cap.accent];

        return (
          <div
            key={cap.slug}
            onPointerMove={handleSpotlightMove}
            className="spotlight-card group relative overflow-hidden rounded-2xl border transition-colors"
            style={
              {
                borderColor: isOpen ? accent : "var(--hairline)",
                background: isOpen ? "transparent" : "var(--color-surface)",
                "--spot-color": accent,
              } as React.CSSProperties
            }
          >
            <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cap.slug)}
                aria-expanded={isOpen}
                aria-controls={`panel-${cap.slug}`}
                className="flex w-full items-center gap-6 px-6 py-6 text-left md:px-8"
              >
                <span
                  className="font-mono text-[10px] tracking-[0.18em]"
                  style={{ color: isOpen ? accent : "var(--color-muted)" }}
                >
                  {cap.index}
                </span>

                <span
                  className="font-display disp-tight flex-1 text-2xl font-extrabold uppercase leading-none tracking-tight transition-colors md:text-4xl"
                  style={{ color: isOpen ? accent : undefined }}
                >
                  {cap.title}
                </span>

                <span
                  className="hidden font-mono text-[9px] uppercase tracking-[0.14em] md:inline"
                  style={{ color: isOpen ? accent : "var(--color-warm-grey)" }}
                >
                  {cap.eyebrow}
                </span>

                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm"
                  style={{
                    borderColor: isOpen ? accent : "var(--hairline)",
                    color: isOpen ? accent : "var(--color-muted)",
                  }}
                  aria-hidden="true"
                >
                  {isOpen ? "×" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={`panel-${cap.slug}`}
              hidden={!isOpen}
              className="border-t px-6 pb-7 pt-6 md:px-8"
              style={{ borderColor: "var(--hairline)" }}
            >
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {cap.description}
              </p>
              <p className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-warm-grey">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
                {cap.tech.join(" · ")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
