import { contextBridge, ipcRenderer } from 'electron';
// import useFacade from 'pluggable-electron/preload';
import useFacade from './facade';
useFacade();

// API exposed to renderer process
const api = {
	preload: () => {
		console.log('Line 5 - preload.ts: Preload function called from renderer process');
	},
	main: async () => {
		try {
			await ipcRenderer.invoke('main-function');
		} catch (error) {
			console.error('Line 11 - preload.ts: Error calling main function:', error);
		}
	}
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('api', api);
