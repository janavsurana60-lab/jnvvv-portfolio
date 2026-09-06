import { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: ReactNode;
  /** The signature italic lowercase closing line. */
  closer?: string;
  closerTone?: "grey" | "orange";
  chrome?: boolean;
  align?: "left" | "right";
  className?: string;
};

export default function SectionHeader({
  index,
  label,
  title,
  closer,
  closerTone = "grey",
  chrome = false,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${align === "right" ? "text-right" : ""} ${className}`}>
      <div
        className={`flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        <span className="text-lime">{index}</span>
        <span className="h-px w-8" style={{ background: "var(--hairline)" }} />
        <span className="opacity-55">{label}</span>
      </div>

      <h2 className="font-display disp-tight mt-4 text-[clamp(2rem,5.5vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.015em]">
        <span className={chrome ? "chrome-text" : ""}>{title}</span>
        {closer && (
          <>
            <br />
            <span
              className={`closer ${closerTone === "orange" ? "closer-orange" : ""}`}
            >
              {closer}
            </span>
          </>
        )}
      </h2>
    </div>
  );
}
