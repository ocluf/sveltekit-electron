<h1 class="bg-gray-200">Welcome to SvelteKit</h1>
<a href="/settings">Settings</a>
<div class="flex gap-4 mt-4">
	<button
		class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		onclick={() => window.api.preload()}
	>
		Call Preload Function
	</button>

	<button
		class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
		onclick={() => window.api.main()}
	>
		Call Main Function
	</button>
</div>
