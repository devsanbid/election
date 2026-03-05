# Nepal Election 2082 - Live Dashboard

**Live:** [https://votenepal.sanbid.dev/](https://votenepal.sanbid.dev/)

Real-time Nepal Election 2082 live results dashboard built with Next.js. Features bilingual support (English/Nepali), glassmorphism UI, party standings, constituency-level results with winning/leading tags, and a VS comparison page.

## Features

- Live election results with auto-refresh (15s polling)
- Bilingual support (English / नेपाली)
- Glassmorphism dark theme with animated gradient background
- Party-wise standings with vote counts and seat tracking
- Constituency-level results with WINNER / LEADING / CLOSE FIGHT tags
- VS comparison page (Balen Shah vs KP Sharma Oli)
- Province-based filtering
- Fully responsive design
- Optimized for CDN caching (Netlify)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, CSS Modules, Glassmorphism
- **Data Fetching:** SWR with stale-while-revalidate caching
- **Data Source:** Nepal Election Commission API
- **Deployment:** Netlify

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.
