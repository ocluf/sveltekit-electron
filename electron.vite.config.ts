import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// @ts-expect-error - SvelteKit types are not fully compatible with Vite config
import { sveltekit } from '@sveltejs/kit/vite';
// @ts-expect-error - TailwindCSS types are not fully compatible with Vite config
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const config = defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			outDir: 'out/electron/main',
			lib: {
				formats: ['es'],
				entry: './electron/main/main.ts'
			}
		}
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			outDir: 'out/electron/preload',
			lib: {
				formats: ['cjs'],
				entry: './electron/preload/preload.ts'
			}
		}
	},
	renderer: {
		plugins: [sveltekit(), tailwindcss()],
		resolve: {
			alias: {
				'@renderer': resolve('src')
			}
		},
		build: {
			target: ['chrome126']
		}
	}
});
export default config;
