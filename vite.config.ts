import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/res',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  publicDir: 'static',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        'main': path.resolve(__dirname, 'main.html'),
        'index': path.resolve(__dirname, 'index.html'),
        'preview/markdown': path.resolve(__dirname, 'src/utils/Preview/Markdown/index.html'),
        'preview/text': path.resolve(__dirname, 'src/utils/Preview/Text/index.html')
      }
    }
  },
})
