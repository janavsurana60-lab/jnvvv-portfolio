# DESIGN.md — Full Reference Spec (jstechlabs.com)

Built from a page-by-page walkthrough in real Chrome, 2026-09-05. Every item below
was observed on screen, not inferred from HTML.

> **Rights:** structure, layout and interaction patterns are the deliverable.
> Their copy, imagery and brand name are theirs — all our copy must be original.

---

## 0. The things I got wrong the first time

1. **The site is NOT all-dark.** It alternates dark (`#080808`) and light
   (`#f4f2ec`) full-bleed sections. The light sections are a major part of its feel.
2. **Headings mix ALL-CAPS with an italic lowercase closing line** — "WE BUILD
   SYSTEMS THAT MAKE BUSINESS *move differently.*" / "NOT ANOTHER DIGITAL
   *agency.*" This is the single most distinctive typographic move on the site.
3. **Capabilities are an accordion**, not a card grid.
4. **Every list item carries its own accent colour** (lime / crimson / purple /
   blue / bone) on its index, sub-label and `+` marker.
5. **Cards and inputs are rounded** (~12–16px), not square.
6. The `/work` page is a **scroll-scrubbed 3D journey**, not a background scene.
7. The homepage has its own **3D orbital gallery** ("The Floating Archive").
8. `/contact` has a **real multi-field form**.

---

## 1. Tokens

### Colour
| Role | Hex |
|---|---|
| ink (dark bg) | `#080808` |
| bone (light bg AND dark-mode text) | `#f4f2ec` |
| surface | `#101010` / `#111111` |
| muted text | `#8a8a8a` |
| warm grey | `#6b6a63` |
| **lime** (primary accent) | `#c8f135` |
| **orange** (manifesto italic) | `#ff6a2c` |
| purple | `#9a7bff` |
| blue | `#4d74ff` |
| crimson (service accent) | ~`#ff3b5c` |

Hairlines are translucent bone: `rgba(244,242,236, .06 / .08 / .12 / .16 / .30 / .34)`.
On light sections, hairlines invert to translucent ink.

### Type
- **Archivo** (variable, `wdth` 100–118) — display
- **Inter** — body
- **JetBrains Mono** — all labels, eyebrows, counters, chips
- Hero: `clamp(3rem, 11vw, 9.5rem)`, weight 900, `line-height .84`, `tracking -.015em`
- Section H2: `clamp(2rem, 5.5vw, 4.8rem)`, weight 900, `line-height .9`
- **Italic closer**: same size as heading, `font-style: italic`, lowercase, either
  dim grey (`#6b6a63`) or orange (`#ff6a2c`) in the manifesto
- Sub-headings inside light sections are **sentence case**, not uppercase
- Mono labels: 9–10px, `tracking .14em–.2em`, uppercase

### Shape
Cards / inputs / pills: radius `12–16px`. Buttons stay rectangular.

---

## 2. Global chrome

- **Preloader** — wordmark, `000%`→`100%` counter, rotating phase label, `NN / NN`
  step counter. Once per session.
- **Custom cursor** — circular reticle + crosshair, lerped follow, scales on
  interactive elements. (Their DOM node: `kiro-cursor-wrap`, z-index 99999.)
- **Sticky header** — logo left, nav centre, `START A PROJECT →` right.
- **Floating pill nav** — appears mid-scroll on `/work`, top-right, rounded-full,
  shows `WORK ——— CONTACT`.
- **Footer** — logo + blurb / NAVIGATE column / CONTACT column (email, Instagram,
  LinkedIn). Bottom bar: copyright left, lime dot + `SYSTEMS ONLINE — EST. 2026` right.

---

## 3. Homepage — 8 numbered sections

**01 Hero** (dark) — eyebrow `JS TECH LABS / 01 · DIGITAL SYSTEMS STUDIO · EST. 2026`;
huge 3-line heading with last line dimmed; body; lime status dot + `SYSTEMS ONLINE`;
lime CTA + ghost CTA. **Right: live animated node diagram** (WEBSITE → AI → CRM →
AUTOMATION → DATA, with MVP/WHATSAPP/WEBHOOK spurs; lime AI node with pulsing glow;
caption `JSTL_ARCH / 5 LAYERS / STATUS: NOMINAL`). Bottom: `SCROLL` + rule + `01 / 06`.

**Marquee** — infinite ticker of capability names separated by lime dots.

**02 What We Build** (**LIGHT**) — eyebrow; giant black heading ending in italic
`move differently.`; right-aligned body. Below, two columns split by a vertical
rule: `APPROACH / 01` + sentence-case "Infrastructure, not integrations." + body;
right `OWNERSHIP` + "You own every line of the system." + a numbered point.

**03 Capabilities** (dark) — "THE FIVE SYSTEMS." + right-aligned intro.
**Accordion** of 5 rounded cards. Expanded: lime border, lime index/title/sub-label,
circular `×` button, body + tech list with lime dot. Collapsed: dark surface, grey
text, circular `+`.

**04 Architecture** (dark) — heading with dimmed trailing lines; body; status pills
(`LIVE` lime / `SYNCED` blue / `AUTOMATED` grey / `CONNECTED` purple).
**Right: branching node graph** — CLIENT → WEBSITE → LEAD CAPTURE → **AI CORE**
(lime) → AI WHATSAPP (blue) / MVP ENGINE (purple) / CRM → AUTOMATION / DATA.
Rounded pill nodes with coloured borders, dashed connectors, labelled edges.

