// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.meralabh.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404/') &&
        !page.endsWith('/404.html') &&
        !page.includes('/privacy') &&
        !page.includes('/disclaimer') &&
        !page.includes('/about'),
    }),
  ],
});
