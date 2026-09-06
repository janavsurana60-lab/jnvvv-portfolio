"use client";

import Link from "next/link";
import { ACCENTS, Project } from "@/lib/content";
import { handleSpotlightMove } from "@/lib/spotlight";
import StatusPill from "./StatusPill";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerMove={handleSpotlightMove}
      className="spotlight-card group relative block overflow-hidden border border-bone/12 p-6 transition-colors hover:border-bone/30 md:p-8"
      style={{ "--spot-color": ACCENTS[project.accent] } as React.CSSProperties}
    >
      <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {project.index} / {project.category}
        </span>
        <StatusPill
          label={project.status === "shipped" ? "Shipped" : "In Development"}
        />
      </div>

      <h3 className="font-display disp-tight mt-6 text-3xl font-extrabold uppercase leading-none tracking-tight text-bone transition-colors group-hover:text-lime md:text-4xl">
        {project.title}
      </h3>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.1em] text-warm-grey">
        {project.tech.map((t, i) => (
          <span key={t}>
            {t}
            {i < project.tech.length - 1 && <span className="ml-3 text-bone/16">/</span>}
          </span>
        ))}
      </div>
    </Link>
  );
}
