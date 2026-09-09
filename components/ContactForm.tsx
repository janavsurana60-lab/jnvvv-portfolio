"use client";

import { useState } from "react";
import { profile } from "@/lib/content";

const PROJECT_TYPES = [
  "AI Automation",
  "Rapid MVP",
  "Full-Stack Web App",
  "Automation & Scripts",
  "Interface / Frontend",
  "Other",
];

const BUDGET_RANGES = [
  "Not sure yet",
  "Under $1k",
  "$1k – $5k",
  "$5k – $15k",
  "$15k+",
];

const inputClass =
  "w-full rounded-xl border border-bone/15 bg-surface px-4 py-3.5 text-sm text-bone outline-none transition-colors placeholder:text-warm-grey focus:border-lime";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const valid = name.trim().length > 0 && EMAIL_RE.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;

    const subject = `Project inquiry from ${name}${projectType ? ` — ${projectType}` : ""}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      projectType && `Project type: ${projectType}`,
      budget && `Budget range: ${budget}`,
      message && `\nMessage:\n${message}`,
    ].filter(Boolean);

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <p className="text-xs leading-relaxed text-warm-grey">
        This opens your email client with the details filled in — no server
        sits behind it, the message just lands straight in the inbox.
      </p>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          Name <span className="text-lime">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          Email <span className="text-lime">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          Project Type
        </label>
        <div className="relative">
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-warm-grey"
          >
            ▾
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          Budget Range
        </label>
        <div className="relative">
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-warm-grey"
          >
            ▾
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-lime px-8 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send Message →
      </button>
    </form>
  );
}
