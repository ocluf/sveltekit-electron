import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.cjs'),
      name: 'simple-test-plugin',
      formats: ['es'],
      fileName: () => 'simple-test-plugin.mjs'
    }
  }
});
