# Status Report — 2026-09-05

## 1. Site verification — everything works

- **Typecheck**: clean, zero errors.
- **Production build**: clean, all 16 routes generate (`/`, `/work`, `/work/[slug]` ×3, `/capabilities`, `/capabilities/[slug]` ×5, `/about`, `/contact`).
- **Browser-verified, desktop + mobile (375px)**: hero, alternating dark/light sections, capability accordion, both 3D scenes (orbital gallery + work journey), process rail, contact form, all case-study and capability detail pages. Zero console errors.
- **Two real bugs found and fixed this session**:
  - A React-state-in-render-loop crash in the orbital gallery scene (`ArchiveScene`) — fixed by writing to a DOM ref instead of `setState`, which is also just the correct pattern for animation loops.
  - A mobile layout collision where the "keep scrolling" label and the layout-toggle controls overlapped — fixed with responsive positioning.

## 2. Copy-audit against jstechlabs.com — not copied

You asked me to re-check the inspiration site and confirm nothing was copied rather than replicated. I re-walked the live site in Chrome and cross-checked every distinctive phrase from it against my own source files.

**Found and fixed 5 places this session where I'd unconsciously echoed their exact wording** (not full sentences, but their specific taglines/labels): "Scroll to orbit," "Change the view," "Status: Nominal," "Let's build what's next" (appeared twice, on the homepage and About), and a "NOT ANOTHER ___." heading that copied their sentence template with only the noun swapped. All replaced with genuinely original wording.

Ran a final automated sweep of 20 of their most distinctive phrases across every source file — the only remaining hits were false positives (common English phrases like "people remember" appearing naturally inside my own original sentences, and one internal code comment never shown to any visitor). Structure and layout patterns (numbered sections, italic closing lines, accent-colored rows) are replicated by design, per your instruction — that's the deliverable. All actual copy is original.

## 3. Security — maximized for what exists today

- **`npm audit`: 0 vulnerabilities** across 493 dependencies.
- **No secrets anywhere** — scanned all source for API keys, tokens, passwords; none found. No `.env` files exist yet. `.gitignore` already correctly excludes `.env*`, `node_modules`, `.next`.
- **No git repository has been initialized yet** — nothing has ever been pushed anywhere. Worth knowing: there's nothing to leak because there's no remote yet.
- **Added real HTTP security headers** (`next.config.ts`), verified being served:
  - `Content-Security-Policy` — locked to `'self'` for everything (scripts, styles, images, fonts, connections), `frame-ancestors 'none'` (blocks clickjacking/embedding), dev-only `unsafe-eval` for React's debugger (confirmed absent from production builds).
  - `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (blocks camera/mic/location the site never uses), `Strict-Transport-Security` (forces HTTPS once deployed).
- **Contact form** has no backend to attack — it builds a `mailto:` link client-side. No injection surface exists there today.

### For when you build the database and chat feature

These don't exist yet, so I haven't (and won't) fake security theater around them. When you're ready to build them, this is the checklist to follow:

**Before adding a database**
- Store connection strings in env vars, never in client bundles or git.
- Rotate DB credentials; use different secrets per environment.
- Use a least-privilege DB user (no DDL, scoped to required tables).
- Prefer an ORM or parameterized queries over string concatenation.
- Validate and type-check all input at the API boundary.
- Enable TLS on the DB connection; disable public network access where possible.
- Set up automated, encrypted, off-site backups with periodic restore tests.
- Review migrations and seed data for accidental secret leakage.

**Before adding live chat**
- Require authenticated users; gate WebSocket connections with a short-lived token.
- Enforce per-user and per-IP rate limits on send and connect.
- Sanitize/escape all message rendering; never `dangerouslySetInnerHTML` user content.
- Set a max message length; reject empty or control-character-only payloads.
- Add abuse filters and a block/report flow.
- Store messages encrypted at rest; define a retention/deletion policy.
- Keep PII out of logs — log message IDs and user IDs only.

**Ongoing**
- Run dependency scanning (npm audit / Dependabot) on every change.
- Never commit `.env` files or secrets in code — use a secrets manager once there's a team.
- Enable monitoring/alerts on auth failures and traffic spikes once there's a backend to watch.

## 4. Not yet done

- No real project content — still 3 clearly-labeled placeholders in `lib/content.ts`.
- No git repository initialized. Say the word when you want it set up, before anything gets pushed.
- Waiting on your specific edit guidelines for the next session.
