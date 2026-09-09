export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  status: "shipped" | "in development";
  summary: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  tech: string[];
  link?: string;
  image?: string;
  featured?: boolean;
  accent: AccentName;
  /**
   * Path to a self-contained static build of the project, bundled under
   * /public and embedded as a click-through walkthrough on the case-study
   * page. Used where the project isn't deployed on its own domain.
   */
  preview?: string;
};

export const profile = {
  name: "j.nvvv",
  role: "VIBECODER",
  tagline: "Work here moves at the pace AI allows.",
  bio: "Digital products get designed and shipped in step with AI — fast iteration, real code, no fluff. Nothing here is templated; everything is built.",
  email: "jn.vvvv@gmail.com",
  est: "2026",
};

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ACCENTS = {
  lime: "#c8f135",
  crimson: "#ff3b5c",
  purple: "#9a7bff",
  blue: "#4d74ff",
  bone: "#f4f2ec",
  orange: "#ff6a2c",
} as const;

export type AccentName = keyof typeof ACCENTS;

export type Capability = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  accent: AccentName;
  description: string;
  detail: string;
  deliverables: string[];
  tech: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "ai-native-development",
    index: "01",
    title: "AI-Native Development",
    eyebrow: "PAIR PROGRAMMING",
    accent: "lime",
    description:
      "Production code ships in a tight loop with AI tooling — iteration speeds up, quality doesn't get cut.",
    detail:
      "AI sits in the loop as a genuine collaborator, not an autocomplete gimmick. It's used to move faster through the mechanical parts, freeing time for what actually needs judgement — architecture, edge cases, whether the thing should exist at all.",
    deliverables: [
      "Production codebase, reviewed line by line",
      "Architecture decided before implementation",
      "Documentation written as the work happens",
    ],
    tech: ["Claude", "Cursor", "TypeScript"],
  },
  {
    slug: "rapid-mvps",
    index: "02",
    title: "Rapid MVPs",
    eyebrow: "IDEA TO LIVE",
    accent: "crimson",
    description:
      "A concept gets carried from sketch to a working, deployable product — one founders can put in front of users.",
    detail:
      "An MVP exists to get a real answer from real users, fast. The thin slice that tests the risky assumption gets built — the twelve things that feel important but prove nothing deliberately don't.",
    deliverables: [
      "Deployed, working product",
      "Auth, data layer and admin basics",
      "A codebase that survives the next iteration",
    ],
    tech: ["Next.js", "Supabase", "Vercel"],
  },
  {
    slug: "full-stack-web",
    index: "03",
    title: "Full-Stack Web",
    eyebrow: "END TO END",
    accent: "purple",
    description:
      "Frontend, backend, and everything between them get treated as one coherent system — never stitched-together parts.",
    detail:
      "With one person across the whole stack, handoff gaps disappear — the API gets shaped around what the interface needs, and the interface around what the data can do.",
    deliverables: [
      "Typed API and data model",
      "Responsive, accessible frontend",
      "Deploy pipeline and monitoring",
    ],
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "automation",
    index: "04",
    title: "Automation & Scripts",
    eyebrow: "REMOVE THE GRIND",
    accent: "blue",
    description:
      "Repetitive manual work in a workflow gets found and engineered away with small, reliable tools.",
    detail:
      "Most automation projects fail from being too ambitious. The specific repeated action costing real hours gets targeted, removed, and kept running even when nobody's watching.",
    deliverables: [
      "Scripts or scheduled jobs, documented",
      "Error handling and failure alerts",
      "Handover so you can run it yourself",
    ],
    tech: ["Python", "Node.js", "APIs"],
  },
  {
    slug: "interfaces",
    index: "05",
    title: "Interfaces With Feel",
    eyebrow: "MOTION & DETAIL",
    accent: "bone",
    description:
      "Attention gets held through considered typography, motion, and the small details most sites skip.",
    detail:
      "What separates a site that looks fine from one that's remembered comes down to details nobody consciously notices — type that holds a hierarchy, motion that respects reduced-motion settings, states that respond the instant they're touched.",
    deliverables: [
      "Design system and type scale",
      "Motion that degrades gracefully",
      "Accessibility verified, not assumed",
    ],
    tech: ["Tailwind", "Three.js", "Figma"],
  },
];

