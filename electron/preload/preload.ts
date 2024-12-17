import { contextBridge, ipcRenderer } from 'electron';

const api = {
	preload: () => {
		console.log('Preload function called');
	},
	main: () => {
		ipcRenderer.invoke('main-function');
	}
};

contextBridge.exposeInMainWorld('api', api);
