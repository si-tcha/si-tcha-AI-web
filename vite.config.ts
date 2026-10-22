import { defineConfig } from 'vite';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [{ name: 'figma-asset-resolver', resolveId(id: string) { if (id.startsWith('figma:asset/')) return path.resolve(root, 'src/assets', id.replace('figma:asset/', '')); } }, react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(root, './src') } },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: { manifest: true },
});
