# Welcome to AlphaDev Studios
### AI Engineering · 4Geeks Academy — Company Briefing

AlphaDev Studios is a digital engineering and advertising agency founded in 2023 by Gabriel Zavarse, headquartered in Mexico, serving clients across Mexico, the United States, and Venezuela. The company operates under the positioning **"Software con IA dentro, no encima"** ("Software with AI inside, not on top") and runs two connected business lines: a **template-driven web development studio** for small and medium niche businesses, and **AlphaDev 360**, a multi-module SaaS platform that productizes the agency's services for self-serve clients.

AlphaDev's clients fall into three segments, each with its own pricing model: PyME LATAM (small and medium Mexican businesses, priced in MXN), startups and mid-to-large companies (priced in USD), and the Venezuelan market (a dolarized lower tier). Clients come to AlphaDev because they need a professional web presence with real operational tooling behind it — not just a static site — and because building and maintaining that in-house is out of reach for a business their size.

## How the Company Is Organised

AlphaDev is led by **Gabriel Zavarse**, Founder & CEO since the company's founding. He is hands-on across engineering, sales, and delivery, and is building the systems that will let the studio scale beyond what one person — or a small team — can deliver manually.

The company is organised around the following areas:

**Software Engineering & Template Production** is the core of what AlphaDev does. The team builds and maintains a catalogue of niche website templates (tattoo studios, opticians, furniture stores, electricians and plumbers, veterinary clinics, psychologists and therapists, martial arts schools, coffee & brunch spots) on a React + Vite + Tailwind + Framer Motion + React Router DOM stack. Every template from #09 onward ships with a full `/admin` panel: authentication, a dark dashboard, KPIs, recharts graphs, and niche-specific modules. Each new template is still largely hand-built and hand-configured, including Vercel setup, one project at a time.

**AlphaDev 360** is the productized SaaS layer: a multi-module platform meant to let clients manage their own site, bookings, and content without a developer in the loop. The modules have grown organically as new client needs came up, and there is no unified onboarding flow, no in-product assistant, and no usage analytics telling the team which modules actually get used.

**Client Success & Delivery** manages onboarding, revisions, and handoff for every project. Communication with clients happens over email and WhatsApp, revision requests get tracked in scattered threads, and clients have no self-service way to check where their project stands.

**Sales & Business Development** is currently just Gabriel. Proposals — like the recent NurseConsult Pro engagement — are built manually as formal documents with two pricing models each time, referencing the rate card by hand to figure out which of the three market segments applies. There is no CRM, no repeatable proposal pipeline, and no systematic follow-up on leads that go quiet.

**Marketing** covers the AlphaDev Studios brand itself and Gabriel's parallel content brand, **Psique 'n' Pixel** (psychological and cultural analysis of video games). Content — blog posts, template showcases, Psique 'n' Pixel essays — is produced manually, and there's no tracking of what content actually drives inbound leads to AlphaDev.

**Talent & Mentorship** reflects Gabriel's role mentoring students in the AI Engineering prework cohort at 4Geeks Academy, and the internal `agent-rules.md` — a 75-skill bilingual playbook that encodes how AlphaDev's own AI coding agents should behave (Plan Mode, Spanish comments, complete files, logged tech debt). That knowledge lives in a single file; there's no searchable knowledge base and no structured way to onboard a new collaborator or mentee into "how AlphaDev works."

**Finance & Operations** tracks money across three accounts in two currencies (a personal finance workbook called ATHENEA has the same shape: Nu México/MXN, and two USD accounts), plus the AlphaDev rate card spanning MXN and USD segments. Reconciliation and reporting are manual, and an early-stage AI analysis tab (JARVIS) exists but isn't connected to real-time data.

**Executive Leadership** centres on Gabriel, who has no unified view across templates delivered, active proposals, client health, and cash position — he holds all of it in his head or across separate spreadsheets and files.

## Where the Company Stands Today

AlphaDev has a real, working catalogue of niche templates, a genuine technical edge (every template ships with a production-grade admin panel, not just a marketing page), and a growing reputation built one client at a time. What it doesn't have is the infrastructure to take on more clients and more templates without Gabriel personally touching every step.

The consequences are tangible: each new template still means custom configuration instead of reuse, proposals take hours to assemble by hand, clients have no visibility into project status, the AlphaDev 360 modules aren't instrumented, and there's no dashboard that tells Gabriel, at a glance, how the business is actually doing.

Larger agencies and no-code platforms are starting to compete on the same niches AlphaDev serves. The advantage AlphaDev can defend is depth — real admin panels, real automation, real AI — not just more templates.

You are part of the team building that advantage.

## The Departments and Their Problems

