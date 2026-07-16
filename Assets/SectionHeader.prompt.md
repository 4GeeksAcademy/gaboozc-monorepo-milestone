The centered section-opener stack — eyebrow, Playfair title, gold divider, subtitle — used at the top of nearly every site section.

```jsx
<SectionHeader
  eyebrow="Servicios"
  title={"Todo lo que tu negocio\nnecesita para brillar online."}
  subtitle="Sin tecnicismos. Solo resultados que puedes medir."
/>
```

`title` honors `\n` for manual line breaks. Set `align="left"` for left-aligned openers, `divider={false}` to drop the gold rule. Composes the `Eyebrow` primitive.
