import type { Metadata } from "next";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import WorkJourney from "@/components/three/WorkJourney";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

export default function WorkPage() {
  return (
    <div>
      <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          <span>Work</span>
          <span className="h-px w-8 bg-bone/16" />
          <span>{projects.length} Projects</span>
        </div>

        <h1 className="font-display disp-tight mt-6 text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.015em]">
          SYSTEMS &amp;
          <br />
          CASE FILES.
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          A selection of systems, spanning AI automation to full-stack
          products — each shaped around a real problem.
        </p>

        <div className="mt-10">
          <Button href="/contact">Start a Project →</Button>
        </div>
      </div>

      <WorkJourney projects={projects} />

      <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
        {(
          [
            { key: "shipped", label: "Shipped" },
            { key: "in development", label: "Also in Build" },
          ] as const
        ).map((group) => {
          const items = projects.filter((p) => p.status === group.key);
          if (items.length === 0) return null;

          return (
            <section key={group.key} className="mt-4 first:mt-0">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                <span>{group.label}</span>
                <span className="h-px w-8 bg-bone/16" />
                <span>
                  {String(items.length).padStart(2, "0")}{" "}
                  {items.length === 1 ? "Project" : "Projects"}
                </span>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <Reveal key={project.slug}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
