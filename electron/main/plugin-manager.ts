// Simple plugin manager implementation
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

export class PluginManager {
    private pluginsPath: string;
    private extensionPoints: Map<string, Map<string, any>>;

    constructor(pluginsPath: string) {
        this.pluginsPath = pluginsPath;
        this.extensionPoints = new Map();
        console.log('Line 11 - plugin-manager.ts: Plugin manager initialized with path:', pluginsPath);
    }

    getExtensionPoints() {
        console.log('Line 15 - plugin-manager.ts: Getting extension points');
        return Array.from(this.extensionPoints.keys()).map(point => ({
            name: point,
            handlers: Array.from(this.extensionPoints.get(point)?.keys() || [])
        }));
    }

    registerExtensionPoint(point: string, name: string, handler: any) {
        console.log('Line 24 - plugin-manager.ts: Registering extension point:', { point, name });
        if (!this.extensionPoints.has(point)) {
            this.extensionPoints.set(point, new Map());
        }
        this.extensionPoints.get(point)?.set(name, handler);
        return true;
    }

    executeExtensionPoint(point: string, ...args: any[]) {
        console.log('Line 33 - plugin-manager.ts: Executing extension point:', point);
        const handlers = this.extensionPoints.get(point);
        if (!handlers) {
            console.log('Line 36 - plugin-manager.ts: No handlers found for point:', point);
            return;
        }
        handlers.forEach((handler, name) => {
            console.log('Line 40 - plugin-manager.ts: Executing handler:', name);
            handler(...args);
        });
    }
}
