# 🌿 GreenMile — Eco Commute Tracker

A gamified sustainable commuting app for forward-thinking companies. Employees earn XP and unlock perks by choosing eco-friendly routes and vehicles.

## SDGs Addressed
- **SDG 3** — Good Health & Wellbeing (active commutes)
- **SDG 11** — Sustainable Cities (less congestion & pollution)
- **SDG 13** — Climate Action (CO₂ reduction)
- **SDG 17** — Partnerships for Goals (collective culture)

## Tech Stack
- **Next.js 14** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Custom green design system
- **Recharts** — Interactive data visualizations
- **Lucide React** — Icons

## Project Structure

```
greenmile/
├── app/
│   ├── layout.tsx           # Root layout with Sidebar + TopBar
│   ├── globals.css          # Global styles & animations
│   ├── page.tsx             # Redirects → /dashboard
│   ├── dashboard/page.tsx   # Employee overview
│   ├── leaderboard/page.tsx # Company rankings
│   ├── trips/page.tsx       # Trip history & filters
│   ├── perks/page.tsx       # Rewards catalog
│   └── admin/page.tsx       # Admin analytics
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── TopBar.tsx       # Header with search + log button
│   ├── ui/
│   │   ├── LogTripButton.tsx  # Trip logging modal
│   │   ├── StatCard.tsx       # Reusable metric card
│   │   ├── XPProgressCard.tsx # Hero XP bar
│   │   ├── TripItem.tsx       # Single trip row
│   │   └── SDGImpact.tsx      # SDG progress section
│   └── charts/
│       └── WeeklyChart.tsx  # Recharts bar chart
├── lib/
│   ├── data.ts              # All types, constants & mock data
│   └── utils.ts             # Helper functions
└── tailwind.config.ts       # Custom color palette
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Features

### Employee Dashboard
- XP level progress bar with animated fill
- Stats: CO₂ saved, trips, distance, rank
- "Next perk" callout with progress indicator
- Weekly activity bar chart
- SDG impact tracker (goals 3, 11, 13, 17)
- Recent trip log

### Leaderboard
- Podium for top 3 with visual hierarchy
- Weekly / Monthly / All-time filters
- Trend indicators (↑↓ rank changes)
- Team impact summary

### Trip Logger (modal)
- 7 transport modes: walk, bike, e-bike, scooter, metro, bus, carpool
- Distance input with live XP preview
- CO₂ saving calculation
- Success state with earned XP display

### Perks Catalog
- 8 perks across 4 categories (time off, wellness, financial, remote)
- Unlocked / locked / claimed states
- One-click claim flow
- Category filtering

### Admin Analytics
- KPI cards: active users, CO₂, trips, participation rate
- Monthly trend line chart
- Department breakdown bar chart (switchable metrics)
- Top performers table

## Gamification Logic

| Vehicle   | XP/km | CO₂ avoided |
|-----------|-------|-------------|
| Walking   | 30    | 100%        |
| Cycling   | 25    | 100%        |
| E-Bike    | 20    | ~99%        |
| Scooter   | 18    | ~76%        |
| Metro     | 15    | ~81%        |
| Bus       | 12    | ~71%        |
| Carpool   | 8     | ~62%        |

### Perk Unlock Levels
| Perk               | Level | Value        |
|--------------------|-------|--------------|
| Gift Card 10      | 5     | 10          |
| Extra Holiday      | 8     | +1 day       |
| Gym Membership     | 10    | 3 months     |
| Remote Days +2     | 12    | +2/month     |
| Gift Card €50      | 14    | €50          |
| 2 Extra Holidays   | 17    | +2 days      |
| Wellness Credit    | 20    | €100         |
| Full Remote Week   | 25    | 1 week/qtr   |
