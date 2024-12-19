interface Window {
    pluginSetup: {
        setup: (config: any) => Promise<any>;
    };
    pluginInterfaces: {
        install: (plugins: any) => Promise<any>;
        uninstall: (plugins: any, reload?: boolean) => Promise<any>;
        getActive: () => Promise<any>;
        update: (plugins: any, reload?: boolean) => Promise<any>;
        updatesAvailable: (plugin: string) => Promise<any>;
        toggleActive: (plugin: string, active: boolean) => Promise<any>;
    };
}
