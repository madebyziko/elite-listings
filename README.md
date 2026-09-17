# Elite Listings — Bilal Naqsh

Marketing website for **Elite Listings**, the brand of Bilal Naqsh, a Greater Vancouver realtor (Vancouver Elite Team · Coldwell Banker Prestige Realty). Three service lines — residential, commercial, development — plus a curated listings showcase, an about page, and a contact page.

Built with **Next.js (App Router) + React + TypeScript**, GSAP/Lenis for motion. No external CMS or MLS/IDX feed: content lives in typed data files, so new listings are added without a deploy pipeline.

## Requirements

- **Node.js 20+** (Next.js 16)
- npm (a `package-lock.json` is committed)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build (type-checks and prerenders every route) |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (hero film, three-line router, featured work, proof, about) |
| `/residential` | Residential line |
| `/commercial` | Commercial line |
| `/development` | Development line (with feasibility calculator) |
| `/listings` | Curated listings browser (filter rail + three lines) |
| `/listings/[slug]` | Individual listing detail (gallery, facts, mortgage, book a viewing) |
| `/about` | About Bilal |
| `/contact` | Contact (line selector, booking form) |

## Project structure

```
src/
  app/            # App Router routes; elite.css holds the design system, globals.css the base reset
  components/
    twin/         # all UI components (prefixed Elite*)  ← the whole site is built from these
    motion/       # LenisProvider (smooth scroll) + gsap loader
  fonts/          # Söhne (sans) + PP Editorial New (serif), loaded via next/font/local
  lib/
    data.ts       # brand facts, service-line copy, proof
    listings.ts   # the listings data (add a listing here)
    utils.ts
public/
  elite/          # hero films (.mp4) + scrubbed frame sequences (res-seq / com-seq / seq)
  images/         # listing photos, portraits, etc.
reports/lighthouse/  # Lighthouse reports (production build, mobile) — open any *.report.html
```

## Content editing

- **Listings:** add or edit entries in `src/lib/listings.ts`, then drop photos in `public/images/listings/<slug>/00.jpg`, `01.jpg`, … Each listing type has a typed shape; follow an existing entry.
- **Brand / line copy, proof:** `src/lib/data.ts`.
- **Testimonials and any figure marked as a placeholder** are intentional stand-ins to be replaced with verified content before launch. Nothing is fabricated.

## Fonts

Söhne and PP Editorial New ship as local files under `src/fonts/`. The committed Söhne files are the trial cut — swap in the licensed files at the same paths for production.

## Notes for deploy

- Every route prerenders as static content, so this deploys cleanly to Vercel or any static/Next host.
- The hero videos are the heaviest assets; they are already compressed for web. Keep them in `public/elite/`.
- Set the production domain's canonical/OG data in `src/app/layout.tsx` metadata as needed.

## Quality

Audited with Lighthouse on a production build (mobile): Accessibility, Best Practices and SEO score 100 across all pages; performance is high-80s to high-90s (the cinematic hero video is the main load cost on the line pages). Reports are in `reports/lighthouse/`.
