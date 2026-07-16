---
name: alphadev-studios-design
description: Use this skill to generate well-branded interfaces and assets for AlphaDev Studios (ADS), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the "Light Luxury" warm-cream-and-gold brand.
user-invocable: true
---

# AlphaDev Studios — Design Skill

AlphaDev Studios (ADS) is a bilingual (ES/EN) digital-presence agency for small and medium businesses in LATAM and the US. The brand is **"Light Luxury"**: a warm cream canvas, a single gold accent, editorial Playfair Display headlines over Inter body, a subtle film-grain texture, and benefit-driven, jargon-free, second-person copy. Tagline: *"Te hacemos existir en internet."*

Read **`README.md`** first — it is the full design guide (brand context, content fundamentals, visual foundations, iconography, asset list, and a content index). Then explore the other files as needed.

## What's here
- `styles.css` — the one stylesheet to link; `@import`s all tokens + fonts.
- `tokens/` — colors, typography, spacing, effects (CSS custom properties).
- `components/` — React primitives: `Button`, `Eyebrow`, `SectionHeader`, `Card`, `Badge`, `Input`, `LanguageToggle`. Each has a `.d.ts` (props) and `.prompt.md` (usage).
- `guidelines/` — foundation specimen cards (HTML).
- `ui_kits/website/` — a full bilingual marketing-site recreation that composes the primitives.
- `assets/logos/` — the gold + charcoal ADS monogram and lockup (use these; ignore the legacy blue-triangle assets).

## How to use
- **Visual artifacts (slides, mocks, throwaway prototypes):** copy the assets you need out, link `styles.css`, and produce static/standalone HTML for the user to view. Lead with cream + gold, Playfair headlines, generous breathing room, one gold accent.
- **Production code:** copy assets and follow the rules in `README.md` to design like a brand expert. Components reference CSS custom properties, so they drop into any project that links `styles.css`.

## Non-negotiables
- One accent: **gold**. Warm cream surfaces, warm-charcoal text (never pure black).
- Headlines **Playfair Display**; body/UI **Inter**.
- Copy is **benefit-first, jargon-free, second-person (tú/vos), sentence case, no emoji**, and ships **bilingual ES + EN**.
- Use the curated geometric glyphs (✦ ◉ ★ ◈ ◻) as icons, not emoji. Earn elevation on hover, not at rest.

If invoked without other guidance, ask the user what they want to build, ask a few clarifying questions (audience, ES/EN, production vs. mock), then act as an expert ADS designer who outputs HTML artifacts *or* production code as needed.
