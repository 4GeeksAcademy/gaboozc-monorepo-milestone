# Handoff: AlphaDev Studios Design System

## Overview
This bundle is the complete **AlphaDev Studios (ADS)** design system — the brand's *"Light Luxury"* identity (warm cream + gold, editorial Playfair Display over Inter, benefit-first bilingual ES/EN copy). It contains design tokens, reusable component specs, brand assets, prose guidelines, and a full marketing-website reference. Use it to build well-branded AlphaDev interfaces in a real codebase.

> **Tagline:** *"Te hacemos existir en internet."* (We make you exist online.)

> **¿Qué cambió desde el codebase original?** Ver **`CHANGELOG.md`** — documenta, segmento por segmento, lo recibido (`AlphaWEB/`) vs. lo entregado, con referencias a las capturas en **`screenshots/`**.

## About the Design Files
The files in this bundle are **design references created in HTML/JSX** — they capture the intended look, tokens, and behavior of the brand. They are **not** production code to copy verbatim. Your task is to **recreate these designs in your target codebase using its established environment and patterns** (React, Vue, Next.js, SwiftUI, etc.). If no environment exists yet, pick the most appropriate framework and implement there.

The component `.jsx` files use inline styles that read CSS custom properties — they are intentionally simple, cosmetic recreations meant to communicate the design, not a component library to ship. Re-implement each one idiomatically in your stack (e.g. styled-components, CSS modules, Tailwind mapped to the tokens, etc.).

This bundle doubles as a **Claude Code Agent Skill** — see "Use as a Claude Code skill" below.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all specified. Recreate the UI pixel-perfectly using your codebase's libraries, mapping the values in `tokens/` to your styling layer.

---

## Use as a Claude Code skill
This folder is structured as an Agent Skill (`SKILL.md` at its root).

1. Drop the whole folder into your repo's skills directory, e.g.:
   ```
   .claude/skills/alphadev-studios-design/
   ```
   (rename the folder to `alphadev-studios-design` if you like — the skill name in `SKILL.md` is `alphadev-studios-design`).
2. In Claude Code, invoke the skill and ask it to build/adapt a screen. It reads `DESIGN_SYSTEM.md` (the full guide) and the token/component/asset files, then designs in your codebase's environment.
3. For quick mocks it will emit static HTML; for production work it copies assets and applies the rules to your real components.

---

## Design Tokens
All tokens live in `tokens/*.css` as CSS custom properties on `:root`, aggregated by `styles.css` (`@import` list only). Link `styles.css` and every value below is available. Map these to your styling layer.

### Colors — `tokens/colors.css`
**Surfaces (warm cream)**
| Token | Hex | Use |
|---|---|---|
| `--cream-50` / `--surface-card` | `#FFFFFF` | Cards |
| `--cream-100` / `--surface-page` | `#FAFAF7` | Page background |
| `--cream-200` / `--surface-alt` | `#F2EEE7` | Alt sections |
| `--cream-300` / `--surface-deep` / `--border` | `#E8E2D9` | Deep / borders |
| `--ink-900` / `--surface-invert` | `#1A1512` | Primary text & dark CTA panel |

**Text (warm charcoal)**
| Token | Hex | Use |
|---|---|---|
| `--ink-900` / `--text-primary` | `#1A1512` | Body / headings (never pure black) |
| `--ink-700` | `#3A322B` | Headings on light |
| `--ink-500` / `--text-muted` | `#6B5F52` | Muted body |
| `--ink-300` / `--text-subtle` | `#9A8E84` | Captions, legal |

**Gold — the single accent**
| Token | Hex | Use |
|---|---|---|
| `--gold-700` / `--accent-hover` | `#7A5828` | Pressed / dark borders |
| `--gold-500` / `--accent` | `#9A7235` | Primary accent (buttons, links, dividers) |
| `--gold-300` / `--accent-glint` | `#C9A465` | Highlights, glints |
| `--gold-100` | `#F5E6CC` | Gold paper tints |

**Gold transparencies:** `--gold-bg: rgba(154,114,53,0.08)` (washes), `--gold-border: rgba(154,114,53,0.20)` (hover/focus borders), `--focus-ring: 0 0 0 3px rgba(154,114,53,0.10)`.

> There is **no secondary brand hue.** Gold does all accent work. The legacy blue `#0080FF` (`--legacy-blue`) is reference-only — do NOT use.

