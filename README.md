# Team Voltage 386 Website

Modern Next.js + TypeScript site for Team Voltage 386 featuring data-driven content, sponsor resources, and MDX-powered storytelling.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (custom Anton + Roboto typography)
- MDX content loaded from the `/content` directory
- Zod validation for JSON/MDX frontmatter
- Vitest for lightweight utility/content tests

## Local Development
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` and edit files – hot reload is enabled.

### Quality Checks
- `npm run lint` – ESLint (Next.js defaults)
- `npm run test` – Vitest suite validating slug helpers and content loaders

## Content Management
Non-developers can update nearly everything inside `/content`.

### News
- Files: `/content/news/*.mdx`
- Frontmatter: `title`, `date`, `summary`, optional `heroImage`, `ctaLabel`, `ctaUrl`
- Add a new `.mdx` file and it will auto-appear on `/news` and the homepage “Latest” section.

### Robots
- Files: `/content/robots/<year>.mdx`
- Frontmatter defines `year`, `name`, `game`, `status`, `highlights`, `specs`
- Each robot gets `/robots/<year>` detail plus inclusion in the gallery.

### Outreach & Resources
- Outreach programs/events: `/content/outreach/*.mdx`
- Resources hub: `/content/resources/*.mdx` (slugs map to `/resources/<slug>` routes)

### Data JSON
- `/content/data/team.json` – mission statement, meeting info, leadership, mentors, FAQ, history, season spotlight
- `/content/data/sponsors.json` – sponsor tiers, logos, payment instructions
- `/content/data/links.json` – forms, calendar embed, sponsor packet, summer camp drive
- `/content/data/awards.json`, `/metrics.json`, `/presskit.json`, `/socials.json`

### Documents & Forms
Update URLs inside `/content/data/links.json`. They render automatically on `/documents` and `/join`.

## Adding Sponsors / Robots / News
| Action | Where |
| --- | --- |
| New sponsor tier | `/content/data/sponsors.json` (keep logos in `public/images/sponsors`) |
| Sponsor logo swap | Replace file under `public/images/sponsors` and update JSON reference |
| New robot page | Add `/content/robots/<year>.mdx` with frontmatter + story |
| New news post | Add `/content/news/<slug>.mdx` |

## Deployment (Vercel)
1. Push to Git (Vercel auto-detects Next.js)
2. Set `NODE_VERSION` to >= 20 in Vercel project settings
3. Configure any necessary environment variables (none are required by default)
4. Deploy from `main` – Vercel builds `npm run build` automatically

## Files to Know
- `src/app/page.tsx` – homepage
- `src/app/[route]/` – feature pages (about, robots, sponsors, etc.)
- `src/components/` – buttons, cards, sponsor wall, timeline, etc.
- `src/lib/content.ts` – JSON/MDX loading with Zod validation

For brand assets, drop files in `public/images/brand` and update `/content/data/presskit.json`.
