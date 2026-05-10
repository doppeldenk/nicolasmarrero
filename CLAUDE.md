# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Nicolás Marrero. Built with Astro 5 + Tailwind CSS 4 frontend, Sanity CMS for content management, deployed on Vercel.

## Commands

```bash
# Astro frontend (root directory)
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build locally

# Sanity Studio (sanity/ directory)
cd sanity && npm run dev      # Start Sanity Studio
cd sanity && npm run deploy   # Deploy Sanity Studio
```

## Architecture

### Two Separate Projects
- **Root (`/`)**: Astro frontend application
- **`/sanity/`**: Sanity CMS Studio (separate npm project with its own package.json)

### Content Flow
All content comes from Sanity CMS via `src/lib/sanity.ts`:
- `getInicio()` - Homepage bio/photo (singleton document)
- `getPublicaciones()` - Academic publications list
- `getPosts()` / `getPostBySlug()` - Blog posts
- `getContacto()` - Contact info (singleton document)
- `urlFor()` - Sanity image URL builder

### Sanity Schema Types (`sanity/schemaTypes/`)
- **Singletons** (fixed IDs): `inicio`, `contacto`
- **Collections**: `publicacion`, `post`

### Page Structure (`src/pages/`)
- `/` - Homepage with bio from Sanity
- `/publicaciones/` - Publications list grouped by type (libro, articulo, charla, otro)
- `/publicaciones/[slug]` - Individual publication detail
- `/blog/` - Blog post listing
- `/blog/[slug]` - Individual blog post
- `/contacto` - Contact page
- `/rss.xml` - RSS feed

### Key Patterns
- Pages fetch Sanity data in frontmatter, render with Astro components
- Rich text uses `PortableText.astro` component with `astro-portabletext`
- Images use Sanity's image URL builder with responsive sizing
- Site-wide config in `src/data/site-config.ts`
- Spanish localization throughout UI and Sanity Studio

## Environment Variables

Required for Sanity integration:
```
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
```

For Sanity Studio (`sanity/` directory):
```
SANITY_STUDIO_PROJECT_ID=xxx
SANITY_STUDIO_DATASET=production
```
