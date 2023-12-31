import { join } from 'path';
import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			minHeight: {
				dh: '100dvh'
			},
			minWidth: {
				dw: '100dvw'
			},
			maxWidth: {
				'8xl': '1440px'
			},
			screens: {
				dw: '100dvw',
				dh: '100dvh'
			}
		}
	},
	plugins: [
		typography,
		skeleton({
			themes: {
				preset: ['skeleton', 'wintry', 'vintage']
			}
		})
	]
} satisfies Config;

export default config;
