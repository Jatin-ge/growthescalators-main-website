# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # local dev server, Next.js hot-reload, http://localhost:3000
npm run build   # production build — required to catch SSR / type errors that dev hides
npm run start   # serve the production build locally (requires prior `npm run build`)
npm run lint    # next lint (ESLint with eslint-config-next)
```

There is **no test infrastructure** (no Jest, Vitest, Playwright). `npm run build` + a manual route walk is the verification step. After substantive changes always:

1. Kill any running `next dev` and `rm -rf .next` before `npm run build` — running build while dev is up corrupts the chunk cache and produces a misleading `Cannot find module './XYZ.js'` runtime error on the next dev start.
2. Probe routes with `curl -so /dev/null -w "%{http_code}\n" http://localhost:3000/<path>` — silent 200 means SSR succeeded. The build also prerenders every static route, so a missing/erroring route in `npm run build` output is a real regression.

Deploys are automatic from `main` via Vercel — there is no `vercel.json` or other deploy config in this repo.

## Architecture

### Stack
Next.js 14 App Router · React 18 · TypeScript (`strict: true`, `target: es5`, `allowJs: true`) · Tailwind v3 · Plus Jakarta Sans (single Google font, exposed as `--font-jakarta`) · Framer Motion (current animation lib) · GSAP / Lenis / Three.js (legacy — see "Two-era codebase" below).

Path alias: `@/*` resolves to repo root (e.g. `@/components/landing/...`).

### Two-era codebase — non-obvious and important

