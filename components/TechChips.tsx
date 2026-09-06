export default function TechChips({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="border border-bone/12 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
