# SDSD documentation site

A [Starlight](https://starlight.astro.build) site, published to GitHub Pages at <https://ngwes.github.io/sdsd/>.

The content is **not** stored here. The Markdown files at the repository root (`README.md`, `01-…12-*.md`,
`diagrams/`) are the single source of truth. `scripts/sync-content.mjs` turns them into the site's content
before every build: it adds the page title as front matter, rewrites links between chapters to site URLs and
embeds the SVG diagrams. The generated files (`src/content/docs/`, `public/images/diagrams/`) are git-ignored.

## Commands

Run from this folder:

| Command           | What it does                                                           |
| :---------------- | :--------------------------------------------------------------------- |
| `npm install`     | Install dependencies                                                   |
| `npm run dev`     | Sync the content, then serve the site at `localhost:4321/sdsd/`        |
| `npm run sync`    | Re-sync the content after editing the root Markdown files during `dev` |
| `npm run build`   | Sync the content and build the site into `./dist/`                     |
| `npm run preview` | Serve the built site locally                                           |

## Deployment

`.github/workflows/deploy-docs.yml` builds and deploys the site on every push to `main` that touches the
Markdown files, the diagrams or this folder. It needs **Settings → Pages → Source: GitHub Actions** to be
enabled once on the repository.
