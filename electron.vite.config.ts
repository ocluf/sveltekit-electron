import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const config = defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			outDir: 'out/electron/main',
			lib: {
				formats: ['es'],
				entry: './electron/main/index.ts'
			}
		}
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			outDir: 'out/electron/preload',
			lib: {
				formats: ['cjs'],
				entry: './electron/preload/index.ts'
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
