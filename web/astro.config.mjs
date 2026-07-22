import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Add any future noindex landing page paths here (e.g. ad landing pages) —
// the sitemap filter below excludes them automatically. Empty for now: every
// page in this build is meant to be indexed.
export const NOINDEX_PATHS = []

export default defineConfig({
  site: 'https://ntrlink.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.includes(path)),
    }),
  ],
})
