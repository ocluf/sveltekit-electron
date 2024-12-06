import adapter from '@sveltejs/adapter-static'; // This was changed from adapter-auto
import { vitePreprocess } from '@sveltejs/kit/vite';
// const adapter = require('@sveltejs/adapter-static')
// const { vitePreprocess } = require('@sveltejs/kit/vite')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({}),

	kit: {
		adapter: adapter({
			pages: 'svelte-build',
			assets: 'svelte-build'
		})

		// files: {
		//   lib: 'src/lib',
		//   params: 'src/params',
		//   routes: 'src/routes',
		//   appTemplate: 'src/app.html',
		//   errorTemplate: 'src/error.html'
		// }
	}
};

export default config;
