<script>
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
	<h1 class="text-2xl font-bold">Welcome to SvelteKit + Electron</h1>
	<a href="/settings" class="text-blue-500 underline">Go to settings</a>
	<div class="flex flex-row gap-4 mt-4">
		<div class="flex flex-col items-center w-80 p-4 border rounded-lg shadow">
			<button
				class="w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition-transform cursor-pointer"
				onclick={logFromPreload}
			>
				Preload Context Log
			</button>
			<span class="text-sm text-center opacity-75 mt-2">
				Check electron/preload/index.ts and DevTools Console <strong>(F12)</strong>
			</span>
		</div>

		<div class="flex flex-col items-center w-80 p-4 border rounded-lg shadow">
			<button
				class="w-64 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:scale-95 transition-transform cursor-pointer"
				onclick={logFromMain}
			>
				Main Process Log
			</button>
			<span class="text-sm text-center opacity-75 mt-2">
				Check electron/main/index.ts and Main Process logs
			</span>
		</div>
	</div>
</div>
