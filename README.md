# LUMA marketing website

Public marketing site for LUMA (AI agents & WhatsApp solutions) by Innovative Tech — https://luma.itechintl.com
Project context, pricing rules and decisions live in [`CLAUDE.md`](CLAUDE.md); the visual spec is in [`design/`](design).

## Stack
- Next.js (App Router) + TypeScript, statically generated pages
- Routes: `/en`, `/ar` (RTL), `/{lang}/demo`, `/{lang}/privacy`, `/{lang}/terms`; `/` redirects to `/en`
- Client components only where needed: pricing Monthly/Yearly toggle, AI credit calculator, demo form, mobile menu
- `POST /api/lead` (Node runtime): validation → Cloudflare Turnstile → email to the sales inbox (Resend)
- No `vercel.json`: functions run in the project's default Vercel region (Project → Settings → Functions).

## Develop
```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
npm test                     # pricing / calculator / form validation unit tests
npm run typecheck
npm run build
```

## Where things are
| What | File |
|---|---|
| Plan prices, credit rates, top-up packs, calculator ranges | `lib/pricing.ts` |
| English / Arabic copy | `lib/i18n/en.ts`, `lib/i18n/ar.ts` |
| Brand tokens, layout, responsive + RTL rules | `app/globals.css` |
| Homepage sections | `components/` |
| Demo form + API | `components/DemoForm.tsx`, `app/api/lead/route.ts`, `lib/lead.ts`, `lib/email.ts` |
| Sign-in / sign-up / WhatsApp links | `lib/site.ts` (driven by `NEXT_PUBLIC_*` env vars) |

## Environment variables
See `.env.example`. Secrets (Turnstile secret, Resend API key) go in Vercel → Project → Settings → Environment Variables only.
In production (`VERCEL_ENV=production`) the form refuses submissions until `TURNSTILE_SECRET_KEY` is set.

Until the links are known, the site falls back safely: "Sign in" and "Choose plan" open the demo form, and the
"Chat with us on WhatsApp" button is hidden until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.

## Still open (from CLAUDE.md)
- Client logos, product screenshots, contact details, LUMA app URLs, WhatsApp number
- Privacy policy and terms text (placeholder pages exist)
- Native-speaker review of Arabic copy — the demo form and legal strings were translated without a design
- Cookie consent + analytics (Vercel Analytics / GA4, Meta Pixel), site chat widget (LUMA web agent)
- Post-lead automation: WhatsApp confirmation template sent by LUMA, scheduling on the thank-you screen
