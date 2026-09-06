const NODES = [
  { label: "Idea", x: 60, cy: 60, accent: "#8a8a8a" },
  { label: "Design", x: 240, cy: 60, accent: "#9a7bff" },
  { label: "Build", x: 420, cy: 60, accent: "#c8f135" },
  { label: "Ship", x: 600, cy: 60, accent: "#4d74ff" },
];

/**
 * Original schematic in the reference's instrumentation style: labelled nodes
 * on a connected rail. Decorative, so hidden from assistive tech — the same
 * information is conveyed by the Process list in text.
 */
export default function SystemDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 200"
        role="img"
        aria-label="Diagram: idea flows through design and build to ship, feeding back into iteration"
        className="w-full min-w-[560px]"
      >
        <line
          x1="60"
          y1="60"
          x2="600"
          y2="60"
          stroke="rgba(244,242,236,0.16)"
          strokeWidth="1"
        />

        {/* feedback loop */}
        <path
          d="M600 60 C 640 130, 100 130, 60 60"
          fill="none"
          stroke="rgba(244,242,236,0.12)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <text
          x="330"
          y="146"
          textAnchor="middle"
          fill="rgba(244,242,236,0.3)"
          style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.2em" }}
        >
          ITERATE
        </text>

        {NODES.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.cy} r="7" fill="#080808" stroke={n.accent} strokeWidth="1" />
            <circle cx={n.x} cy={n.cy} r="2.5" fill={n.accent} />
            <text
              x={n.x}
              y={n.cy + 30}
              textAnchor="middle"
              fill="rgba(244,242,236,0.7)"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
              }}
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        ))}

        <text
          x="60"
          y="185"
          fill="rgba(244,242,236,0.16)"
          style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.2em" }}
        >
          JNVV_PIPELINE / 4 STAGES / ALL SYSTEMS RUNNING
        </text>
      </svg>
    </div>
  );
}
