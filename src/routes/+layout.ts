// SvelteKit configuration
export const ssr = false;
export const prerender = true;
export const csr = true;

// Types for plugin management
export interface PluginFile extends File {
    path: string;
}

// Types for extension management
export interface ExtensionPoint {
    name: string;
    description: string;
    version: string;
}

export interface ExtensionManager {
    points: ExtensionPoint[];
    register: (point: ExtensionPoint) => void;
}
