# CHANGELOG — De lo recibido a lo entregado

Este documento detalla, **segmento por segmento**, qué recibí (el codebase `AlphaWEB/` — sitio Next.js 15 + Tailwind v4) y qué entrego (este sistema de diseño). Las capturas referenciadas están en `screenshots/`.

---

## 0. Resumen ejecutivo

| | **Recibido (AlphaWEB)** | **Entregado (Design System)** |
|---|---|---|
| Formato | Codebase Next.js de producción (TSX + Tailwind + i18n) | Sistema de diseño portable: tokens CSS, componentes, assets, guías, kit de referencia |
| Fuente de verdad visual | `app/globals.css` ("Light Luxury") | Extraída y normalizada en `tokens/*.css` |
| Identidad | Dos eras mezcladas en el repo (tech oscuro legado + crema/oro nuevo) | **Una sola** identidad documentada: crema + oro. Legado marcado como solo-referencia |
| Reutilizable por | Solo dentro del repo | Cualquier proyecto (skill de Claude Code, prototipos, producción) |

---

## 1. Identidad de marca — resolución de las dos eras

- **Recibido:** el repo contenía rastros de **dos marcas**. El doc `docs/visual-art-direction.md` describía una identidad **tech oscura** (obsidiana + azul eléctrico `#0080FF`, logo triángulo "ALPHADEV", tono técnico). Pero el `globals.css` en vivo ya era **"Light Luxury — Warm Cream + Gold"**. Conviven el logo azul legado y el monograma dorado "ADS".
- **Entregado:** tomé el **`globals.css` en vivo como fuente de verdad** (es lo que realmente renderiza el sitio). Documenté la identidad crema + oro y **degradé el azul/triángulo a solo-referencia**: tokens `--legacy-blue`/`--legacy-ink` conservados pero marcados "no usar", y los logos legados (`alphadev-logo.png`, `alphadev-script-logo.png`) etiquetados ⚠️ en `DESIGN_SYSTEM.md`.
- **Por qué:** evitar que un consumidor del sistema mezcle ambas marcas. La tabla comparativa de las dos eras está en `DESIGN_SYSTEM.md`.

---

## 2. Color — `tokens/colors.css` · ver `screenshots/12-tokens-gold.png`

- **Recibido:** variables sueltas dentro de `globals.css` mezcladas con reglas de Tailwind y utilidades.
- **Entregado:** rampa completa extraída y organizada en **valores base + alias semánticos**:
  - Crema (`--cream-50…300`) → `--surface-page/-alt/-deep/-card/-invert`.
  - Tinta cálida (`--ink-900…300`) → `--text-primary/-heading/-muted/-subtle` (nunca negro puro).
  - Oro como **único acento** (`--gold-700/500/300/100`) → `--accent`, `--accent-hover`, `--accent-glint`.
  - Transparencias de oro nuevas y nombradas: `--gold-bg` (washes), `--gold-border` (bordes hover/focus), `--focus-ring`.
- **Cambio de criterio:** confirmé y documenté que **no hay color secundario** — el oro hace todo el trabajo de acento.

---

## 3. Tipografía — `tokens/typography.css` · ver `screenshots/13-tokens-type.png`

- **Recibido:** `next/font/google` cargando **Playfair Display** (display) e **Inter** (cuerpo) en `layout.tsx`, con tamaños aplicados ad-hoc vía clases Tailwind.
- **Entregado:**
  - Familias en variables (`--font-display`, `--font-body`, `--font-ui`) + alias `--font-playfair`/`--font-inter` para coincidir con el código original.
  - **Escala tipográfica completa** formalizada (`--text-xs` 12px … `--text-5xl` 72px) + fluidas `--text-section` y `--text-hero` con `clamp()`.
  - Pesos, line-heights y tracking tokenizados (incluye `--tracking-eyebrow: 0.16em` para los eyebrows).
  - Fuentes cargadas vía `tokens/fonts.css` (Google Fonts) para portabilidad fuera de Next.

---

## 4. Espaciado, radios y efectos — `tokens/spacing.css`, `tokens/effects.css`

- **Recibido:** valores dispersos (paddings de sección, radios, sombras) inline o en utilidades Tailwind; el motivo de "carpeta 3D" del proceso y el grano de película existían como CSS suelto.
- **Entregado:**
  - Escala de espaciado 8px (`--space-1…32`) + padding de sección fluido `--section-pad-y: clamp(60px,9vw,120px)`.
  - Radios tokenizados (6/8/12/16/20/999px) mapeados a su uso (input → pill).
  - **Sombras cálidas** (tinte oro/carbón, nunca gris) en rampa `--shadow-sm/md/lg/gold`.
  - Motion: easing firma `--ease-out: cubic-bezier(0.16,1,0.3,1)` + duraciones.
  - Utilidades de marca reempaquetadas: `.gold-divider`, `.bg-dot-grid` y el overlay de grano (`feTurbulence`, 2.8%).

---

## 5. Componentes — `components/` · ver `screenshots/09–11`

- **Recibido:** componentes de producción acoplados a Next/i18n (`Navbar.tsx`, `Hero.tsx`, `ServicesSection.tsx`, `Footer.tsx`, etc.) con lógica, `useLang`, `Link`, etc.
- **Entregado:** **7 primitivas desacopladas y cosméticas**, cada una con spec de props (`.d.ts`) y guía de uso (`.prompt.md`) — en este paquete de handoff se incluyen los `.prompt.md` (los `.d.ts`/`.jsx` viven en el sistema; aquí se documentan en `HANDOFF.md`):
  - `Button` (variants primary/secondary/ghost · lift-on-hover dorado) — ver `09-components-core.png`.
  - `Eyebrow` (micro-label dorado en mayúsculas).
  - `SectionHeader` (stack eyebrow → título Playfair → divisor oro → subtítulo).
  - `Card` (tarjeta blanca, borde cálido, elevación + wash dorado al hover) — ver `10-components-surfaces.png`.
  - `Badge` (meta/solid/outline/neutral).
  - `Input` (campo/textarea con focus ring dorado) y `LanguageToggle` (ES·EN) — ver `11-components-forms.png`.
