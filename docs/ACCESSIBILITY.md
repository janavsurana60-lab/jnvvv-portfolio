# Accessibility Checklist

Applies to every route. Verify before ship.

- [ ] Every icon-only button has `aria-label`; decorative icons inside use `aria-hidden="true"`
- [ ] First focusable element is a "Skip to content" link targeting `#main-content`, visible on focus
- [ ] Focus-visible ring uses 2px solid bone (`#f4f2ec`) with 2px offset on the `#080808` surface
- [ ] Ring contrast vs. background meets WCAG 3:1 non-text contrast — bone on near-black passes
- [ ] Text contrast verified: bone on `#080808` exceeds AA 4.5:1 for body, 3:1 for large text
- [ ] **`#8a8a8a` body copy on `#080808` is ~5.1:1 — passes AA. Do not darken it further.**
- [ ] **`#6b6a63` tertiary text is ~3.3:1 — large text only, never body copy**
- [ ] `:focus-visible` (not `:focus`) used so mouse clicks don't trigger rings
- [ ] Keyboard tab order matches visual order; no positive `tabindex` values
- [ ] `@media (prefers-reduced-motion: reduce)` disables parallax, scroll-triggered fades, smooth scroll
- [ ] GSAP/ScrollTrigger timelines gate on `matchMedia('(prefers-reduced-motion: reduce)')` before firing
- [ ] Preloader is skippable and does not trap focus; reduced-motion users bypass the counter entirely
- [ ] Custom `data-cursor` layer never replaces real focus/hover affordances
- [ ] `scroll-behavior: smooth` wrapped in a reduced-motion query, not applied globally
- [ ] Project screenshots use descriptive alt naming project and visible content,
      e.g. `alt="Acme dashboard, sidebar nav and revenue chart"`
- [ ] Decorative or duplicated project images use empty `alt=""`
- [ ] Screenshots in `<picture>` carry alt on `<img>`, never on `<source>`
- [ ] Captions or transcripts accompany any video/audio project previews
- [ ] Colour is never the sole state indicator — pair with underline, icon, or ring
      (matters most for the lime `#c8f135` "live" signals)
- [ ] Marquee has `aria-hidden="true"` if purely decorative, or pauses on focus/hover
- [ ] axe/Lighthouse scan reports zero serious or critical violations on every route