### Typography — `tokens/typography.css`
- **Display:** `--font-display` = `'Playfair Display', Georgia, serif` — headlines, titles, italic gold emphasis words.
- **Body / UI:** `--font-body` / `--font-ui` = `'Inter', system-ui, sans-serif`.
- **Scale:** `--text-xs` 12px · `--text-sm` 14px · `--text-base` 16px · `--text-md` 17px · `--text-lg` 20px · `--text-xl` 24px · `--text-2xl` 32px · `--text-3xl` 40px · `--text-4xl` 56px · `--text-5xl` 72px. Fluid: `--text-section: clamp(2.5rem,5vw,4rem)`, `--text-hero: clamp(2.75rem,6vw,4.5rem)`.
- **Weights:** 400 / 500 / 600 / 700 / 900 (Playfair black for editorial display).
- **Line-height:** tight 1.1 (display) · snug 1.3 · normal 1.5 (UI) · relaxed 1.65 (body).
- **Tracking:** tight −0.01em (large serif) · wide 0.01em (buttons) · eyebrow 0.16em (uppercase labels).

### Spacing & layout — `tokens/spacing.css`
- 8px scale: `--space-1`…`--space-32` (4 → 128px). Section padding: `--section-pad-y: clamp(60px, 9vw, 120px)`.
- Container: `--container-max: 1280px`; pad 1.5rem mobile / 2.5rem desktop; readable measure `--measure: 40rem`.
- **Radii:** `--radius-sm` 6px (inputs) · `--radius-md` 8px (buttons) · `--radius-lg` 12px (form cards) · `--radius-xl` 16px (feature cards) · `--radius-2xl` 20px (nav pill/panels) · `--radius-pill` 999px (chips/toggles).

### Effects — `tokens/effects.css`
- **Shadows (warm-tinted, never gray):** `--shadow-sm` `0 2px 24px rgba(26,21,18,0.06)` (nav rest) · `--shadow-md` `0 4px 20px rgba(154,114,53,0.10)` · `--shadow-lg` `0 8px 32px rgba(154,114,53,0.10)` (card hover) · `--shadow-gold` gold glow + 4px ring (primary button hover).
- **Motion (calm, no bounce):** signature easing `--ease-out: cubic-bezier(0.16,1,0.3,1)`; durations `--dur-fast` 0.2s / `--dur-base` 0.25s / `--dur-slow` 0.35s.
- **Texture utilities:** `.gold-divider` (3rem symmetric gold gradient rule under titles), `.bg-dot-grid` (1px gold dots, 28px pitch), film-grain overlay (feTurbulence, 2.8% opacity, multiply) — applied as a fixed `html::after` layer in the reference pages.

---

## Components
Usage specs in `components/<group>/` as `.prompt.md` files (one-line purpose + JSX example + variants). Exact props, states, and values for every component are documented below and in the token tables above — re-implement each idiomatically in your stack. (Live `reference/website_kit/index.html` shows them composed in real JSX.)

### core/
- **Button** — gold CTA with lift-on-hover. Variants `primary` (solid gold), `secondary` (outline → gold tint on hover), `ghost` (text gold). Sizes `sm`/`md`/`lg`. Hover: `translateY(-2px)` + gold glow; active resets. Always Inter 600.
- **Eyebrow** — uppercase gold micro-label above section titles. Inter 12px / 600 / tracking 0.16em / uppercase / `--gold-500`.
- **SectionHeader** — centered eyebrow → Playfair title → gold divider → subtitle stack. `align` left/center, `divider` toggle. `title` honors `\n`.

### surfaces/
- **Card** — white feature card, 1px warm border, 16px radius, 2rem padding, **no resting shadow**; hover lifts −3px with `--shadow-lg`, border warms to gold, diagonal gold wash fades in. Props `interactive`, `wash`, `href`.
- **Badge** — uppercase label/chip. `meta` (gold eyebrow, no bg), `solid` (filled gold pill), `outline` (gold-tinted bordered pill), `neutral` (white bordered pill).

### forms/
- **Input** — text field / textarea on white, warm border, gold focus ring. `label`, `multiline`, `rows`.
- **LanguageToggle** — bilingual ES·EN segmented control; active segment fills gold. Controlled (`value`/`onChange`).

---

