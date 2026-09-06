"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ArchiveScene = dynamic(() => import("./ArchiveScene"), { ssr: false });

export default function FloatingArchive() {
  const ref = useRef<HTMLDivElement>(null);
  const rotRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState<"sphere" | "cylinder">("sphere");

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div ref={ref} className="tone-light relative h-[140vh] overflow-hidden">
      <div className="sticky top-0 h-screen w-full" style={{ background: "#f4f2ec" }}>
        {mounted && <ArchiveScene layout={layout} rotRef={rotRef} />}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2
            className="font-display disp-tight select-none text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.015em] mix-blend-multiply"
            style={{ color: "#080808" }}
          >
            Work In
            <br />
            Orbit.
          </h2>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">
            A Living Archive
          </p>
        </div>

        <div className="pointer-events-none absolute left-6 top-24 font-mono text-[9px] uppercase tracking-[0.2em] opacity-55 lg:left-14 lg:top-1/2 lg:-translate-y-1/2">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-lime align-middle" />
          Keep scrolling
        </div>

        <div className="pointer-events-none absolute right-6 top-24 text-right font-mono text-[9px] uppercase tracking-[0.2em] opacity-55 lg:bottom-8 lg:right-14 lg:top-auto">
          <p>
            ROT <span ref={rotRef}>000°</span>
          </p>
          <p className="mt-1">4 Systems / 14 Artefacts</p>
        </div>

        <div className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-1 rounded-full border px-1.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{ borderColor: "var(--hairline)" }}
          >
            <span className="hidden px-3 opacity-55 sm:inline">Layout:</span>
            <button
              type="button"
              onClick={() => setLayout("sphere")}
              className="rounded-full px-4 py-2 transition-colors"
              style={{
                background: layout === "sphere" ? "#080808" : "transparent",
                color: layout === "sphere" ? "#f4f2ec" : "inherit",
              }}
            >
              Sphere
            </button>
            <button
              type="button"
              onClick={() => setLayout("cylinder")}
              className="rounded-full px-4 py-2 transition-colors"
              style={{
                background: layout === "cylinder" ? "#080808" : "transparent",
                color: layout === "cylinder" ? "#f4f2ec" : "inherit",
              }}
            >
              Cylinder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
