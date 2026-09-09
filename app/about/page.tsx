import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { capabilities, profile, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>About</span>
        <span className="h-px w-8 bg-bone/16" />
        <span>{profile.role}</span>
      </div>

      <h1 className="font-display disp-tight mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.015em]">
        A REAL PERSON,
        <br />
        <span className="chrome-text">A REAL BUILD.</span>
      </h1>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
        {profile.bio}
      </p>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
        Boilerplate doesn&apos;t get treated as done. Every project here gets
        built to fit the problem in front of it — AI works as a genuine
        collaborator in the loop, not a shortcut around understanding the
        system.
      </p>

      <div className="mt-16 grid grid-cols-2 gap-6 border-y border-bone/8 py-10">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display disp-tight text-3xl font-black text-bone md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24">
        <Reveal>
          <SectionHeader
            index="02"
            label="The Approach"
            title={
              <>
                CAPABILITIES,
                <br />
                NOT CATCHPHRASES.
              </>
            }
          />
        </Reveal>

        <div className="mt-14 flex flex-col divide-y divide-bone/8 border-y border-bone/8">
          {capabilities.map((cap) => (
            <Reveal key={cap.index}>
              <div className="flex flex-col gap-3 py-8 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <div className="flex items-baseline gap-4 md:w-1/3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {cap.index}
                  </span>
                  <h3 className="font-display disp-tight text-xl font-extrabold uppercase md:text-2xl">
                    {cap.title}
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="font-display disp-tight text-3xl font-black uppercase md:text-5xl">
          Whenever it&apos;s time.
        </h2>
        <div className="mt-8">
          <Button href="/contact">Start a Project →</Button>
        </div>
      </div>
    </div>
  );
}