This repo is the result of merging a standalone Vite portfolio app into a Next.js main site (PR #1) and then iteratively migrating the main site to the portfolio's visual idiom (PR #2 onwards). At any given time, **components fall into one of three lineages** with different conventions:

| Folder | Era | Lang | Styling | Animation | Notes |
|---|---|---|---|---|---|
| `components/portfolio/*.jsx` | Original Vite portfolio | JSX (no TS) | CSS Modules + scoped portfolio.css | Framer Motion | Used **only** by `/portfolio`. Do not import elsewhere. Each file has `'use client'` because they all touch `window`/`document` or framer. |
| `components/sections/*.tsx` | Pre-migration main site | TSX | Tailwind utilities + global tokens | GSAP + Lenis (`useGSAP`, `useLenis`) | Used by `/`, `/about`, `/services`, `/work`, `/contact`. **Visually mismatched** with `/portfolio` and the industry pages — these are scheduled for section-by-section rebuild. New work should follow the `landing/` pattern, not extend these. |
| `components/landing/*.tsx` | Current (industry pages) | TSX | CSS Modules + global utilities from `globals.css` | Framer Motion | The reusable engine for `/doctors`, `/roofing`, `/restaurants`. New work should live here. |
| `components/ui/*.tsx` | Shared utilities | TSX | Mixed | Mixed | `CursorWrapper`, `MagneticButton`, etc. — some are GSAP-era and only consumed by `components/sections/`. Verify usage before changing. |
| `components/data/*.js` | Portfolio data files | JS | — | — | Imported by `components/portfolio/` files via relative `'../data/...'` paths. Don't move without updating those imports. |

### Two CSS scopes — also non-obvious

- **Global scope** — `app/globals.css`. Defines `:root` CSS variables (`--orange`, `--violet`, `--teal`, `--text-primary`, `--bg-primary`, `--font-jakarta`, etc.), Tailwind directives, and global utilities promoted from the portfolio: `.glass`, `.glass-pill`, `.btn-primary`, `.btn-outline`, `.section-tag`, `.gradient-text`, `.container-x`, plus the `@keyframes orb-drift-1/2/3` animations. All routes EXCEPT `/portfolio` use this.
- **Portfolio-scoped** — `app/portfolio/portfolio.css`. Everything (CSS variables, body resets, class selectors) is scoped under `.portfolio-root`. The wrapper div is applied by `app/portfolio/layout.tsx`. This isolation exists because the portfolio's variables (`--orange: #FF6B35`, `--font: 'Plus Jakarta Sans'`) are different from main-site equivalents and the body resets are aggressive.

When adding utilities used outside `/portfolio`, put them in `app/globals.css`. When adding to `/portfolio`-only, put them in `app/portfolio/portfolio.css` and rely on the `.portfolio-root` wrapper.

### Routing layout

- `/` , `/about`, `/services`, `/work`, `/contact`, `/privacy-policy`, `/terms-and-conditions` — main marketing site (the GSAP-era pages).
- `/portfolio` — the merged Vite portfolio, isolated under `app/portfolio/` with its own layout.tsx and portfolio.css.
- `/doctors`, `/roofing`, `/restaurants` — industry landing pages, all rendered by `components/landing/IndustryLandingPage.tsx` with content from `app/<industry>/_data/content.ts`.

### Adding a new industry landing page

This is a 3-file operation. The visual layer, animations, mobile responsiveness, and conversion flow are all owned by `IndustryLandingPage`.

1. `app/<industry>/_data/content.ts` — exports a typed `LandingContent` object (interface lives in `components/landing/IndustryLandingPage.tsx`). Look at existing `app/doctors/_data/content.ts` for the shape: hero, painPoints, optional aiAdvantage section, services, resultHighlight, process, whyUs, faqs, finalCta, videoTestimonials, leadForm.
2. `app/<industry>/page.tsx` — 5 lines: import `IndustryLandingPage` and the content, render `<IndustryLandingPage content={CONTENT} />`.
3. `app/<industry>/layout.tsx` — exports the `metadata` object (page is a client component so metadata can't live in `page.tsx`).

### Common SSR / hydration traps in this codebase

The site is fully statically prerendered (every route shows as `(Static)` in `npm run build`). Three patterns have already caused runtime errors and require care:

1. **`'use client'` is not a free pass.** Client components still SSR for the initial HTML. Code that runs at *render time* (not in `useEffect`/handlers) and touches `document` / `window` will crash the prerender. Concrete example: `createPortal(<…/>, document.body)` in a modal component runs on every render. Guard with a `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []); if (!mounted) return null;` block before the `createPortal` call. See `components/portfolio/CaseStudies.jsx` and `components/landing/VideoTestimonialsShorts.tsx` for the canonical pattern.
2. **HTML elements inside `<svg>` cause hydration mismatches.** Browsers strip `<span>`/`<div>` from inside SVG during initial parse but React inserts them during hydration → `Expected server HTML to contain a matching <span> in <svg>`. Use SVG `<g>` for grouping. (Fixed historically in `components/sections/Services.tsx` `IconWeb`.)
3. **Year-rolling `new Date().getFullYear()` in static-rendered output** drifts on Jan 1 vs. cached HTML. Either hardcode the year or wrap the `<span>{year}</span>` in `useEffect`-set state. The site footer (`components/sections/Footer.tsx`) hardcodes `© 2026` for this reason.

### Reusable hooks / utilities worth knowing about

- `lib/youtube.ts` — `getYouTubeId(url)` accepts `/shorts/`, `/watch?v=`, `/embed/`, and `youtu.be/` URLs. `youTubeThumbnail(id)` builds the no-API-key i.ytimg.com URL. `youTubeEmbedUrl(id)` builds the privacy-safe `youtube-nocookie.com` embed URL. Used by `VideoTestimonialsShorts`.
- `lib/types.ts` — defines `CaseStudy`, `Testimonial`, `Service`, `Stat`, `ProcessStep`, `NavLink`, `WorkItem`. The main-site `lib/constants.ts` and the portfolio's `components/data/` files both export shapes you should keep typed.
- `lib/gsap.ts`, `hooks/useGSAP.ts`, `hooks/useLenis.ts` — legacy. Don't use them in new components.
- `components/sections/Footer.tsx` — universal footer. Used by main-site pages (imported per page) AND by every industry landing page (imported by `IndustryLandingPage`). Styles in `Footer.module.css` rely only on global CSS variables, so it works inside or outside `.portfolio-root`.

### Lead form behavior

`components/landing/LeadForm.tsx` POSTs to `/api/lead` (`app/api/lead/route.ts`). The handler tries up to two delivery channels and falls back to a server log:

1. **Resend email** — set `RESEND_API_KEY`. Sends to `LEAD_NOTIFY_EMAIL` (default `Info@growthescalators.com`). Until a domain is verified in Resend, the from address falls back to `onboarding@resend.dev` — set `LEAD_FROM_EMAIL` once a verified sending domain exists (e.g. `Growth Escalators <hello@mail.growthescalators.com>`).
2. **Generic webhook** — set `LEAD_WEBHOOK_URL` to any HTTPS endpoint that accepts a JSON POST. Use this to plumb leads into Slack, Zapier, n8n, ClickUp, or your CRM. Both channels run in parallel — having both configured is fine and gives you redundancy.
3. **Server-log fallback** — if neither env var is set, the lead is still validated and logged via `console.log('[lead]', …)` in stdout. The form still returns success to the user, so previews work without configuration.

The form-submission lifecycle (`'idle' | 'submitting' | 'success' | 'error'`) is owned by `LeadForm.tsx` itself. On success the form is replaced with a thank-you panel. On error a fallback `mailto:` link is shown so users are never blocked.

Rate limit: 5 requests per minute per IP, in-memory (not persisted across cold starts). Trivial spam protection — don't depend on it for serious abuse mitigation.

### Environment variables

All optional. Set in Vercel → Project → Settings → Environment Variables for production.

| Var | Used by | Purpose |
|---|---|---|
| `RESEND_API_KEY`     | `app/api/lead/route.ts` | Enables email delivery via Resend |
| `LEAD_NOTIFY_EMAIL`  | `app/api/lead/route.ts` | Recipient (default `Info@growthescalators.com`) |
| `LEAD_FROM_EMAIL`    | `app/api/lead/route.ts` | Sender (default `Growth Escalators <onboarding@resend.dev>`) |
| `LEAD_WEBHOOK_URL`   | `app/api/lead/route.ts` | POST leads as JSON to any HTTPS URL |

### Git / branching conventions observed

- Main branch: `main`. PRs merged via GitHub web UI; no enforced review rules.
- Feature branches: `feat/<short-name>` (e.g. `feat/style-foundation`, `feat/doctors-landing`, `feat/industry-landing-pages`).
- Commits use co-author trailers when generated via Claude Code (`Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`).
- `.gitignore` is minimal (`node_modules/`, `.next/`). `.DS_Store` files have ended up tracked in some directories — don't blanket-stage with `git add -A`; stage specific paths.

### Active migration plan

See `/Users/jatinagrawal/.claude/plans/there-are-two-different-jolly-shannon.md` for the full historical migration plan. The locked-in decisions are:

1. **Section-by-section rebuild** of the legacy `components/sections/*` pages to match the portfolio's visual idiom.
2. **Light mode only** — dark mode dropped, no `[data-theme]` attribute.
3. **Plus Jakarta Sans everywhere** — Cabinet Grotesk, Syne, Bebas Neue all removed.
4. **GSAP / Lenis / Three.js stay in `package.json`** until the final cleanup PR — removing them prematurely will break the legacy section components that still use them. Each per-section rebuild PR removes that section's GSAP usage but leaves the deps in place.