- **Cambio de criterio:** las primitivas no replican la implementación de producción; son versiones simples basadas en variables CSS, pensadas para recrear la marca en cualquier stack.

---

## 6. Sitio — de secciones en una página a **5 rutas dedicadas**

- **Recibido:** el sitio real tiene **páginas separadas** por ruta (`app/servicios`, `app/portafolio`, `app/proceso`, `app/contacto`) además del home con previews.
- **Entregado:** un kit interactivo (`reference/website_kit/`, y la versión offline `reference/AlphaDev Studios Website.html`) que **replica ese ruteo**: el nav navega entre 5 páginas reales (no anclas), con indicador activo en oro. Desglose por segmento:

| Segmento | Recibido | Entregado | Captura |
|---|---|---|---|
| **Nav** | Navbar fija con `useLang` y `Link` | Pill flotante frosted, links con subrayado oro, indicador **activo instantáneo** (oro), toggle ES·EN, CTA | todas |
| **Inicio / Hero** | Hero con video introductorio | Hero a pantalla completa: título Playfair, orbes de oro ambientales, dot-grid enmascarado, doble CTA | `01-inicio-hero.png` |
| **Problema** | `ProblemSection.tsx` | Superficie alt + tarjeta de "punch" con borde oro | (home, bajo el hero) |
| **Servicios** | `app/servicios` con 5 servicios detallados | Página propia: page-hero + 5 `Card` con lista de entregables ✓ + CTA | `03-servicios.png` |
| **Resultados** | `app/portafolio` | Página propia: 3 `Card` (icono, título, meta oro, `Badge` outline) | `05-resultados.png` |
| **Cómo trabajamos** | `app/proceso` (5 fases) | Página propia: 5 phase-cards horizontales (sidebar numérico en degradé oro + detalles ✓ a 2 columnas) | `04-proceso.png` |
| **Contacto** | `app/contacto` con `ContactoForm` + categorías | Página propia: selector de 5 categorías → formulario contextual (campo extra por categoría) → estado de éxito | `06-contacto-picker.png` |
| **Cierre / CTA** | `CTASection.tsx` | Único panel oscuro (carbón cálido) con glow de oro | (home/rutas, al pie) |
| **Footer** | `Footer.tsx` con datos de contacto | Footer con lockup, columnas navegables y datos reales | (al pie) |

---

## 7. Iconografía

- **Recibido:** el sitio legado usaba **emoji** (🌐 ⚡ 💼) que rompían el mood premium; la nueva versión los reemplazó por glifos.
- **Entregado:** documenté el criterio: **sin emoji**; set curado de **glifos Unicode geométricos** en oro (`✦ ◉ ★ ◈ ◻`), `✓` para listas de beneficio, flechas y números de proceso `01–05`. Sin icon-font ni librería SVG (con recomendación de sustituto CDN tipo Lucide si hace falta, marcando la sustitución).

---

## 8. Copy bilingüe — `reference/website_kit/copy.js`

- **Recibido:** diccionarios `lib/i18n/es.ts` y `en.ts` con tipos.
- **Entregado:** subconjunto consolidado en `window.ADS_COPY` (ES/EN) con el contenido por página, incluido el detalle de servicios/proceso/categorías de contacto. Documenté el **tono**: beneficio primero, sin tecnicismos, segunda persona (tú/vos), sentence case, sin emoji, problema→solución.

---

## 9. Identidad como Skill + export

- **Añadido (no existía en el repo):**
  - `SKILL.md` — hace el sistema instalable como **Agent Skill de Claude Code** (`.claude/skills/alphadev-studios-design/`).
  - `DESIGN_SYSTEM.md` — guía de marca completa (fundamentos de contenido y visuales, iconografía, índice).
  - `reference/AlphaDev Studios Website.html` — sitio **autónomo offline** (todos los assets, fuentes y estilos inline) como fuente de verdad visual.
  - 13 capturas en `screenshots/` (rutas ES/EN + cards de componentes + tokens).

---

## 10. Limpieza del paquete de handoff

- Para que el compilador del sistema de diseño no colisione, este paquete **no incluye** los `.jsx`/`.d.ts`/`.card.html` duplicados ni etiquetas `@dsCard`. Las props y estados exactos de cada componente quedan documentados en `HANDOFF.md` y las guías `.prompt.md`. La composición real en JSX se puede leer en `reference/website_kit/index.html`.

---

## Índice de capturas (`screenshots/`)
| Archivo | Muestra |
|---|---|
| `01-inicio-hero.png` | Home — hero (ES) |
| `03-servicios.png` | Ruta Servicios |
| `04-proceso.png` | Ruta Cómo trabajamos |
| `05-resultados.png` | Ruta Resultados |
| `06-contacto-picker.png` | Ruta Contacto — selector de categoría |
| `08-inicio-EN.png` | Home en inglés (toggle ES·EN) |
| `09-components-core.png` | Button + Eyebrow + SectionHeader |
| `10-components-surfaces.png` | Card + Badge |
| `11-components-forms.png` | Input + LanguageToggle |
| `12-tokens-gold.png` | Rampa de oro (acento) |
| `13-tokens-type.png` | Escala tipográfica |
