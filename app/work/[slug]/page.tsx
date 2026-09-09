import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import StatusPill from "@/components/StatusPill";
import TechChips from "@/components/TechChips";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/work"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
        >
          ← Back
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {project.index} / {project.category}
        </span>
      </div>

      <TechChips items={project.tech} className="mt-8" />

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <h1 className="font-display disp-tight text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.015em]">
          {project.title}
        </h1>
        <StatusPill
          label={project.status === "shipped" ? "Shipped" : "In Development"}
        />
      </div>

      {project.image && (
        <div className="relative mt-12 aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-bone/12">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 960px, 100vw"
          />
        </div>
      )}

      {project.preview && (
        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Live Walkthrough — click through the whole site
            </p>
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted underline decoration-1 underline-offset-4 transition-colors hover:text-bone"
            >
              Open full screen ↗
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-bone/12 bg-ink">
            <iframe
              src={project.preview}
              title={`${project.title} — interactive walkthrough`}
              loading="lazy"
              className="block h-[640px] w-full md:h-[760px]"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-warm-grey">
            Real front-end, running in-page. Booking and contact forms are
            switched off in this preview — nothing is sent.
          </p>
        </Reveal>
      )}

      <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-10">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              01 Overview
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>
          {project.link && (
            <Button href={project.link}>Visit Live Website →</Button>
          )}
        </div>

        <div className="flex flex-col gap-16">
          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              02 The Challenge
            </p>
            <h2 className="font-display disp-tight mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              {project.challenge}
            </h2>
          </Reveal>

          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              03 The Solution
            </p>
            <h2 className="font-display disp-tight mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              {project.solution}
            </h2>
          </Reveal>

          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              04 Key Capabilities
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {project.capabilities.map((cap) => (
                <li key={cap} className="text-sm leading-relaxed text-bone/82">
                  {cap}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 border-t border-bone/8 pt-10 text-center">
        <h3 className="font-display disp-tight text-2xl font-extrabold uppercase md:text-3xl">
          Facing something similar?
        </h3>
        <div className="mt-6">
          <Button href="/contact">Start a Project →</Button>
        </div>
      </div>

      {(prev || next) && (
        <div className="mt-16 flex items-center justify-between border-t border-bone/8 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="transition-colors hover:text-bone"
            >
              ← Previous · {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="transition-colors hover:text-bone"
            >
              {next.title} · Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