## Reference screens — `reference/`
- **`AlphaDev Studios Website.html`** — fully self-contained, offline marketing site (open in any browser). The canonical visual reference.
- **`website_kit/`** — the source kit (`index.html` + `copy.js`). A bilingual 5-route marketing site composing the components above:

| Route | Purpose | Layout & key components |
|---|---|---|
| **Inicio** | Landing | Floating frosted nav pill (sticky, max-880px, 20px radius, `--shadow-sm`); full-viewport hero (Playfair `--text-hero`, ambient gold orbs, masked dot-grid, dual Buttons); Problem (alt surface + bordered punch card); Services/Process/Cases previews; Why (gold-check list + ADS wordplay); dark Closing CTA. |
| **Servicios** | Service detail | Page hero (9rem top pad) + 5 Cards each with icon, title, body, and a ✓ deliverables list; closing CTA. |
| **Resultados** | Project list | Page hero + 3 Cards (icon, title, gold meta line, body, outline Badges); closing CTA. |
| **Cómo trabajamos** | Process | Page hero + 5 horizontal phase cards (gold gradient number sidebar 112px + 2-col ✓ details). |
| **Contacto** | Lead capture | Page hero + 5-card category picker → contextual form (extra field per category) → gold-check success state + direct email. |

**Interactions:** nav routes between the 5 pages (active link = gold text + gold underline, applied instantly via `.is-active`); ES⇄EN toggle swaps all copy live; service/process cards have hover lifts; the home Process section uses a 3D folder-open hover; contact picker → form → success is a 3-step client flow. All motion respects `prefers-reduced-motion`.

**Copy:** bilingual content lives in `website_kit/copy.js` (`window.ADS_COPY`). Tone is benefit-first, jargon-free, second-person (tú/vos), sentence case, **no emoji**.

---

## Iconography
- **No icon font / SVG library.** The "icons" are a curated set of **Unicode geometric glyphs** rendered in gold (~1.6–2rem): `✦` `◉` `★` `◈` `◻`. Reuse these five before anything else.
- Functional marks: gold-circle `✓` (benefit lists), arrows `→ ↺`, process numbers `01–05` as typographic labels.
- **Emoji: never.** If you need a fuller icon set, substitute a thin/minimal CDN set (e.g. Lucide, 1.5px stroke) tinted gold or charcoal — and note the substitution.

## Assets — `assets/`
| File | Use |
|---|---|
| `assets/logos/navbar-logo.png` | **Primary** ADS monogram (gold + charcoal) — navbar, favicon |
| `assets/logos/footer-logo.png` | ADS full lockup ("ADS \| ALPHADEV STUDIOS") — footer, print |
| `assets/logos/ads-logo.svg` | ADS line monogram — hero reveal |
| `assets/logos/alphadev-logo.png`, `alphadev-script-logo.png` | ⚠️ **Legacy** (pre-rebrand blue identity) — reference only, do NOT use |

Source: AlphaDev's live Next.js marketing codebase (`AlphaWEB/`).

## Files in this bundle
```
SKILL.md                  ← Agent Skill entry (install under .claude/skills/)
DESIGN_SYSTEM.md          ← full brand guide (content & visual foundations, iconography)
CHANGELOG.md              ← received (AlphaWEB) → delivered, segment by segment
screenshots/              ← 13 PNGs: routes (ES/EN), component cards, token specimens
styles.css                ← token entry point (@import list)
tokens/                   ← colors, typography, spacing, effects, fonts
components/<group>/        ← .prompt.md usage specs for Button, Eyebrow, SectionHeader, Card, Badge, Input, LanguageToggle
assets/logos/             ← brand logos
reference/AlphaDev Studios Website.html   ← standalone offline site (visual source of truth)
reference/website_kit/     ← website source for reading (index.html + copy.js; uses the live JSX composition)
HANDOFF.md                ← this file
```

## Notes
- Fonts (Playfair Display + Inter) load from Google Fonts via `tokens/fonts.css`. For production/offline, self-host the `.woff2` files and replace the `@import` with `@font-face` rules.
- One accent only — let gold carry emphasis. Earn elevation on hover, not at rest. Keep copy benefit-first, bilingual, emoji-free.
- A developer who wasn't in this conversation can implement the brand from `DESIGN_SYSTEM.md` + the tokens + `reference/` alone.
