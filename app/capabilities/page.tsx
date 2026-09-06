import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import CapabilityAccordion from "@/components/CapabilityAccordion";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "What gets built, and how.",
};

export default function CapabilitiesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-20 lg:px-14 lg:py-28">
      <SectionHeader
        index="Capabilities"
        label={`${capabilities.length} Disciplines`}
        title="WHAT ACTUALLY"
        closer="gets built, in detail."
      />

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        Five disciplines, one person behind them. Opening any one surfaces
        the approach and what actually comes of it.
      </p>

      <Reveal className="mt-16">
        <CapabilityAccordion items={capabilities} />
      </Reveal>

      <div className="mt-20 text-center">
        <Button href="/contact">Start a Project →</Button>
      </div>
    </div>
  );
}
