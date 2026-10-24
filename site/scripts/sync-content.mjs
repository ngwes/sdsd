// Builds the Starlight content from the Markdown files at the repository root.
//
// The root files stay the single source of truth (and keep rendering on GitHub).
// This script only adds front matter, rewrites cross-links to site URLs and
// copies the SVG diagrams. Its output is generated and git-ignored.
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = path.resolve(siteDir, '..');
const docsDir = path.join(siteDir, 'src/content/docs');
const svgDir = path.join(siteDir, 'public/images/diagrams');

// Repo-relative source file -> page slug ('' is the home page).
const pages = new Map([
	['README.md', ''],
	['diagrams/diagrams.md', 'diagrams'],
]);
for (const file of readdirSync(repoDir)) {
	if (/^\d\d-.+\.md$/.test(file)) pages.set(file, `chapters/${file.replace(/\.md$/, '')}`);
}

// Links are relative to the current page's URL, so they work under any `base`.
function pageLink(fromSlug, toSlug) {
	const rel = path.posix.relative(fromSlug, toSlug);
	if (rel === '') return './';
	return `${rel.startsWith('.') ? rel : `./${rel}`}/`;
}

function rewriteLinks(source, slug, text) {
	let inFence = false;
	return text
		.split('\n')
		.map((line) => {
			if (/^\s*```/.test(line)) {
				inFence = !inFence;
				return line;
			}
			if (inFence) return line;
			return line.replace(/\]\(([^)\s#]+\.md)(#[^)\s]*)?\)/g, (match, target, hash = '') => {
				if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return match;
				const key = path.posix.join(path.posix.dirname(source), target);
				if (!pages.has(key)) throw new Error(`${source}: link to "${target}" is not a published page`);
				return `](${pageLink(slug, pages.get(key))}${hash})`;
			});
		})
		.join('\n');
}

// The diagrams page only lists the SVG files by name: show them inline too.
// Plain HTML on purpose: Astro would try to process a relative Markdown image
// as a local asset, while these live in `public/`.
function embedSvgs(slug, text) {
	return text.replace(/^### `([\w-]+\.svg)`\n\*\*(.+?)\*\*/gm, (_match, file, label) => {
		const src = path.posix.relative(slug, `images/diagrams/${file}`);
		return `### \`${file}\`\n\n<a href="${src}"><img src="${src}" alt="${label}" /></a>\n\n**${label}**`;
	});
}

rmSync(docsDir, { recursive: true, force: true });
rmSync(svgDir, { recursive: true, force: true });
mkdirSync(svgDir, { recursive: true });

for (const [source, slug] of pages) {
	const lines = readFileSync(path.join(repoDir, source), 'utf8').replace(/\r\n/g, '\n').split('\n');
	const h1 = lines.findIndex((line) => line.startsWith('# '));
	if (h1 === -1) throw new Error(`${source}: no "# " title found`);
	const title = lines[h1].slice(2).trim();
	lines.splice(h1, 1); // Starlight renders the title itself

	let body = rewriteLinks(source, slug, lines.join('\n')).replace(/^\n+/, '');
	if (slug === 'diagrams') body = embedSvgs(slug, body);

	const outFile = path.join(docsDir, slug === '' ? 'index.md' : `${slug}.md`);
	mkdirSync(path.dirname(outFile), { recursive: true });
	writeFileSync(outFile, `---\ntitle: ${JSON.stringify(title)}\n---\n\n${body}`);
}

let svgCount = 0;
for (const file of readdirSync(path.join(repoDir, 'diagrams'))) {
	if (file.endsWith('.svg')) {
		cpSync(path.join(repoDir, 'diagrams', file), path.join(svgDir, file));
		svgCount++;
	}
}

console.log(`sync-content: ${pages.size} pages, ${svgCount} diagrams`);
