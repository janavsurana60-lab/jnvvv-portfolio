import type { Metadata } from "next";
import Button from "@/components/Button";
import WaveJourney from "@/components/three/WaveJourney";
import { smallProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab",
  description: "Smaller builds and experiments.",
};

export default function LabPage() {
  return (
    <div>
      <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          <span>Lab</span>
          <span className="h-px w-8 bg-bone/16" />
          <span>{smallProjects.length} Builds</span>
        </div>

        <h1 className="font-display disp-tight mt-6 text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.015em]">
          SMALLER
          <br />
          BUILDS.
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          Experiments and single-purpose tools — the ones that don&apos;t
          warrant a full case file, kept here where they can still be
          poked at.
        </p>

        <div className="mt-10">
          <Button href="/contact">Start a Project →</Button>
        </div>
      </div>

      <WaveJourney projects={smallProjects} />

      <div className="h-32" />
    </div>
  );
}
