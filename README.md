# Airport Charts For Pilots

A Next.js web app for searching airports worldwide and browsing their charts, runway
and frequency data, live weather and local sun times. Built for pilots, student pilots,
flight simulator users and aviation enthusiasts.

> **Not for real-world navigation.** The chart PDFs bundled with this app are
> placeholders, not official aeronautical charts.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. **No environment variables or database are required** —
airport data ships with the app.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run brand:generate` | Regenerate favicons/PNGs from the source SVG logo |
| `npm run charts:generate-placeholders` | Regenerate the placeholder chart PDFs |

The last two are one-off asset generators; their output is committed under `public/`, so
you only need them when changing the logo or the placeholder chart design.

## Routes

| Route | |
| --- | --- |
| `/` | Hero, search, popular airports |
| `/airports` | Full airport list + search |
| `/airports/[icao]` | Airport detail — map, runways, frequencies, METAR/TAF, fun fact |
| `/airports/[icao]/charts` | Chart categories |
| `/airports/[icao]/charts/[category]` | Charts in a category |
| `/airports/[icao]/charts/[category]/[chartId]` | PDF viewer |
| `/charts` · `/about` · `/contact` | Info pages |
| `/favourites` | Saved airports (browser `localStorage`, no account needed) |
| `/api/airports?q=` | Airport search |
| `/api/weather/[icao]` | METAR, TAF and sun times |

## Data

- **Airports** — 50 curated airports in [`data/airports.json`](data/airports.json), loaded
  into memory at startup by [`lib/airports/data.ts`](lib/airports/data.ts). Read-only, with
  no per-user state, so it ships as a static asset rather than sitting in a database.
- **Charts** — placeholder PDFs in `public/charts/placeholder/`, one per category, shared
  across airports. Chart ids are derived (`<icao>-<category>`) so chart URLs stay stable
  across deploys.
- **Weather** — fetched live from [aviationweather.gov](https://aviationweather.gov)'s free
  API, cached for 10 minutes. Sun times are computed locally with `suncalc`.
- **Favourites and recent searches** — `localStorage` only. There are no accounts.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Leaflet. Deployed on Vercel.
