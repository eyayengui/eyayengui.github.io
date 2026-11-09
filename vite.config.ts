import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE lets the CI pipeline deploy under a sub-path (e.g. GitHub Pages "/repo-name/").
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
});
