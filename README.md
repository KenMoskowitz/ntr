# NTR Link

Rebuild of the National TeleTherapy Resources (NTR Link) marketing site, per
the Step 1 master plan (`ntrlink.com`). Monorepo: `web/` (Astro, static
output) + `studio/` (Sanity Studio v3).

Stack: GitHub → Astro → Sanity.io → Vercel.

## Branch / preview workflow

All work happens on `claude/ntr-link-rebuild-ij2a2t` — **never `main`**.

**Live preview:** https://ntr-eta.vercel.app (Vercel project `ntr`, team
"Ken's Web Projects").

`main` on GitHub currently has no app code — just a README — so importing
the repo into Vercel initially failed to detect a framework. To get a real
preview live now, Vercel's **Production branch** was temporarily pointed at
`claude/ntr-link-rebuild-ij2a2t` instead of `main` (Environments → Production
→ Branch Tracking), with Root Directory `web` and Framework Preset `Astro`
set explicitly. This means **the Vercel "Production" deployment is this
branch, not `main`, until further notice** — don't assume `main` reflects
what's live.

**Follow-up once this branch merges to `main`:** switch Vercel's Production
branch back to `main` in the same settings panel, so deploys track the
default branch normally again. Flagging this here so it doesn't get
forgotten post-merge.

## Status: what's done vs. what's blocked on you

This was built in a headless remote session with no interactive browser, so
Sanity and Vercel accounts/projects could not be created here. Everything
that doesn't require logging into those services is done. What's left needs
five minutes of manual setup — see "Manual setup" below.

### Done
- Full Astro app: all pages from the master plan's sitemap, each wired to
  Sanity with a `cms?.field || 'fallback copy'` pattern (Iron Rule 1 — no
  page ships hardcoded-only).
- Sanity schemas for every content type in the plan, plus `siteSettings`,
  `navigation`, and `page` (shared schema for the nine core singleton
  pages), and `contactSubmission` (see "Contact form" below).
- Seed script (`studio/scripts/seed.ts`) with the plan's actual copy —
  idempotent, safe to re-run.
