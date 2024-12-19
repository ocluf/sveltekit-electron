# Simple Test Plugin

This is a minimal test plugin for Pluggable Electron that demonstrates the basic functionality of the plugin system.

## Features

1. Implements two activation points:
   - `onStartup`: Called when the plugin is first activated
   - `onRender`: Called during render-related operations

2. Provides two extension points:
   - `addMenuItem`: Adds a test menu item to the application
   - `modifyContent`: Modifies content by appending text

## Installation

Place this plugin folder in your project's plugins directory.

## Testing

The plugin will:
1. Log messages to console when activated
2. Add a "Test Plugin" menu item
3. Modify content when the modifyContent extension point is triggered

## Structure

- `package.json`: Plugin metadata and activation/extension points declaration
- `index.js`: Plugin implementation with activation functions
