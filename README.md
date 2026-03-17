# Korgonxx Portfolio — Next.js

A production-ready Next.js portfolio with static export support.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for deployment

```bash
npm run build
```

The `out/` folder contains a fully static site — upload it to **Vercel**, **Netlify**, **GitHub Pages**, or any static host.

## Deploy to Vercel (easiest)

```bash

```

## Project Structure

```
korgonxx-portfolio/
├── public/
│   ├── avatar.png          ← your profile picture
│   ├── favicon.png         ← browser tab icon
│   └── cursors/
│       ├── default.png
│       ├── pointer.png
│       ├── grab.png
│       ├── grabbing.png
│       └── text.png
├── src/
│   ├── app/
│   │   ├── layout.js       ← root layout + metadata
│   │   └── page.js         ← main page
│   ├── components/
│   │   ├── ClientShell.js  ← cursor, scroll, observers, clock
│   │   ├── Topbar.js
│   │   ├── Sidebar.js
│   │   └── sections.js     ← Hero, Roles, Portfolio, About,
│   │                          Services, Experience, Tools, Contact, Footer
│   └── styles/
│       └── globals.css     ← all styles (tokens, components, responsive)
├── next.config.js
└── package.json
```

## Tech Stack

- **Next.js 14** App Router
- **Plain CSS** (no Tailwind — clean, fast, zero runtime overhead)
- **Syne** display font + **JetBrains Mono** for labels
- Static export (`output: 'export'`) — works on any host
