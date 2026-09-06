export default function Marquee({ items }: { items: readonly string[] }) {
  const track = [...items, ...items];

  return (
    <div
      className="marquee relative overflow-hidden border-y border-bone/8 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-10">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-lime/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
