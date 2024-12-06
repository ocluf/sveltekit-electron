<div class="flex flex-col items-center justify-center min-h-screen">
	<h1 class="text-2xl font-bold">Welcome to SvelteKit + Electron</h1>
	<a href="/settings" class="text-blue-500 underline">Go to settings</a>
	<div class="flex flex-row gap-4 mt-4">
		<div class="flex flex-col items-center w-80 p-4 border rounded-lg shadow">
			<button
				class="w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition-transform cursor-pointer"
				onclick={() => window.api.preload()}
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
				onclick={() => window.api.main()}
			>
				Main Process Log
			</button>
			<span class="text-sm text-center opacity-75 mt-2">
				Check electron/main/index.ts and Main Process logs
			</span>
		</div>
	</div>
</div>
