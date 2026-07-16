The bilingual ES · EN segmented control from the navbar. The active language fills gold; bilingual ES/EN is core to the brand.

```jsx
const [lang, setLang] = React.useState('es');
<LanguageToggle value={lang} onChange={setLang} />
```

Controlled — pass `value` and `onChange`. Defaults to `['es','en']` but accepts any two-or-more short codes.
