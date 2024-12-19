import { contextBridge, ipcRenderer } from 'electron';

interface PluginInterfaces {
    install(plugins: any): Promise<any>;
    uninstall(plugins: any, reload?: boolean): Promise<any>;
    getActive(): Promise<any>;
    update(plugins: any, reload?: boolean): Promise<any>;
    updatesAvailable(plugin: string): Promise<any>;
    toggleActive(plugin: string, active: boolean): Promise<any>;
}

export default function useFacade(): PluginInterfaces {
    const interfaces: PluginInterfaces = {
        install(plugins) {
            return ipcRenderer.invoke('pluggable:install', plugins);
        },
        uninstall(plugins, reload) {
            return ipcRenderer.invoke('pluggable:uninstall', plugins, reload);
        },
        getActive() {
            return ipcRenderer.invoke('pluggable:getActivePlugins');
        },
        update(plugins, reload) {
            return ipcRenderer.invoke('pluggable:update', plugins, reload);
        },
        updatesAvailable(plugin) {
            return ipcRenderer.invoke('pluggable:updatesAvailable', plugin);
        },
        toggleActive(plugin, active) {
            return ipcRenderer.invoke('pluggable:togglePluginActive', plugin, active);
        }
    };

    if (contextBridge) {
        contextBridge.exposeInMainWorld('pluginInterfaces', interfaces);
        contextBridge.exposeInMainWorld('pluginSetup', {
            setup: async (config: any) => {
                console.log('Line 40 - facade.ts: Setting up plugin system with config:', config);
                return ipcRenderer.invoke('pluggable:setup', config);
            }
        });
    }

    return interfaces;
}
