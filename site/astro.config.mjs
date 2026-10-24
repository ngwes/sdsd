// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://ngwes.github.io',
	base: '/sdsd',
	integrations: [
		mermaid({ autoTheme: true }), // must come before starlight
		starlight({
			title: 'SDSD',
			description:
				'Sanity-Driven Software Development: practices, patterns and templates for developers working in high-entropy contexts.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ngwes/sdsd' }],
			sidebar: [
				{ label: 'Start here', slug: 'index' },
				{ label: 'Chapters', items: [{ autogenerate: { directory: 'chapters' } }] },
				{ label: 'Diagrams', slug: 'diagrams' },
			],
		}),
	],
});
