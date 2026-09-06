import { ReactNode } from "react";

export default function Section({
  children,
  tone = "dark",
  className = "",
  bordered = true,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      className={`${tone === "light" ? "tone-light" : ""} ${
        bordered ? "border-t hairline-soft" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-content px-6 py-24 lg:px-14 lg:py-32">
        {children}
      </div>
    </section>
  );
}
