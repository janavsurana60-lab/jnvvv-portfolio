import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import TechChips from "@/components/TechChips";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) return {};
  return { title: cap.title, description: cap.description };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) notFound();

  const i = capabilities.findIndex((c) => c.slug === slug);
  const prev = capabilities[i - 1];
  const next = capabilities[i + 1];

  return (
    <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/capabilities"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
        >
          ← Back
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {cap.index} / {cap.eyebrow}
        </span>
      </div>

      <h1 className="font-display disp-tight mt-10 text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.015em]">
        {cap.title}
      </h1>

      <TechChips items={cap.tech} className="mt-8" />

      <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
            01 Overview
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {cap.description}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              02 The Approach
            </p>
            <p className="mt-4 text-lg leading-relaxed text-bone/82">
              {cap.detail}
            </p>
          </Reveal>

          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              03 What You Get
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-bone/8 border-y border-bone/8">
              {cap.deliverables.map((d) => (
                <li
                  key={d}
                  className="py-4 text-sm leading-relaxed text-bone/82"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 border-t border-bone/8 pt-10 text-center">
        <h2 className="font-display disp-tight text-2xl font-extrabold uppercase md:text-3xl">
          Worth building?
        </h2>
        <div className="mt-6">
          <Button href="/contact">Start a Project →</Button>
        </div>
      </div>

      {(prev || next) && (
        <div className="mt-16 flex items-center justify-between border-t border-bone/8 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {prev ? (
            <Link
              href={`/capabilities/${prev.slug}`}
              className="transition-colors hover:text-bone"
            >
              ← Previous · {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/capabilities/${next.slug}`}
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
