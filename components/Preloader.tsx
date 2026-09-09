"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { profile } from "@/lib/content";

const PHASES = [
  "Systems waking up",
  "Telemetry syncing",
  "Grid coming into focus",
  "Sensors aligning",
  "Uplink locking in",
  "Frames coming through",
];

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [armed, setArmed] = useState(false);

  // Only run once per browser session.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloaded") === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setDone(true);
      return;
    }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;

    const finish = () => {
      try {
        sessionStorage.setItem("preloaded", "1");
      } catch {}
      setDone(true);
    };

    if (reduced) {
      finish();
      return;
    }

    let raf = 0;
    let value = 0;
    let settle = 0;
    const start = performance.now();

    // Failsafe: the animation below is driven entirely by requestAnimationFrame,
    // which a browser throttles to ~0 fps for a backgrounded or fully occluded
    // window. Without this, the tick loop would never reach 100 and the
    // full-screen overlay would hide the whole site until the tab regained
    // focus. A one-shot setTimeout is throttled far less aggressively, so it
    // clears the overlay no matter what. The normal path finishes in ~2s.
    const failsafe = window.setTimeout(finish, 2800);

    const tick = (now: number) => {
      const elapsed = now - start;
      // ease toward 100 over ~1.6s
      const target = Math.min(100, (elapsed / 1600) * 100);
      value += (target - value) * 0.25;
      setProgress(value);

      if (value >= 99.4) {
        setProgress(100);
        settle = window.setTimeout(finish, 380);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.clearTimeout(settle);
    };
  }, [armed, reduced]);

  if (done || !armed) return null;

  const pct = Math.round(progress);
  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor((pct / 100) * PHASES.length))];
  const step = Math.min(PHASES.length, Math.floor((pct / 100) * PHASES.length) + 1);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-300"
      style={{ opacity: pct === 100 ? 0 : 1 }}
    >
      <p className="font-display disp-tight text-sm font-extrabold tracking-tight text-bone/82">
        {profile.name}
      </p>

      <p className="font-display mt-4 text-[clamp(3rem,12vw,8rem)] font-black leading-none tracking-[-0.02em] text-bone">
        {String(pct).padStart(3, "0")}
        <span className="ml-1 align-top font-mono text-xs text-muted">%</span>
      </p>

      <div className="mt-6 h-px w-[min(320px,60vw)] bg-bone/12">
        <div
          className="h-px bg-lime transition-[width] duration-100 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>{phase}</span>
        <span className="h-px w-6 bg-bone/16" />
        <span>
          {String(step).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
