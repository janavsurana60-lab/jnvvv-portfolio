import Link from "next/link";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import StatusPill from "@/components/StatusPill";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import SystemDiagram from "@/components/SystemDiagram";
import CapabilityAccordion from "@/components/CapabilityAccordion";
import FloatingArchive from "@/components/three/FloatingArchive";
import { capabilities, marqueeItems, process, profile, projects, stats } from "@/lib/content";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* 01 — Hero (dark) */}
      <section className="mx-auto max-w-content px-6 pb-20 pt-20 lg:px-14 lg:pt-32">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          <span>{profile.name} / 01</span>
          <span className="h-px w-8 bg-bone/16" />
          <span>Digital Product Studio, Solo</span>
        </div>

        <h1 className="font-display mt-9 text-[clamp(3rem,11vw,9.5rem)] font-black uppercase leading-[0.84] tracking-[-0.015em]">
          <span className="chrome-text">BUILT</span>
          <br />
          <span className="text-bone">FAST.</span>
          <br />
          <span className="text-bone/34">SHIPPED REAL.</span>
        </h1>

        <p className="mt-9 max-w-md text-base leading-relaxed text-muted">
          {profile.bio}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <StatusPill label="Available for work" />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact">Start a Project →</Button>
          <Button href="/work" variant="secondary">
            View Work →
          </Button>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      {/* 02 — What I Build (light) */}
      <Section tone="light">
        <Reveal>
          <SectionHeader
            index="02"
            label="What Gets Built"
            title="WHAT GETS BUILT SOLVES IT,"
            closer="never the thing that's easiest to template."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-10 border-t hairline pt-10 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
              Approach / 01
            </p>
            <h3 className="font-display disp-tight mt-4 text-2xl font-extrabold md:text-3xl">
              Depth, not breadth.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">
              Most agencies spread thin across a menu of services. Here, one
              build gets the full depth at a time — understood well enough
              that the calls a checklist can&apos;t make still get made.
            </p>
          </Reveal>

          <Reveal className="border-t hairline pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
              Ownership
            </p>
            <h3 className="font-display disp-tight mt-4 text-2xl font-extrabold md:text-3xl">
              The keys stay with you.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">
              With one person behind the build, there&apos;s no black box, no
              vendor lock-in — just a codebase that can be handed to anyone
              else the day it&apos;s needed.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 03 — Capabilities (dark, accordion) */}
      <Section>
        <Reveal>
          <SectionHeader
            index="03"
            label="Capabilities"
            title="FIVE DISCIPLINES,"
            closer="handled properly."
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            Five disciplines, run by one person. Each holds its own weight —
            and connects back into everything else being built.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <CapabilityAccordion items={capabilities} />
        </Reveal>
      </Section>

      {/* 04 — Architecture (dark) */}
      <Section>
        <Reveal>
          <SectionHeader
            index="04"
            label="How It Connects"
            title="ONE SYSTEM."
            closer="start through shipped."
          />
        </Reveal>
        <Reveal className="mt-16">
          <SystemDiagram />
        </Reveal>
      </Section>

      {/* 05 — Orbital gallery (light, 3D) */}
      <FloatingArchive />

      {/* 06 — Process (dark) */}
      <Section>
        <Reveal>
          <SectionHeader
            index="06"
            label="Process"
            title="FROM IDEA"
            closer="to something real."
          />
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-2 hidden h-px bg-bone/12 md:block" />
          <div
            className="absolute left-0 top-2 hidden h-px bg-lime md:block"
            style={{ width: "8%" }}
          />
          <div className="grid gap-10 md:grid-cols-4 md:gap-8">
            {process.map((step, i) => (
              <Reveal key={step.index}>
                <div
                  className="hidden h-2 w-2 -translate-y-[3px] rounded-full md:block"
                  style={{ background: i === 0 ? "#c8f135" : "rgba(244,242,236,0.2)" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                  {step.index}
                </span>
                <h3 className="font-display disp-tight mt-3 text-2xl font-extrabold uppercase leading-none tracking-tight text-bone">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 07 — Studio / stats (dark) */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              index="07"
              label="Studio"
              title="MORE SUBSTANCE,"
              closer="less portfolio polish."
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              What gets shown here is what&apos;s actually been shipped — not
              what&apos;s been imagined. Numbers move with the work; nothing
              is padded.
            </p>
          </Reveal>

          <Reveal className="flex flex-col divide-y divide-bone/8 border-y border-bone/8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between py-6"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </span>
                <span className="font-display disp-tight text-4xl font-black text-bone md:text-6xl">
                  {stat.value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Manifesto (light) */}
      <Section tone="light" bordered={false}>
        <Reveal>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-45">
            — Manifesto
          </p>
          <h2 className="font-display disp-tight mt-6 text-[clamp(2.2rem,6.5vw,5.2rem)] font-black uppercase leading-[0.92] tracking-[-0.015em]">
            MORE THAN
            <br />
            <span className="opacity-30">CODE GETS WRITTEN.</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex justify-end border-t hairline pt-10">
          <Reveal className="max-w-lg text-right">
            <h3 className="font-display disp-tight text-[clamp(1.8rem,5vw,3.6rem)] font-black uppercase leading-[0.95]">
              THINGS GET SHIPPED
              <br />
              <span className="closer closer-orange">that people actually use.</span>
            </h3>
          </Reveal>
        </div>
      </Section>

      {/* CTA (dark) */}
      <section className="relative overflow-hidden border-t border-bone/8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/6" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/6" />
        <div className="relative mx-auto max-w-content px-6 py-24 text-center lg:px-14 lg:py-32">
          <Reveal>
            <p className="flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              08 / Get In Touch
            </p>
            <h2 className="font-display disp-tight chrome-text mx-auto mt-6 max-w-3xl text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.015em]">
              SOMETHING WORTH SHIPPING?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
              Whatever&apos;s being built, an honest read on fit comes back
              quickly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Start a Project →</Button>
              <Button href={`mailto:${profile.email}`} variant="secondary">
                {profile.email}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
