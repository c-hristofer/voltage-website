# Team Voltage Website (Static Next.js + GitHub Pages)

This project builds to a fully static website and deploys to GitHub Pages.

## How hosting works

- The site is built with Next.js static export (`output: 'export'` in `next.config.ts`).
- GitHub Actions builds the site and publishes the `out/` folder to GitHub Pages.
- Deploy workflow file: `.github/workflows/deploy-pages.yml`.

## One-time setup (GitHub)

Do this once in the repository settings:

1. Open **Settings -> Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Make sure your default branch is `main`.

After that, every push to `main` deploys automatically.

## Student update workflow

### 1) Get the project running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### 2) Make content updates

Most edits are in `content/`:

- Team/contact/links data: `content/data/*.json`
- News posts: `content/news/*.mdx`
- Robot pages: `content/robots/*.mdx`
- Outreach entries: `content/outreach/*.mdx`
- Resource entries: `content/resources/*.mdx`
- History content: `content/about/history/**/*`

### 3) If you need to edit page layout/code

- Route matching entrypoint: `src/app/[...slug]/page.tsx`
- Individual route modules: `src/routes/*.tsx`
- Shared UI components: `src/components/` and `src/components/ui/`
- Global styles/theme: `src/app/globals.css`

### 4) Check quality before pushing

```bash
npm run list
npm run test
npm run build
```

`npm run build` should succeed and generate static files in `out/`.

### 5) Ship the update

```bash
git add .
git commit -m "Update: <what changed>"
git push
```

Preferred flow: open a Pull Request, get review, then merge to `main`.

## Deploy status

After merge/push to `main`:

1. Open **Actions** tab and confirm the deploy workflow passed.
2. Open **Settings -> Pages** to see the published site URL.

## Important static-site rules

Because this is GitHub Pages:

- Do not add server-only features (custom API routes, server DB calls, dynamic runtime endpoints).
- Keep pages build-time/static-friendly.
- Use local/static assets or public links for content/media.

## Troubleshooting

### Deploy succeeded but page paths are broken

- Confirm repo name/path did not change.
- The workflow sets `NEXT_PUBLIC_BASE_PATH` from Pages automatically.

### `npm run dev` says port is already in use

- Stop old dev server (`Ctrl+C`) and rerun.

### Build fails

- Run `npm install` again.
- Re-run `npm run list` and `npm run test` to find the specific issue.
