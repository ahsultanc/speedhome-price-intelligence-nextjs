# SPEEDHOME Price Intelligence

> **Temukan rumah yang tepat — bukan hanya harga yang tepat.**

A premium web app that turns live SPEEDHOME.com rental data into an at-a-glance
market report for the Malaysian rental market: fair-price analysis, area
intelligence, an investment ROI calculator, and side-by-side area comparison.

Built as a PM / CEO-Office assessment for **Jendela Group Indonesia**.
Design language: *Luxury Property Editorial* — Financial Times × Bloomberg ×
Airbnb Luxe.

---

## Features

### Single Search
- **Hero fair-price metric** — the headline answer to *"is this price fair?"*
- **Area Intelligence** — character, lifestyle, highlights, supply level (17
  researched areas; areas without verified data simply don't show a card)
- **"So what?" insight** — plain-language takeaway with the P25–P75 price band
- **Budget filter** — privately (client-side) splits listings into in-budget /
  slightly over / out of budget
- **Price summary by unit type** — Count, Average, Median, Mode, Fair Price
  (trimmed mean), Min, Max, Avg sqft, Price/sqft (with tooltip)
- **Average vs Median chart** (Recharts) + advanced min–max range
- **Listings table** — Listing Completeness badge, Fair Deal context (data, not
  verdict), Good-deal badge, best-value sort, room-type filter, mobile cards,
  and a *"Lihat di SPEEDHOME →"* CTA
- **ROI calculator** — gross/net yield, payback, break-even, total return,
  benchmark vs bank deposit (100% client-side)
- **Pre-survey & post-deal checklists**, **similar areas**, **shareable URL**
  with saved searches (localStorage), and an anonymous **feedback widget**
- **Excel export** — Summary + Listings sheets with completeness/fair-deal
  columns and branding
- Monthly / Yearly tabs (Daily auto-hidden), friendly empty/error states,
  skeleton loading, Framer-Motion animations

### Compare Areas
- Two-area head-to-head (Listings, Avg, Median, Min, Max, Price/sqft) with the
  cheaper side highlighted green
- Comparison charts (overall · per unit type · range) and an auto **Verdict**
  (cheaper by RM/year, better value/sqft, more supply)

---

## Tech stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Recharts · Radix UI · lucide-react · xlsx.

## Architecture
```
src/
  app/            page.tsx · compare/page.tsx · api/scrape · api/scrape-compare
  components/     layout · home · results · listing · compare · shared
  lib/            types · utils · constants · areaIntel · listingCompleteness
                  · roiCalculator · scrape (Python bridge) · useLocalStorage
  data/           demoResponses.json  (bundled production data)
python/           scraper.py · utils.py · scraper_api.py · demo_data.json
```

### Data backend (important)
- **Local dev** — the `/api/scrape` route spawns the Python scraper
  (`python/scraper_api.py`) for **live** SPEEDHOME data.
- **Production (Vercel)** — Vercel's Node runtime has no Python, so the app runs
  in **demo-only mode**: it serves bundled snapshots (`src/data/demoResponses.json`)
  for Mont Kiara, KLCC, Bangsar, and Petaling Jaya. This is automatic when the
  `VERCEL` env var is present (or set `DEMO_ONLY=1`).

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000 — live scraping (needs Python deps)

# Live scraping (optional) requires the Python deps:
pip install -r python/requirements.txt

# Force demo-only locally (PowerShell):
#   $env:DEMO_ONLY="1"; npm run dev
```

## Honest data notes
- **17 area intel** — only areas with verified general facts; no fabricated data.
- **Listing Completeness** measures how complete the *listing info* is — **not**
  the physical condition of the unit.
- **Availability** — the scraper has no per-listing posting date, so there are
  **no fake "just listed" badges**; only a verify-availability nudge for prices
  far below the area average.
- Production demo snapshots are dated and shown via a clear *"data sampel"* banner.

---

Built by **Ahmad Sultan Chaeruddin** · Juni 2026. Data from SPEEDHOME.com — not
affiliated with SPEEDHOME. For educational use.
