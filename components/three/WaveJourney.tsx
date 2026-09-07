"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useContainerProgress } from "@/lib/useContainerProgress";
import { ACCENTS, SmallProject } from "@/lib/content";

const WaveScene = dynamic(() => import("./WaveScene"), { ssr: false });

export default function WaveJourney({ projects }: { projects: SmallProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const progress = useContainerProgress(containerRef);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = projects.length;
  const activeIndex = Math.min(n - 1, Math.floor(progress * n));
  const active = projects[activeIndex];
  const next = projects[(activeIndex + 1) % n];
  const accent = ACCENTS[active.accent];

  return (
    <div ref={containerRef} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && <WaveScene containerRef={containerRef} projects={projects} />}

        {/* Live project panel */}
        <div className="pointer-events-none absolute left-6 top-1/2 max-w-[15rem] -translate-y-1/2 lg:left-14">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-warm-grey">
            What else got built?
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {projects.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={p.slug}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
                  style={{
                    color: isActive ? ACCENTS[p.accent] : "rgba(244,242,236,0.35)",
                  }}
                >
                  {isActive ? "→ " : "· "}
                  {p.title}
                </li>
              );
            })}
          </ul>

          <div
            className="mt-6 border-t pt-4 transition-colors"
            style={{ borderColor: "rgba(244,242,236,0.12)" }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {active.index} — {active.category}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {active.summary}
            </p>
            {active.link ? (
              <a
                href={active.link}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.1em] underline decoration-1 underline-offset-4 transition-colors"
                style={{ color: accent }}
              >
                Visit site →
              </a>
            ) : (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-warm-grey">
                In development
              </p>
            )}
          </div>
        </div>

        {/* Persistent HUD */}
        <div className="pointer-events-none absolute bottom-8 right-6 text-right lg:right-14">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-warm-grey">
            Up Next
          </p>
          <p
            className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: ACCENTS[next.accent] }}
          >
            {next.index} — {next.title}
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-6 font-mono text-[9px] uppercase tracking-[0.18em] text-warm-grey lg:left-14">
          Scroll to explore
        </div>
      </div>
    </div>
  );
}
