# AlphaDev Studios — Design System

> **Tagline:** *"Te hacemos existir en internet."* (We make you exist online.)
> **Aesthetic:** Light Luxury — warm cream + gold, editorial serif headlines.

AlphaDev Studios (also branded **ADS**) is a bilingual (ES/EN) **digital-presence agency** serving small and medium businesses across **LATAM and the United States**. The promise is simple and emotional: *"Si no estás en internet, no existes. Nosotros te hacemos existir."* — if you're not online, you don't exist, and we make you exist. They build a business's complete digital presence from zero: brand, website, social media, Google Business profile, and advertising — all explained in plain language, never jargon.

This design system captures the brand's **post-rebrand "Light Luxury" identity** as it exists in the live marketing website.

---

## ⚠️ Important brand context — two identities

The codebase contains traces of **two brand eras**. This system documents the **current** one:

| | **Legacy (pre-rebrand)** | **Current — documented here** |
|---|---|---|
| Positioning | "Ingeniería de Software Empresarial" (enterprise software) | "Te hacemos existir en internet" (digital presence for SMBs) |
| Audience | Founders / technical buyers | Business owners, PyMEs — non-technical |
| Palette | Dark obsidian + electric blue `#0080FF` | **Warm cream `#FAFAF7` + gold `#9A7235`** |
| Logo | Blue gradient triangle "ALPHADEV" | **Gold + charcoal "ADS" monogram** |
| Tone | Technical, stack-forward | Benefit-driven, warm, plain-spoken |

The live `globals.css` is a *"Light Luxury Design System — Warm Cream + Gold"* — **that is the source of truth**, and what every token, component and card here reflects. The legacy blue-triangle assets and the old "Software con IA dentro, no encima" tech tagline are retained only for reference (`--legacy-*` tokens, `assets/logos/alphadev-logo.png`) and should **not** be used in new work.

> **Note on AlphaDev 360 SaaS:** The brief mentions an "AlphaDev 360" SaaS platform. It does **not** appear in the attached codebase, so no UI kit was built for it. The one shippable product surface in the codebase is the marketing website — that is the UI kit included here. Attach the SaaS codebase/Figma if you'd like it added.

### Sources
- **Codebase:** `AlphaWEB/` — Next.js 15 + Tailwind v4 marketing site (read-only, mounted locally). Key files: `app/globals.css` (live design system), `lib/i18n/{es,en}.ts` (bilingual copy), `components/*` (sections), `docs/ads-copy-nuevo-sitio.md` (copy strategy), `docs/visual-art-direction.md` (legacy art direction — describes the *old* dark theme).
- **Contact / brand owner:** zavarsegabriel@gmail.com · @alphadev.studio · +1 (407) 686-7561 (US) · +52 56 3711 3563 (MX)

---

## CONTENT FUNDAMENTALS

**The golden rule: zero technical jargon.** Copy speaks to a business owner who does not know or care about technology — they care about getting clients and being visible. Never say "API," "full-stack," "escalable," "arquitectura," or name tools/languages. Talk about **results and benefits**, never the machinery.

- **Voice — second person, warm and direct.** Always *tú/vos* ("tu negocio," "te hacemos existir," "tus clientes te encuentran"). The reader is *you*; the studio is *nosotros* ("nos ocupamos de todo"). It feels like a capable friend talking, not a vendor pitching.
- **Spanish-first, fully bilingual.** Every string ships in ES and EN. Spanish is the primary voice (LATAM); the EN mirrors it 1:1. The ES uses neutral-LATAM phrasing (mostly *tú*, occasional *vos* in marketing docs).
- **Emotional problem → confident solution.** The arc is consistent: name the pain ("Tu negocio es bueno. Pero nadie lo encuentra."), land the punch ("El problema no es tu negocio. Es que eres invisible."), then promise relief.
- **Short, punchy, fragment-friendly.** Headlines break across two lines with a hard stop. Sentences are short. Em-dashes and line breaks carry rhythm: *"De invisible a imparable, en pasos simples."*
- **Honest, no fake proof.** The brand explicitly refuses invented testimonials or fake metrics ("Sin inventar testimonios ni resultados falsos"). Placeholders are candid: *"Tu negocio podría estar aquí."*
- **Casing:** Sentence case everywhere except **UPPERCASE eyebrows/labels** (SERVICIOS, EL PROBLEMA, POR QUÉ ADS) set in wide-tracked Inter. Headlines are Title-free sentence case in Playfair.
- **The ADS wordplay.** ADS = AlphaDev Studios = *ads* (advertising). Used sparingly as a flourish: *"ADS. Tres letras. Tu negocio, visible."*
- **Emoji:** **None.** The premium editorial mood forbids them. Where the old site used emoji icons, the rebrand replaced them with restrained geometric glyphs (✦ ◉ ★ ◈ ◻).
- **CTAs are first-person desire:** *"Quiero existir en internet," "Quiero mi llamada"* — the user voicing what they want, not an imperative command.

