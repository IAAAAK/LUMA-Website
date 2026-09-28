# LUMA marketing website — project context

This file carries over the full planning and design work done in claude.ai so Claude Code can continue building without re-explaining. Read it fully before starting.

## Owner and company
- Owner: Imad Kaissi, IT Head at **Innovative Tech** (managed IT, web apps and integration, Odoo ERP, and the LUMA platform). ~20 years in IT.
- Target market: GCC / Middle East.
- This repo is the **public marketing website** for LUMA. The LUMA platform itself already exists and runs elsewhere; the site only links to it (sign in, sign up) and embeds a LUMA agent as the chat widget.

## What LUMA is
AI agent platform for customer engagement: AI agents with a knowledge base (linkable to website/app), WhatsApp Business API messaging and campaigns, lead capture and qualification, voice AI chat, human handoff with team inbox, contacts/audiences segmentation, usage and credit ledger. Integration today: Microsoft Dynamics 365 Business Central (send invoices/documents via WhatsApp, run campaigns from BC). Innovative Tech builds custom integrations for other systems.

Brand taglines: "Engage | Automate | Grow" and "AI Agents & WhatsApp Solutions".

## Pricing (use these exact numbers)
| | Starter | Pro (most popular) | Enterprise |
|---|---|---|---|
| Price | $50/mo | $100/mo | $300/mo |
| AI agents | 2 | 10 | Unlimited |
| Credits / month | 60,000 | 900,000 | 3,000,000 |
| WhatsApp messages | 5,000 | 75,000 | 250,000 |
| Numbers / users | 1 number, 2 users | 3 numbers, 10 users | Unlimited |
| Support | Email | Priority + onboarding | Dedicated + SLA |

- Yearly billing = 25% off (shown as $37.50 / $75 / $225 per month, billed yearly).
- Meta's WhatsApp conversation fees are billed separately by Meta, NOT included in LUMA plans. Always state this near pricing.

## Credits
- $1 = 10,000 credits. AI credits power text replies, voice calls and training.
- 60 credits per AI message; 600 credits per voice AI minute; 12 credits per outbound WhatsApp message.
- Inbound and session messages are free.
- Top-up packs (one-time, never expire): 200K/$20, 500K/$50, 1M/$100, 2M/$200, 5M/$500. 200K for $20 ≈ 3,333 AI messages.

## AI Credit Calculator (must match reference screenshot `assets/reference-calculator-screenshot.png`)
- Two sliders: AI messages/month (0–10,000, step 100, default 500, label "10,000+") and Voice AI minutes/month (0–500, step 5, default 0, label "500+").
- Breakdown: `AI Messages (N × 60)`, `Voice AI (M min × 600)`, `Total credits / month`.
- Recommendation: total ≤ 60,000 → Starter; ≤ 900,000 → Pro; else Enterprise. Show "X credits/month included" and a "Get <plan>" CTA linking to pricing/signup.
- Above it: green top-up callout, blue "What are AI Credits?" callout, four stat cards (200,000 credits for $20 · 60 per AI message · 600 per voice minute · 3,333 messages for $20).
- Styled in LUMA colors (navy → teal gradient on the recommendation box) instead of the original blue/purple. Client-side JS only; no backend.

## Design reference (in `design/`)
- `home-en-desktop.html` (1440 wide), `home-ar-desktop.html` (RTL Arabic), `home-en-mobile.html` (390 wide).
- These are design-canvas component files, NOT runnable pages: markup with inline styles, `{{holes}}` filled from a `renderVals()` method in a `class Component extends DCLogic` script. Treat them as the visual spec: copy layout, spacing, colors, copy and the Arabic translations, then rebuild as real components.
- Logos are referenced as `../assets/logos/...`.

### Page sections (in order)
Nav → Hero (headline "Turn every WhatsApp conversation into a qualified lead." + WhatsApp chat mockup with floating campaign and handoff cards) → client logo strip (placeholders) → 6 feature cards → How it works (3 steps) → Integrations (Business Central → LUMA → WhatsApp) → Use cases (Sales, Support, Finance, Marketing) → Pricing with working Monthly/Yearly toggle → How credits work + calculator + top-up packs → FAQ → Final CTA → Footer.

