import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "relative isolate inline-flex items-center gap-2.5 overflow-hidden px-8 py-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-transform duration-300 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-lime text-ink"
      : "border border-bone/16 text-bone transition-colors hover:border-bone/40 hover:bg-bone/[0.03]";
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const shimmer =
    variant === "primary" ? (
      <span className="btn-shimmer-track pointer-events-none absolute inset-0 -z-10 aspect-square h-[140%] [container-type:size]">
        <span className="btn-shimmer-spark absolute -inset-full" />
      </span>
    ) : null;

  const content = (
    <>
      {shimmer}
      {children}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${base} ${styles} ${className}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
