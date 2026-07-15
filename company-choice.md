# Company Choice — Milestone 0

## Chosen Company: AlphaDev Studios

I'm choosing **AlphaDev Studios** for this project. It's a digital engineering and advertising agency running two connected lines — a niche website template catalogue (React + Vite + Tailwind + Framer Motion) and **AlphaDev 360**, a multi-module SaaS platform — serving three pricing segments (PyME LATAM in MXN, startups/mid-large companies in USD, and a dolarized Venezuelan tier). Every template from #09 onward already ships with a full `/admin` panel (auth, dark dashboard, KPIs, recharts), which means the operational surface area — and the AI Engineering opportunity — is real, not hypothetical. Proposals like the recent NurseConsult Pro engagement are still built by hand, one client at a time, including manually figuring out which of the three rate-card segments applies, which is exactly the kind of repeatable, data-driven task AI Engineering is meant to solve. I also want my portfolio to reflect a company I actually understand end-to-end rather than a scenario I'm reading for the first time.

**Departments I find most interesting:**
- **Software Engineering & Template Production** — because turning the standardised #09-onward template pattern into an automated scaffolding tool is a concrete, high-leverage AI Engineering problem: generate a first-pass site + admin panel from a niche brief instead of rebuilding by hand each time.
- **Sales & Business Development** — because segmenting proposals correctly across three pricing tiers and two currencies is a well-defined, structured problem that an AI agent can genuinely own, and it maps directly onto a business I have real data for.

**Automation/AI challenge I'm most looking forward to building:**
The **segmented proposal-generation agent** — an agent that takes a short client brief, determines the correct pricing segment (PyME LATAM MXN / startup-midsize USD / Venezuela dolarized USD), and drafts a proposal in the right currency and tier, the way NurseConsult Pro was built manually.

## My AI Agent Idea

The agent would take a short client brief (business name, niche, rough location/market, and requested scope) and determine which of AlphaDev's three pricing segments applies before drafting a two-option proposal (e.g., a lighter package vs. a full package with admin panel), pulling numbers from the rate card rather than a human doing that lookup by hand. It would need read access to the rate-card data (segments, currencies, service line items) and to a small library of past proposal structures (like NurseConsult Pro) so its output matches AlphaDev's existing tone and format. It would interact with Gabriel through a simple form or chat prompt, and its output would be a draft proposal document he reviews and sends — not something sent automatically to the client.