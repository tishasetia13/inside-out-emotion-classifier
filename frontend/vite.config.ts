import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Read VITE_* values from .env files so the build step can use them in index.html.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      {
        // Swaps the __SITE_URL__ placeholder in index.html for the real site address,
        // because social preview tags (Open Graph) need absolute URLs.
        name: 'inject-site-url',
        transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', siteUrl),
      },
    ],
    test: { environment: 'node' },
  }
})
