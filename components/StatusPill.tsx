export default function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
      </span>
      {label}
    </span>
  );
}
