<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	/**
	 * logs from the preload context. To see the logs, open DevTools Console (F12)
	 * to learn more about preload context, see https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
	 */
	function logFromPreload() {
		if (window.electron) {
			window.electron.preload();
		} else {
			// you could implement alternative logic here if you deployed your app as website. For example call a rest api
		}
	}

	/**
	 * logs from the main process. To see the logs, open Main Process logs in DevTools Console (F12)
	 * to learn more about main process, see https://www.electronjs.org/docs/latest/api/context-bridge
	 */
	function logFromMain() {
		if (window.electron) {
			window.electron.main();
		} else {
			// you could implement alternative logic here if you deployed your app as website. For example call a rest api
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	<h1 class="text-4xl font-bold">Welcome to SvelteKit + Electron</h1>
	<a href="/settings" class="text-blue-500 underline mb-10">Go to settings</a>
	<div class="flex flex-row gap-12 mt-4">
		<Card.Root class="w-80">
			<Card.Header>
				<Card.Title>Preload Context</Card.Title>
				<Card.Description>Test the preload context functionality</Card.Description>
			</Card.Header>
			<Card.Content>
				<button
					class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition-transform cursor-pointer"
					onclick={logFromPreload}
				>
					Preload Context Log
				</button>
			</Card.Content>
			<Card.Footer>
				<span class="text-sm text-center opacity-75">
					Check electron/preload/preload.ts and DevTools Console <strong>(F12)</strong>
				</span>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-80">
			<Card.Header>
				<Card.Title>Main Process</Card.Title>
				<Card.Description>Test the main process functionality</Card.Description>
			</Card.Header>
			<Card.Content>
				<button
					class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:scale-95 transition-transform cursor-pointer"
					onclick={logFromMain}
				>
					Main Process Log
				</button>
			</Card.Content>
			<Card.Footer>
				<span class="text-sm text-center opacity-75">
					Check electron/main/main.ts and Main Process logs
				</span>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
