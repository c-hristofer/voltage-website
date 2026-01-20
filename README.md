# Team Voltage 386 – Next.js Experience

High-voltage marketing site for FRC Team 386. Built with the Next.js App Router, fully typed content pipelines, and a glassmorphic design system inspired by the team’s Haas-sponsored REBUILT season.

## ✨ Highlights
- **MDX + JSON content platform** – news, robots, outreach, resources, awards, and sponsor tiers all live in `/content`, so non-developers can edit without touching React.
- **Section-driven UX** – hero callouts, Instagram embeds, sponsor wall, mission statement, and FIRST primer were designed to mirror the updated brand book.
- **Dark-mode polished** – every CTA, card, and resource surface was tuned for legibility in light/dark themes.
- **Data-safe loaders** – `src/lib/content.ts` uses Zod to validate every MDX/JSON document before rendering.

## 🧱 Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS with custom font stack + CSS variables
- MDX (contentlayer-style filesystem routing)
- Zod for schema validation
- Vitest for content utility coverage

## 🚀 Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Quality Scripts
| Command | Description |
| --- | --- |
| `npm run lint` | ESLint with Next.js config |
| `npm run test` | Vitest suite for loaders/helpers |
| `npm run build` | Production build (Turbopack) |

## 📁 Content Architecture
All structured data lives in `/content`.

| Area | Files | Notes |
| --- | --- | --- |
| Global data | `/content/data/*.json` | `team.json`, `links.json`, `sponsors.json`, `metrics.json`, `awards.json`, `presskit.json`, `socials.json` |
| News | `/content/news/*.mdx` | Frontmatter: `title`, `date`, `summary`, optional hero + CTA |
| Robots | `/content/robots/<year>.mdx` | Defines each robot’s story, highlights, specs |
| Outreach | `/content/outreach/*.mdx` | Cards for events, FLL mentoring, Sparky’s STEAM Camp |
| Resources | `/content/resources/*.mdx` | Handbooks, scouting kits, CAD/code repos |
| History | `/content/about/history/**/*.mdx` | Year-by-year archive rendered on `/about/history` |

Update JSON/MDX and rerun `npm run dev`—the site hot-reloads with the new copy and media.

## 🔧 Key Directories
- `src/app/page.tsx` – homepage hero, Instagram block, mission/FIRST sections, sponsor wall.
- `src/app/[route]` – About, Robots, Outreach, Resources, Sponsors, Calendar, etc.
- `src/components/` – CTA buttons, cards, sliders, navigation, Instagram embed, sponsor wall.
- `src/lib/content.ts` – shared loaders that parse MDX/JSON and enforce schemas.
- `public/images/` – robots, mentors, outreach media, sponsor logos.

## 🧩 Customization Cheatsheet
- **Meeting info, mission statement, leadership, FAQ** – edit `content/data/team.json`.
- **Forms & documents** – update URLs in `content/data/links.json`; `/resources` and join/pre-season pages update automatically.
- **Sponsor tiers & logos** – edit `content/data/sponsors.json` and drop logos in `public/images/sponsors`.
- **Awards timeline** – `content/data/awards.json` drives `/about/awards`.
- **Instagram embed** – markup/script lives in `src/components/social/InstagramEmbed.tsx`.

## ☁️ Deployment
1. Push to GitHub.
2. Connect repo to Vercel (or preferred host).
3. Ensure Node 20+ runtime.
4. Build command: `npm run build`.
5. No environment variables required out of the box.

## 🤝 Contributing
1. Fork & branch.
2. `npm run lint && npm run test` before opening a PR.
3. Include screenshots/gifs when tweaking UI.

## 📬 Contact
- Email: `teamvoltage386@gmail.com`
- Instagram: [`@teamvoltage386`](https://www.instagram.com/teamvoltage386/)
- Sponsor inquiries: `/sponsors` page or `content/data/presskit.json` links.

Bring the energy. 💥