- `vercel.json` redirect for `/virtual-occupational-therapy-for-schools` →
  `/occupational-therapy` (the plan's only URL change).
- JSON-LD: Organization (home), Service (service + state service pages),
  JobPosting (job cards), FAQPage (service pages), BreadcrumbList (every
  non-home page).
- Sitemap via `@astrojs/sitemap`, pinned to **v3.2.1** — later 3.x releases
  target Astro 5/6's integration hooks and silently crash the build under
  Astro 4 (`_routes` never gets populated → `Cannot read properties of
  undefined (reading 'reduce')`). Don't bump this without also bumping Astro.
- `npx astro build` verified clean, 15 pages generated, sitemap correct.
- Contact form actually wired to a working backend (see below) — the #1
  item on the plan's "Biggest Wins" list.

### Blocked on you (needs a browser + your accounts)
1. Create the Sanity project (`npx sanity login` inside `studio/`, then
   `npx sanity init` — or create it at sanity.io/manage), and:
   - Put the real project ID in `studio/sanity.cli.ts` and as `SANITY_STUDIO_PROJECT_ID`/`SANITY_PROJECT_ID` env vars (Studio + web resp.).
   - Run `npx sanity deploy` from `studio/` — confirms the Studio URL
     (`ntrlink.sanity.studio`, or pick another slug in `sanity.cli.ts` if
     taken) returns 200.
   - Create a robot token (Editor role) at sanity.io/manage → API → Tokens.
     Put it in `studio/.env` as `SANITY_TOKEN` (for seeding) — never commit
     this file, it's gitignored.
   - Run `npm run seed` from `studio/` to load the plan's copy in.
   - Invite editor(s) in sanity.io/manage → Members (defaulted to just you,
     ken@adzombies.com, for now — add others when you have real emails).
2. ~~Link Vercel~~ — done. Project `ntr` under "Ken's Web Projects", Root
   Directory `web`, Framework Preset `Astro`, live at
   https://ntr-eta.vercel.app. Production branch is temporarily
   `claude/ntr-link-rebuild-ij2a2t` (see "Branch / preview workflow" above)
   — switch it back to `main` after this branch merges.
3. Set these env vars in Vercel (Production + Preview):
   - `SANITY_PROJECT_ID`, `SANITY_DATASET` (=`production`) — public, used by
     the Astro build to read content.
   - `SANITY_WRITE_TOKEN` — a **second**, separate robot token (Editor role),
     server-only, used by `web/api/contact.js` and `web/api/subscribe.js` to
     write leads/subscribers. Never reuse the seed token here or expose
     either token client-side.
4. Set up the Sanity → Vercel deploy hook (Sanity project settings → Webhooks
   → point at a Vercel Deploy Hook URL) so publishing in Studio triggers a
   rebuild. Document both URLs here once created.

## Contact form (the plan's #1 priority)

The old WordPress form was refusing all submissions
("...refused to accept Google reCaptcha service"). Fixed here without
reintroducing a CAPTCHA (that refusal was intentional) — `web/src/pages/contact.astro`
posts to `web/api/contact.js`, a plain Vercel serverless function (not an
Astro endpoint, so it works regardless of Astro's `output: 'static'`) that
writes each submission into Sanity as a `contactSubmission` document. Leads
are visible in Studio immediately under "Contact Form Submissions" — no
third-party form service needed. A honeypot field (`website`) blocks basic
bots. If you later want email notifications or a real CRM, that's a
follow-up, not a blocker to launch.

**Before launch:** submit the live form once and confirm the document shows
up in Studio (this is also on the plan's own Google Search Console
checklist).

The footer newsletter bar works the same way — `web/api/subscribe.js` writes
to a `newsletterSubscriber` document in Sanity. Same before-launch check
applies: submit it once, confirm it shows up in Studio.

## Real content gaps — do not fabricate these

Per the plan's own audit, two things were flagged as real problems (fake
"Anonymous NTR Therapist" quotes, zero numbers on results) — the seed script
deliberately leaves `testimonial` and `outcomeStat` empty rather than
inventing named quotes or stats. `/team` and `/results` show an honest
"coming soon" note until real ones are added in Sanity. Don't seed fake ones
to make the pages look fuller.

## Open items from the master plan (get these from the client)

- **Full list of licensed states.** Only CA and TN are seeded (the two
  confirmed in the plan). Add more any time as new `stateJobPage` /
  `stateServicePage` documents in Sanity — no code change needed.
- **Analytics IDs** (GTM container, GA4 measurement, Meta Pixel) — wired via
  `siteSettings.analytics` in Sanity with a no-op fallback until confirmed
  from the WordPress admin.
- **Current job openings** — two placeholder `jobOpening` docs (CA, TN SLP)
  are seeded and clearly marked as drafts. Replace before launch.
- **Real testimonials and outcome stats** — see above.
- **Privacy Policy body copy** — `/privacy-policy` has a placeholder note.
- **Editor emails** for Sanity Studio invites beyond ken@adzombies.com.
- **Founded year discrepancy**: resolved as 2015 (footer said 2015, homepage
  copy said 2016) — confirm this is actually correct with the client.

## Image assets

`web/public/images/README.md` lists the exact filenames to pull from the
current WordPress media library (logo, mascot, team photos, favicon) — the
site builds and deploys fine without them, the `<img>` tags just 404 until
they're added.

## Local development

```
cd studio && npm install && npm run dev     # Sanity Studio at localhost:3333
cd web && npm install && npm run dev        # Astro site at localhost:4321
```

Without a configured `SANITY_PROJECT_ID`, the web app falls back to the
`cms?.field || 'fallback copy'` defaults for every page — this is normal and
expected pre-launch.
