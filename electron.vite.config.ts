import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

const config = defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			outDir: 'out/electron/main',
			lib: {
				formats: ['cjs'],
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
		plugins: [sveltekit()],
		resolve: {
			alias: {
				'@renderer': resolve('src')
			}
		},
		build: {
			target: 'chrome'
		}
	}
});

export default config;
