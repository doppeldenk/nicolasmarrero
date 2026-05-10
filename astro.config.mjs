import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolasmarrero.vercel.app',
    output: 'static',
    adapter: cloudflare(),
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [sitemap()]
});