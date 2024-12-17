# IPC Communication in Electron + SvelteKit

## Architecture Overview

The IPC (Inter-Process Communication) setup follows Electron's security best practices with proper process separation:

```
Renderer Process (SvelteKit)
       ↓ ↑
   IPC Bridge
       ↓ ↑
  Main Process
```

## Key Files

1. `src/routes/+page.svelte`
   - UI components with buttons for testing IPC
   - Handles renderer-side API calls
   - Includes error handling for non-Electron environments

2. `electron/preload/preload.ts`
   - Sets up the secure bridge between renderer and main processes
   - Exposes limited API via contextBridge
   - Handles IPC communication with error handling

3. `electron/main/main.ts`
   - Main process setup and IPC handlers
   - Manages window creation and lifecycle
   - Handles main process privileges

4. `src/lib/types/electron.d.ts`
   - TypeScript definitions for Electron window interface
   - Ensures type safety for IPC communication

## IPC Communication Flow

1. Renderer Process (SvelteKit)
   - Calls `window.api.preload()` or `window.api.main()`
   - Handles errors if API is not available

2. Preload Script
   - Receives calls from renderer
   - Routes calls to appropriate IPC channels
   - Provides error handling and logging

3. Main Process
   - Handles IPC events
   - Executes privileged operations
   - Returns results to renderer

## Debugging

- Use DevTools (F12) to view logs
- Console tab shows renderer and preload logs
- Main Process tab shows main process logs
- Line numbers are included in logs for easy tracking

## Best Practices

1. Always use contextIsolation and sandbox
2. Handle errors at each level
3. Use TypeScript for type safety
4. Include descriptive logging
5. Return Promises for async operations