**Example transformations (from the copy guide):**
| ❌ Old (technical) | ✅ Current (benefit) |
|---|---|
| "APIs escalables y robustas" | "Tu negocio funcionando sin fallas" |
| "Arquitectura full-stack" | "Todo lo que necesitas, en un solo lugar" |
| "Stack moderno con IA integrada" | "Tecnología de punta, sin que tengas que entenderla" |

---

## VISUAL FOUNDATIONS

The mood is **editorial premium / light luxury** — think a refined print magazine, not a tech startup. Warm, calm, confident, and tactile.

- **Color.** A warm **cream** canvas (`#FAFAF7` page, `#F2EEE7` alt sections, white cards) with a single disciplined accent: **gold** (`#9A7235`, light `#C9A465`, dark `#7A5828`). Text is a **warm charcoal** (`#1A1512`), never pure black. There are *no* secondary brand hues — gold does all the accent work (links, buttons, dividers, glints, checkmarks). One inverted surface exists: the closing CTA flips to dark warm-charcoal `#1A1512` for a single dramatic moment.
- **Typography.** Two families. **Playfair Display** (serif) for all headlines, titles, and editorial flourishes — high-contrast, elegant, often with an *italic* gold emphasis word. **Inter** (sans) for body, UI, labels, and buttons. The contrast of dramatic serif against clean sans *is* the brand's typographic signature. Headlines run large (clamp 2.5→4rem), tight line-height (1.1), slightly negative tracking.
- **Backgrounds & texture.** Never flat. A near-invisible **film-grain overlay** (`feTurbulence`, 2.8% opacity, multiply blend) sits over the whole page for an analog, printed feel. A **gold dot-grid** (1px dots, 28px pitch, ~12% gold) appears behind the process and CTA sections, radially masked so it fades at the edges. The hero adds slow-drifting **ambient gold orbs** (blurred radial gradients on `orb-drift` keyframes).
- **Animation.** Calm and premium — *no bounce, no spin*. The signature easing is `cubic-bezier(0.16, 1, 0.3, 1)` (a smooth decelerating ease-out). Entrances are gentle `fade-in-up` (24px rise). Durations 0.2–0.35s. Decorative motion is slow and ambient (16–30s orb/marquee loops). Everything respects `prefers-reduced-motion`.
- **Hover states.** Cards **lift −3px** with a soft gold-tinted shadow (`0 8px 32px rgba(154,114,53,0.10)`), their border warms to gold, and a faint diagonal **gold wash** (`linear-gradient(135deg, gold-bg, transparent)`) fades in. Nav links draw a **gold underline left→right**. Buttons lift −2px and gain a gold glow + ring. Arrows nudge `translateX(4px)`.
- **Press states.** Buttons return to `translateY(0) scale(1)` and drop their shadow — a subtle "settle" rather than a hard depress.
- **Borders.** Hairline `1px` in warm cream-300 (`#E8E2D9`); on hover/focus they warm to translucent gold (`rgba(154,114,53,0.2)`). Sections are separated by a single top border, not heavy rules.
- **Shadows.** Soft and **warm-tinted** (gold/charcoal alpha, never neutral gray). A restrained ramp: nav pill rests at `0 2px 24px`, cards lift to `0 8px 32px`, the primary button hover adds a gold glow with a `4px` ring. No harsh or large-spread shadows.
- **The gold divider.** A 3rem-wide, 2px, horizontally-symmetric gradient rule (`transparent → gold → transparent`) under section titles — the brand's most-repeated flourish.
- **Corner radii.** Generous but not pill-soft: inputs `6px`, buttons `8px`, form cards `12px`, **feature cards `16px`**, the nav pill / panels `20px`, chips & toggles fully round.
- **Cards.** White (`#FFFFFF`) on cream, `1px` warm border, `16px` radius, `2rem` padding, **no** resting shadow — they earn elevation only on hover. Never colored-left-border cards; never heavy drop shadows at rest.
- **Glass & blur.** Reserved for the floating nav pill only: `backdrop-filter: blur(20px)` over a translucent cream (`rgba(250,250,247,0.9)`). Not used elsewhere.
- **Imagery vibe.** Warm and editorial; the live hero is a cinematic intro video resolving to the logo on cream. Logos sit on cream or white with breathing room. (No stock-photo library is present in the codebase.)
- **Layout.** Centered max-width `1280px` container, `1.5rem` mobile / `2.5rem` desktop gutters. **Editorial breathing room** is core: sections pad `clamp(60px → 120px)` vertically. Section headers are centered (eyebrow → title → divider → subtitle) with a readable `40rem` measure. The nav is a fixed floating pill, centered, that fades in on scroll.

