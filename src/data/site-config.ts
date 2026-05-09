import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://nicolasmarrero.vercel.app',
    title: 'Nicolás Marrero',
    subtitle: 'Sitio personal',
    description: 'Sitio web personal de Nicolás Marrero',
    image: {
        src: '/og-image.jpg',
        alt: 'Nicolás Marrero'
    },
    headerNavLinks: [
        {
            text: 'Inicio',
            href: '/'
        },
        {
            text: 'Publicaciones',
            href: '/publicaciones'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Contacto',
            href: '/contacto'
        }
    ],
    footerNavLinks: [
        {
            text: 'Contacto',
            href: '/contacto'
        }
    ],
    socialLinks: [],
    postsPerPage: 10,
    projectsPerPage: 10
};

export default siteConfig;
