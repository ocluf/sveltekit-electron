import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import serve from 'electron-serve';
import icon from '../../resources/icon.png?asset';

const loadURL = serve({
	directory: 'out/svelte',
	scheme: 'app'
});

async function createWindow(): Promise<void> {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.cjs'),
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

	// Handle external links
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});
}

async function main() {
	try {
		await app.whenReady();

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
			console.log('Function called from main context with main privileges');
		});
	} catch (error) {
		console.error('Failed to initialize app:', error);
		app.quit();
	}
}

main().catch(console.error);