---

## ICONOGRAPHY

AlphaDev's icon approach is **deliberately minimal and emoji-free** — a direct reaction against the pre-rebrand site, which used emoji (🌐 ⚡ 💼) and broke the premium mood.

- **Geometric glyph set.** Services and feature cards use a small, curated set of **Unicode geometric glyphs** rendered in gold at ~1.6–2rem: `✦` (sparkle), `◉` (target), `★` (star), `◈` (diamond), `◻` (square). These read as refined marks, not playful icons. Reuse these five before reaching for anything else.
- **Functional marks.** A gold-circle **checkmark** (`✓`) for benefit lists, **arrows** (`→ ↺`) for affordances, and the **process step numbers** (01–05) as typographic labels. The hamburger uses `☰ / ✕`.
- **No icon font, no SVG icon library** is bundled in the codebase. The art-direction doc *proposes* future 3D/line-art icon sets and tech-stack SVGs from simpleicons.org, but **none are implemented** — so this system does not ship an icon set. If a project needs a fuller icon set, substitute a CDN library that matches the restrained, thin aesthetic (e.g. **Lucide**, 1.5px stroke) and tint it gold or charcoal — **flag the substitution**.
- **Emoji:** never. **Unicode geometric glyphs:** yes, as the house "icons."
- **Logos** live in `assets/logos/` — see Brand below.

---

## VISUAL ASSETS

Located in `assets/`:

| Asset | File | Use |
|---|---|---|
| **ADS monogram** (gold + charcoal) | `assets/logos/navbar-logo.png` | Navbar, favicon, compact mark — **primary logo** |
| **ADS full lockup** ("ADS \| ALPHADEV STUDIOS") | `assets/logos/footer-logo.png` | Footer, print, wide placements |
| **ADS line monogram** (hero reveal) | `assets/logos/ads-logo.svg` | Monochrome line-art mark used in the hero video reveal |
| *Legacy* blue triangle logo | `assets/logos/alphadev-logo.png` | ⚠️ Reference only — pre-rebrand identity, do not use |
| *Legacy* script wordmark | `assets/logos/alphadev-script-logo.png` | ⚠️ Reference only |

The monogram is built from three forms — a gold + charcoal **A**, a **D**, and an **S** — interlocked. Give it clear space and place it on cream or white. The "S" and parts of the "A" carry the gold; the rest is warm charcoal.

---

## CONTENT INDEX (manifest)

### Foundations
- `styles.css` — **entry point** (consumers link this). `@import`s only.
- `tokens/fonts.css` — Playfair Display + Inter (Google Fonts).
- `tokens/colors.css` — cream / ink / gold ramps + semantic surface/text/border aliases.
- `tokens/typography.css` — families, type scale, weights, line-heights, tracking.
- `tokens/spacing.css` — 8px spacing scale, layout, corner radii.
- `tokens/effects.css` — shadows, motion easing/durations, grain + dot-grid utilities, `.gold-divider`.

### Foundation cards (Design System tab)
`guidelines/*.card.html` — **Colors** (surfaces, gold, ink, tints) · **Type** (display, body, scale) · **Spacing** (scale, radii, shadows) · **Brand** (logo, signature motifs).

### Components (`window.AlphaDevStudiosDesignSystem_3c302f`)
- **core/** — `Button`, `Eyebrow`, `SectionHeader`
- **surfaces/** — `Card`, `Badge`
- **forms/** — `Input`, `LanguageToggle`

Each has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and a per-directory `*.card.html` showing live states.

### UI kit
- `ui_kits/website/` — the bilingual marketing website (hero, problem, services, process, results, why, CTA, contact, footer). See its `README.md`.

### Skill
- `SKILL.md` — makes this system usable as a downloadable Agent Skill.

---

## Quick start for designers

1. Link `styles.css` — you get every token and the grain/dot-grid/divider utilities.
2. Headlines in **Playfair**, everything else in **Inter**. Cream canvas, gold accent, warm-charcoal text.
3. Open a section with `<SectionHeader eyebrow title subtitle />`. Lay content in `<Card>`s. Drive action with `<Button>`.
4. Keep copy **benefit-first and jargon-free**, second-person, sentence case, no emoji. Ship ES + EN.
5. One accent only — let gold do the work. Earn elevation on hover, not at rest.