export const projects: Project[] = [
  {
    slug: "janav-poly",
    accent: "blue",
    index: "01",
    title: "Janav Poly",
    category: "B2B Industrial Website",
    status: "shipped",
    summary:
      "A corporate site for a Kolkata polymer trading company — a cinematic scroll, an AI grade-questions assistant, and registry particulars presented as trust signals rather than paperwork.",
    challenge:
      "An earlier version of the site had been built around the company's official filing code, which describes manufacturing — but the business only imports and resells. The story being told didn't match the business being run.",
    solution:
      "The whole narrative got rebuilt around the real supply chain — shipment to stock to dispatch — with registration details surfaced as proof rather than buried in a footer, and a light AI assistant added for grade questions.",
    capabilities: [
      "Cinematic scroll-driven 3D hero, built with React Three Fiber",
      "AI assistant for supply and grade questions",
      "Registered particulars (CIN, GSTIN) surfaced as trust signals",
    ],
    tech: ["Next.js", "React Three Fiber", "GSAP"],
    link: "https://janavpoly.vercel.app",
    image: "/work/janav-poly.png",
    featured: true,
  },
  {
    slug: "dulaar",
    accent: "orange",
    index: "02",
    title: "Dulaar",
    category: "Restaurant & Hospitality",
    status: "in development",
    summary:
      "Marketing and booking site for a Kolkata mithai counter and vegetarian kitchen — real photography, a genuine WebGL gallery, and a booking flow that still saves a table even when the confirmation email can't send.",
    challenge:
      "No published menu existed, and no vector logo either — just a photograph of the storefront sign. Every fact on the page had to be sourced from the shop's own public listing rather than invented.",
    solution:
      "Content got built straight from the business's public Google listing; the logo geometry was traced out of a photo of the sign itself. Three different 3D techniques layer in — CSS parallax, a real WebGL counter gallery, and extruded buttons — each used only where it earns its place.",
    capabilities: [
      "Logo geometry recovered from a storefront photograph",
      "WebGL mithai-counter gallery, built on ogl",
      "Booking system that degrades gracefully without email configured",
    ],
    tech: ["Next.js", "Motion", "WebGL (ogl)", "Neon Postgres"],
    image: "/work/dulaar.png",
    featured: true,
    preview: "/dulaar-preview/",
  },
];

export type SmallProject = {
  slug: string;
  index: string;
  title: string;
  category: string;
  status: "shipped" | "in development";
  summary: string;
  detail: string;
  tech: string[];
  link?: string;
  accent: AccentName;
};

/** Smaller builds — shown on /lab against the wave field. */
export const smallProjects: SmallProject[] = [
  {
    slug: "self-learning-agent",
    index: "01",
    title: "Self-Learning Agent",
    category: "AI Agent · Persistent Memory",
    status: "shipped",
    accent: "lime",
    summary:
      "An agent that keeps what it learns. Nothing gets retrained — a durable memory of facts, rules and procedures is accumulated, then recalled into context on every later task.",
    detail:
      "Each task runs a loop: relevant memory is recalled, the work is done with tools, then the run is reflected on and whatever proved durable is written back. Preferences, identity and rules load on every task; facts and procedures are pulled by relevance.",
    tech: ["Next.js 16", "Vercel AI SDK", "Supabase"],
    link: "https://selflearn-black.vercel.app",
  },
  {
    slug: "polaris",
    index: "02",
    title: "Polaris",
    category: "AI Mentor · Exhibition Build",
    status: "in development",
    accent: "purple",
    summary:
      "A student-facing AI mentor built for a live exhibition floor. Questions answer instantly from a local bank; only the closing verdict reaches out to a model.",
    detail:
      "Nothing is allowed to hang in front of an audience. Two models are raced in parallel behind an eight-second hard cap, with an offline fallback underneath — so a verdict always arrives, wifi or not. Strengths resolve into a 3D constellation behind the result.",
    tech: ["Vanilla JS", "Three.js", "OpenRouter"],
    link: "https://polaris-mentor.vercel.app",
  },
];

export const marqueeItems = [
  "AI-Native Development",
  "Rapid MVPs",
  "Full-Stack Web",
  "Automation",
  "Interfaces With Feel",
  "Shipping in Public",
] as const;

export const process = [
  {
    index: "01",
    title: "Discover",
    description:
      "The actual problem gets understood before anything is written. What breaks, what's manual, what matters — surfaced first.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Structure and interface decisions are made up front, so the build isn't a sequence of guesses.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "A tight iteration loop is held with AI in the seat beside. Progress stays visible; silence doesn't.",
  },
  {
    index: "04",
    title: "Ship",
    description:
      "Deployment, monitoring, and documentation are handled end to end. What gets handed over is built to be maintained.",
  },
] as const;

export const stats = [
  { value: "1", label: "Person Behind It" },
  { value: "2026", label: "Active Since" },
];