### 🛠️ Software Engineering & Template Production
**Lead:** Gabriel Zavarse (core engineering)

Every new template starts close to scratch: layout, copy, admin panel wiring, and Vercel configuration are redone by hand even though the underlying pattern (from Template #09 onward) is now standardised. There's no component library or scaffolding tool that turns "new niche + brand colors" into a working template automatically.

**What they need:** An AI-assisted template scaffolding tool that generates a first-pass site + admin panel from a niche brief, a component/pattern library with semantic search ("find the admin KPI card pattern used in the veterinary template"), and a deployment checklist automation for Vercel setup.

### 📦 AlphaDev 360 (Product)
**Lead:** Gabriel Zavarse (product)

Modules were added reactively, client by client, with no shared onboarding flow. Nobody currently knows which modules are actually used after go-live, and clients get no proactive guidance inside the product.

**What they need:** A usage analytics dashboard per client/module, an in-product onboarding assistant, and a recommendation engine that suggests the next module to activate based on a client's niche and current usage.

### 🤝 Client Success & Delivery
**Lead:** Client Success (currently informal)

Revision requests and status questions arrive over email and WhatsApp with no central record. Clients have to ask to find out where their project stands, and nothing surfaces which projects are stalling before the client complains.

**What they need:** A client-facing project status portal, a revision-request intake and triage system, and an agent that drafts status updates automatically from project activity.

### 💼 Sales & Business Development
**Lead:** Gabriel Zavarse (sales)

Every proposal — like NurseConsult Pro — is built manually, including manually looking up which of the three rate-card segments (PyME LATAM MXN, startups/mid-large USD, Venezuela dolarized) applies. There's no CRM and no systematic follow-up, so leads go cold silently.

**What they need:** An AI agent that drafts a segmented proposal (correct currency and pricing tier) from a short client brief, a lightweight pipeline/CRM view of leads and their stage, and automated follow-up nudges for stalled conversations.

### 📣 Marketing (AlphaDev Studios & Psique 'n' Pixel)
**Lead:** Gabriel Zavarse (marketing)

Content for both the AlphaDev brand and Psique 'n' Pixel is written manually with no repeatable pipeline and no measurement of what converts a reader into a lead.

**What they need:** An AI-assisted content pipeline for both brands, a marketing dashboard tracking traffic sources and lead conversion, and SEO/GEO optimisation for the template showcase pages.

### 📚 Talent & Mentorship
**Lead:** Gabriel Zavarse (mentorship)

The `agent-rules.md` playbook and everything Gabriel knows about "how AlphaDev builds software" lives in his head and a handful of files. New mentees and collaborators have no self-serve way to learn it.

**What they need:** A RAG-based internal knowledge assistant over AlphaDev's engineering standards and past project decisions, and a structured onboarding checklist generator for new mentees or collaborators.

### 💰 Finance & Operations
**Lead:** Gabriel Zavarse (finance)

Money is tracked across MXN and USD accounts with manual reconciliation, and the JARVIS analysis tab isn't connected to live data, so financial visibility always lags reality.

**What they need:** An automated multi-currency finance dashboard, a JARVIS-style AI analysis agent connected to real transaction data, and cash-flow alerts tied to the rate card's three market segments.

### 📊 Executive Direction
**Lead:** Gabriel Zavarse (CEO)

There is no single view spanning templates delivered, proposals in flight, client health, and cash position — each lives in a different tool or file.

**What he needs:** A unified executive dashboard pulling real-time KPIs from every area above, an automatically generated weekly summary, and a natural-language assistant he can query directly about the state of the business.

## Why Choose AlphaDev Studios?

Choose AlphaDev if you are drawn to:

- **Builder-facing tooling** — your users are the studio's own team and its niche-business clients, not anonymous consumers.
- **Multi-tenant, multi-niche complexity** — the same admin-panel pattern has to work for a tattoo shop, a veterinary clinic, and a martial arts school, each with different data and different KPIs.
- **AI at the core of delivery, not bolted on** — scaffolding, proposal generation, and the internal knowledge assistant are meant to directly speed up how fast AlphaDev can take on new clients.
- **Small-team reality** — most departments are effectively one person wearing multiple hats, so the AI Engineering challenge is squarely about leverage: how much can automation multiply what a lean team can do.

The AI challenges at AlphaDev Studios include RAG over a component/pattern library for automated scaffolding, a segmented proposal-generation agent that respects three pricing tiers and two currencies, a usage-based module recommendation engine for AlphaDev 360, and a natural-language executive assistant over cross-department data.

---
*Internal document — 4Geeks Academy · AI Engineering Track. Adapted from AlphaDev Studios for exclusive use in programme project generation.*