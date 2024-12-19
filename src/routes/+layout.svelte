<script lang="ts">
	// Import styles
	import '../app.css';

	// Import pluggable-electron utilities
	import { extensionPoints, plugins } from 'pluggable-electron/renderer';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ExtensionManager, PluginFile } from './+layout';

	// Create a store for extension manager using $state rune
	const extensionManager: Writable<ExtensionManager> = writable(extensionPoints);

	// Provide extension manager to all child components
	setContext('extensionManager', extensionManager);

	// Handle plugin installation through file input with proper type checking
	function handlePluginInstall(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target?.files;

		if (!files || files.length === 0) {
			console.log('Line 24 - +layout.svelte: No files selected');
			return;
		}

		const file = files[0] as PluginFile;
		if (!file.path) {
			console.error('Line 30 - +layout.svelte: Invalid plugin file');
			return;
		}

		console.log('Line 34 - +layout.svelte: Installing plugin from:', file.path);
		plugins.install([file.path]);
	}

	// Setup Pluggable Electron in the renderer process
	async function setupPluggableElectron(): Promise<void> {
		try {
			console.log('Line 42 - +layout.svelte: Setting up Pluggable Electron');
			console.log('Line 43 - +layout.svelte extensionPoints: ', extensionPoints);
			console.log('Line 44 - +layout.svelte plugins: ', plugins);

			// Enable activation point management with dynamic imports
			const setupResult = await window.pluginSetup.setup({
				importer: (entryPoint) => {
					console.log('Line 49 - +layout.svelte: Loading plugin entry point:', entryPoint);
					// Return a simple object that matches the plugin interface
					return {
						init: (manager) => {
							console.log('Line 53 - +layout.svelte: Plugin initialized with extension manager');
							// Use the manager to register extensions
							manager.register('test', 'test', () => {
								console.log('Line 56 - +layout.svelte: Test extension executed');
							});
							return Promise.resolve();
						}
					};
				}
			});
			console.log('Line 55 - +layout.svelte setupResult: ', setupResult);

			// Register all active plugins with their activation points
			const activePlugins = await plugins.registerActive();
			console.log('Line 59 - +layout.svelte activePlugins: ', activePlugins);
			console.log('Line 60 - +layout.svelte: Plugins registered successfully');
		} catch (error) {
			console.error('Line 62 - +layout.svelte: Error setting up Pluggable Electron:', error);
		}
	}

	// Initialize on component mount with proper cleanup
	onMount(() => {
		void setupPluggableElectron();

		// Setup file input listener for plugin installation
		const fileInput = document.getElementById('install-file-input');
		console.log('Line 72 - +layout.svelte fileInput: ', fileInput);
		if (fileInput) {
			fileInput.addEventListener('change', handlePluginInstall);

			// Return cleanup function
			return () => {
				fileInput.removeEventListener('change', handlePluginInstall);
			};
		}

		// Return empty cleanup function if no fileInput
		return () => {};
	});
</script>

<div id="install-file-input"></div>
<slot />

<style>
	#install-file-input {
		height: 40px;
		background-color: yellow;
		color: black;
	}
</style>
