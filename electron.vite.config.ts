import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

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
	}
});
export default config;
