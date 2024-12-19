'use strict';

var electron = require('electron');

function useFacade() {
	const interfaces = {
		install(plugins) {
			return electron.ipcRenderer.invoke('pluggable:install', plugins);
		},
		uninstall(plugins, reload) {
			return electron.ipcRenderer.invoke('pluggable:uninstall', plugins, reload);
		},
		getActive() {
			return electron.ipcRenderer.invoke('pluggable:getActivePlugins');
		},
		update(plugins, reload) {
			return electron.ipcRenderer.invoke('pluggable:update', plugins, reload);
		},
		updatesAvailable(plugin) {
			return electron.ipcRenderer.invoke('pluggable:updatesAvailable', plugin);
		},
		toggleActive(plugin, active) {
			return electron.ipcRenderer.invoke('pluggable:togglePluginActive', plugin, active);
		}
	};

	if (electron.contextBridge) {
		electron.contextBridge.exposeInMainWorld('pluggableElectronIpc', interfaces);
	}

	return interfaces;
}

module.exports = useFacade;