### Brand tokens
- Navy background `#081226`; deeper footer `#050C1B`; dark cards `#0E1B36`, borders `#1F3A5F` / `#16254A`.
- Accent cyan (matched to logo) `#12B4E6`; light cyan text on dark `#8FE8F7`; accessible teal for text/links on light `#0A7690`.
- Light section bg `#F4F7FB`; ink `#0F172A`; body text `#475569`; muted on dark `#A9B6CE`.
- Fonts: English — Sora (headings) + DM Sans (body). Arabic — Cairo (headings) + IBM Plex Sans Arabic (body). Remove letter-spacing on Arabic text.
- Logos in `assets/logos/`: white wordmark for dark header/footer, hex icon for chat avatar and small marks, navy wordmark for light backgrounds.

## Arabic / RTL
- Separate routes `/en` and `/ar` with hreflang; `<html lang="ar" dir="rtl">` on Arabic pages; language switch in nav (العربية ↔ English).
- Mirror layout (hero visual side, chat bubble tails, arrows). Keep Western digits and `$` prices.
- Plan names in Arabic currently: الأساسية (Starter), الاحترافية (Pro), المؤسسات (Enterprise) — owner may switch to keeping English names.
- Arabic copy needs native-speaker review before launch.

## Tech decisions (agreed)
- Framework: **Next.js** (or Astro), TypeScript. Static/SSG pages; calculator and pricing toggle client-side.
- Hosting: owner's **Vercel Pro** account (already has one other project; this is a new project). GitHub repo → preview deploys → main goes live.
- Vercel Functions region: **Dubai `dxb1` as primary with a failover region** (e.g. `bom1` or `fra1`) — dxb1 had a ~2-week outage in March 2026. Use the **Node.js runtime**, not Edge, for the form function.
- No database on Vercel. Odoo CRM is the single source of truth for leads.
- Secrets (Odoo URL, DB, API key, Turnstile secret) in Vercel environment variables only.
- Analytics: Vercel Web Analytics or GA4, plus Meta Pixel (paid social boosting planned). Cookie consent needed.

## "Book a demo" flow
1. Click opens form (EN or AR). Fields: name, work email, WhatsApp number (country code default +971 / +966 by locale), company, country; optional "What would you like to use LUMA for?".
2. Hidden fields: calculator estimate + recommended plan, page language, UTM source/medium/campaign.
3. Two consent checkboxes linked to privacy policy: data processing to arrange a demo; agreement to be contacted on WhatsApp (required by Meta for business-initiated messages).
4. Next.js API route (Node runtime, dxb1): server-side validation, Cloudflare Turnstile verification, then create `crm.lead` in Odoo via its external API — source "Website – LUMA", tags for language and plan interest, assigned to sales team.
5. If Odoo is unreachable: email the full submission to sales@ so no lead is lost; still show thank-you.
6. Never log personal data (log only "lead created, id N").
7. After success: Odoo activity for the assigned rep (+ optional email/Slack), and a WhatsApp confirmation sent by LUMA with an approved template.
8. Scheduling: either sales calls back, or thank-you screen embeds Odoo Appointments (if available in owner's Odoo edition).

## Other buttons
- "Sign in" / "Choose plan" → LUMA app login/signup URLs (TBD). If no online payment yet, route "Choose plan" to the demo form.
- "Chat with us on WhatsApp" → `https://wa.me/<number>` (number TBD).
- Embed the owner's own LUMA web agent as the site chat widget.

## Open items / placeholders
- Domain not final (luma.ai, lumatech.ai taken; budget ~$20/yr; candidates like getluma.com, tryluma.com, askluma.com — verify availability).
- Client logos (need permission), real product screenshots, email, phone/WhatsApp number, office address, LUMA app URLs.
- Privacy policy and terms (UAE and KSA personal data protection laws apply).
- Confirm plan-name language in Arabic; Arabic copy review.
- Not yet designed: demo form, thank-you screen, WhatsApp confirmation template (EN + AR), Arabic mobile layout.

## Suggested first steps in Claude Code
1. Scaffold Next.js + TypeScript + i18n routing (`/en`, `/ar`), fonts, brand tokens.
2. Build the homepage from `design/home-en-desktop.html`, responsive to `design/home-en-mobile.html`.
3. Port the Arabic page from `design/home-ar-desktop.html`.
4. Build the calculator and pricing toggle as client components.
5. Build the demo form + API route to Odoo with Turnstile and fallback email.
6. Configure `vercel.json` regions and deploy a preview.
