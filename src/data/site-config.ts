import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://nicolasmarrero.vercel.app',
    title: 'Nicolás Marrero',
    subtitle: 'Sitio personal',
    description: 'Sociólogo uruguayo investigando el capitalismo de plataformas y la uberización del trabajo',
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
            text: 'Entrevistas',
            href: '/entrevistas'
        },
        {
            text: 'Prensa',
            href: '/prensa'
        },
        {
            text: 'Artículos Académicos',
            href: '/articulos'
        },
        {
            text: 'Libros',
            href: '/libros'
        },
        {
            text: 'Conferencias',
            href: '/conferencias'
        },
        {
            text: 'Charlas',
            href: '/charlas'
        },
        {
            text: 'Podcast',
            href: '/podcast'
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
    footerNavLinks: [],
    socialLinks: [],
    postsPerPage: 10,
    projectsPerPage: 10
};

export default siteConfig;
