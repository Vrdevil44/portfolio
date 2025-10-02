import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Set base for GitHub Pages project pages.
  // Uses repo name when building for production; dev remains "/".
  const base = mode === 'production' ? '/portfolio/' : '/'

  return {
    base,
    plugins: [react()],
    build: {
      // Output to docs/ so GitHub Pages can serve from the root branch
      outDir: 'docs',
      emptyOutDir: true,
    },
  }
})