**05 Selected Work — "THE FLOATING ARCHIVE"** (**LIGHT**) — the homepage 3D piece.
Project screenshots (monitors, phones, tablets) float in 3D and **orbit as you
scroll**. Centre title `SELECTED SYSTEMS.` with `mix-blend-mode` so artwork shows
through it; sub-label `THE FLOATING ARCHIVE`. Faint heritage line-art ornaments in
the background. Bottom-left lime dot + `SCROLL TO ORBIT`. Bottom-right live
`ROT 000°` counter + `4 SYSTEMS / 19 ARTEFACTS`. Centre control pill:
`CHANGE THE VIEW : [SPHERE] [CYLINDER]`. Top-right `2024 — 2026 / 04 CASE STUDIES`.

**06 Process** (dark) — heading; **horizontal rail with 4 tick marks, first tick
lime** (fills with scroll); 4 columns `01 DISCOVER / 02 DESIGN / 03 ENGINEER /
04 DEPLOY` with body text.

**07 Studio** (dark) — heading ending in italic `agency.`; two body paragraphs;
**right: giant stat numbers** right-aligned with mono labels left, separated by
hairlines — `40+` (lime) SYSTEMS BUILT, `120+` (bone) AUTOMATIONS SHIPPED,
`25+` DIGITAL EXPERIENCES.

**Manifesto** (**LIGHT**) — `— MANIFESTO`; "WE DON'T JUST" black + "BUILD WEBSITES."
grey; rule + `SYSTEMS · NOT PAGES`; then **right-aligned** "WE BUILD SYSTEMS" black
+ **`people remember.` in orange italic**.

**08 CTA** (dark) — faint concentric ring arcs in background; lime dot +
`08 — BUILD WHAT'S NEXT`; huge centred heading; centred body; lime CTA + mono email.

---

## 4. `/work` — the scroll-scrubbed 3D journey

1. Dark hero: `WORK ——— 06 PROJECTS` / `2024 — 2026`, "WORK & CASE STUDIES."
2. Transition into deep space: starfield of coloured points (bone/blue/purple/lime).
3. Glowing **portal reticle** — ring with wireframe octahedron inside, light rays
   radiating, small lime seed-shape beneath.
4. Camera dollies in; octahedron drifts right, wrapped in large **tinted elliptical
   orbital rings**; `INTELLIGENT DIGITAL SYSTEMS.` reveals at left; `EST. 2026` +
   studio copy fades in at right.
5. A vertical **segmented glass spine** runs down the centre (rings at intervals).
6. **Project device mockups fly past the camera in 3D**, each with its own coloured
   edge glow: orange (Instagram Automation), green (WhatsApp), blue (Investor
   Choice), parchment (Portfolio).
7. **Left panel `WHAT ARE YOU LOOKING FOR?`** — list of 4 projects; the active one
   gets a coloured `→` and bright text, others dim with `·`. Below it: the active
   project's `NN — CATEGORY` in its accent colour, description, and `KNOW MORE →`.
   **This panel updates live with scroll position.**
8. Persistent bottom-right: `UP NEXT / 01 — INSTAGRAM AUTOMATION` + thumbnail.
9. Floating pill nav top-right throughout.

---

## 5. `/services` — 9 rows, per-row accent colour

Dark. Eyebrow `SERVICES / 09 SYSTEMS`; "CAPABILITIES" + dimmed "BUILT TO CONNECT.";
intro. Then 9 hairline-separated rows, each: accent index `01`–`09`, big Archivo
title, accent mono sub-label, right-column description, far-right accent `+`.

Rows: AI Automation (lime) · Instagram Automation (crimson) · WhatsApp Automation
(lime) · AI Agent Development (purple) · MVP Development (purple) · Custom Software
Development (bone) · App Development (blue) · Immersive Website Development
(crimson) · Real Estate Automation.

---

## 6. `/about`

Dark hero: `ABOUT ——— JS TECH LABS / EST. 2026`; "WE BUILD SYSTEMS THAT MATTER.";
two-column body. Then a **light** section. Then dark `02 — WHAT WE BUILD` /
"CAPABILITIES" with accent-indexed rows (same row pattern as /services).

---

## 7. `/work/[slug]` — case study

`← Back`, index + category, tech chips, H1, hero image, then numbered blocks:
`01 Overview` (+ Visit Live Website →) · `02 The Challenge` · `03 The Solution` ·
`04 Key Capabilities` (list) · tech chips · CTA · prev/next pager.

---

## 8. `/contact`

Dark, two columns. Left: `CONTACT` eyebrow, "LET'S BUILD WHAT'S" + dimmed "NEXT.",
body, `EMAIL` label + address in mono.
Right: **real form** — Name\*, Email\*, Project Type (select), Budget Range (select),
Message (optional textarea), lime `SEND MESSAGE →`. Rounded dark inputs, mono
uppercase labels, lime required asterisk.

---

## 9. Build notes for our version

- Introduce a **light section** component; the all-dark build is wrong.
- Add the **italic lowercase closer** to the heading system.
- Convert capabilities to an **accordion**; add per-item accent colours.
- Round the cards/inputs.
- Homepage needs the **orbital gallery** (sphere/cylinder toggle, ROT counter).
- `/work` needs the **scroll-scrubbed journey** with a live project panel.
- `/contact` needs the full form UI. **No backend exists** — wire to a real service
  or keep submission disabled and say so; never fake a successful submit.
