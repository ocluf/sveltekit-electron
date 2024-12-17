# sveltekit-electron

An Electron application with Sveltekit, TypeScript, and tailwindcss v4

## Notes

- Uses svelte static adapter to generate static HTML/JS files
- Uses electron-serve to serve the static web assets as sveltekit does not play nice with file:// urls
- uses ESM imports where possible

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

Note: only been tested on Macos without notarization

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
