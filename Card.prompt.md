The white feature card used across services, capabilities and case studies — warm 1px border, 16px radius, and a soft gold-tinted lift with a diagonal wash on hover.

```jsx
<Card href="/contacto">
  <div style={{ fontSize: '1.5rem', color: 'var(--gold-500)' }}>✦</div>
  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>Presencia desde cero</h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Marca, sitio y perfiles. Sales a internet completo.</p>
</Card>
```

Set `interactive={false}` for static cards, `wash={false}` to drop the gold gradient, `href` to make the whole card a link. Compose freely inside — title in Playfair, body in Inter muted.
