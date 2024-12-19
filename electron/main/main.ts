import { app, dialog, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import serve from 'electron-serve';
import icon from '../../resources/icon.png?asset';
import { PluginManager } from './plugin-manager';

// Import our local copy of pluggable-electron
// const { usePlugins } = require('../../plugins/pluggable-electron/pluginMgr/index.js');

const loadURL = serve({
	directory: 'out/svelte',
	scheme: 'app'
});

async function createWindow(): Promise<void> {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		x: 2048,
		y: 0,
		width: 1800,
		height: 1024,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/preload.cjs'),
			sandbox: true,
			contextIsolation: true
		}
	});

	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		await loadURL(mainWindow);
	}

	// Show window when ready
	mainWindow.show();
	mainWindow.webContents.openDevTools();

	// Handle external links
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});
}

async function main() {
	try {
		await app.whenReady();
		console.log('Line 52 - main.ts: Initializing Pluggable Electron');
		
		// In development, use the source plugins directory
		const pluginsPath = is.dev 
			? join(process.cwd(), 'plugins')
			: join(__dirname, '../../plugins');
			
		console.log('Line 58 - main.ts pluginsPath: ', pluginsPath);
		console.log('Line 59 - main.ts is.dev: ', is.dev);
		
		// Initialize plugin manager
		const pluginManager = new PluginManager(pluginsPath);
		
		console.log('Line 77 - main.ts: Plugin manager initialized');

		// Handle plugin setup requests from renderer
		ipcMain.handle('pluggable:setup', async (_, config) => {
			console.log('Line 82 - main.ts: Setting up plugin system with config:', config);
			try {
				// Use the plugin manager to handle setup
				const result = {
					extensionPoints: pluginManager.getExtensionPoints(),
					register: (point: string, name: string, handler: any) => {
						console.log('Line 87 - main.ts: Registering extension point:', { point, name });
						return pluginManager.registerExtensionPoint(point, name, handler);
					}
				};
				console.log('Line 91 - main.ts: Plugin setup result:', result);
				return result;
			} catch (error) {
				console.error('Line 94 - main.ts: Error setting up plugin system:', error);
				throw error;
			}
		});

		// Set app user model id for windows
		electronApp.setAppUserModelId('com.electron');

		// Default open or close DevTools by F12 in development
		// and ignore CommandOrControl + R in production.
		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window);
		});

		await createWindow();

		app.on('activate', async () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (BrowserWindow.getAllWindows().length === 0) {
				await createWindow();
			}
		});

		// Quit when all windows are closed, except on macOS
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		ipcMain.handle('main-function', () => {
			console.log('Line 58 - main.ts: Function called from renderer process via IPC');
			return Promise.resolve(); // Return a promise to properly handle async operation
		});
	} catch (error) {
		console.error('Failed to initialize app:', error);
		app.quit();
	}
}

main().catch(console.error);
