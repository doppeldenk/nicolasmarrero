import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolasmarrero.vercel.app',
    output: 'static',
    adapter: vercel(),
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [sitemap()]
});
