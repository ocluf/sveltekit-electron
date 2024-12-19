# Project Structure

## Core Directories

```
ocluf_sveltekit-electron/
├── electron/
│   ├── main/
│   │   └── main.ts         # Main process setup
│   └── preload/
│       └── preload.ts      # Preload script for IPC bridge
├── plugins/
│   ├── pluggable-electron  # Symlink to node_modules/pluggable-electron
│   └── plugins.json        # Plugin configuration
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   └── types/
│   │       └── electron.d.ts  # TypeScript definitions
│   └── routes/
│       └── +page.svelte    # Main page component
└── _notes/                 # Project documentation
    ├── ipc-communication.md
    └── project-structure.md
```

## Technology Stack

- Electron v33
- Svelte v5
- SvelteKit v2
- TypeScript
- Vite
- pnpm (package manager)

## Key Features

1. Secure IPC Communication
2. Type-safe interfaces
3. Modern UI components
4. Developer tools integration
5. Error handling and logging

## Development Guidelines

1. Use latest best practices for JS/TS/CSS/HTML
2. Follow Electron security guidelines
3. Maintain proper documentation
4. Include descriptive logging
5. Keep code simple and clean
6. Comment code appropriately
7. Use TypeScript for type safety
