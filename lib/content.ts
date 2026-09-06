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
  featured?: boolean;
  placeholder?: boolean;
  accent: AccentName;
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
    slug: "project-alpha",
    accent: "lime",
    index: "01",
    title: "Project Alpha",
    category: "Full-Stack Web App",
    status: "shipped",
    summary: "Placeholder project — swap in real work via lib/content.ts.",
    challenge:
      "Describe the real problem this project solved once you have a project to add here.",
    solution:
      "Describe the system you built and why it worked.",
    capabilities: ["Placeholder capability one", "Placeholder capability two"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    placeholder: true,
  },
  {
    slug: "project-beta",
    accent: "orange",
    index: "02",
    title: "Project Beta",
    category: "AI Automation",
    status: "shipped",
    summary: "Placeholder project — swap in real work via lib/content.ts.",
    challenge:
      "Describe the real problem this project solved once you have a project to add here.",
    solution:
      "Describe the system you built and why it worked.",
    capabilities: ["Placeholder capability one", "Placeholder capability two"],
    tech: ["Python", "OpenAI API", "PostgreSQL"],
    featured: true,
    placeholder: true,
  },
  {
    slug: "project-gamma",
    accent: "blue",
    index: "03",
    title: "Project Gamma",
    category: "Mobile MVP",
    status: "in development",
    summary: "Placeholder project — swap in real work via lib/content.ts.",
    challenge:
      "Describe the real problem this project solved once you have a project to add here.",
    solution:
      "Describe the system you built and why it worked.",
    capabilities: ["Placeholder capability one", "Placeholder capability two"],
    tech: ["React Native", "Node.js"],
    featured: true,
    placeholder: true,
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
  { value: "—", label: "Systems Delivered" },
  { value: "—", label: "Code Reviewed" },
  { value: "2026", label: "Active Since" },
];
