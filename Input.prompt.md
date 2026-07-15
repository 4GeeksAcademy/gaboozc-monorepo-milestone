Text input or textarea on white, with a warm border and a gold focus ring. Optional label sits above.

```jsx
<Input label="Nombre" placeholder="Tu nombre completo" />
<Input label="Cuéntanos sobre tu negocio" multiline rows={5}
       placeholder="¿Qué vendes? ¿Quiénes son tus clientes?" />
```

Set `multiline` for a textarea (`rows` controls height). Controlled via `value`/`onChange`. Focus shows a soft gold ring; matches the contact form on the site.
