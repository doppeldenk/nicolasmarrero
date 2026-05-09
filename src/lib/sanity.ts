import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types
export interface Inicio {
  title: string
  bio: any[] // Portable Text
  photo?: {
    asset: {
      _ref: string
    }
    hotspot?: {
      x: number
      y: number
    }
  }
}

export interface Publicacion {
  _id: string
  title: string
  year: number
  type: 'libro' | 'articulo' | 'charla' | 'otro'
  description?: string
  coverImage?: SanityImageSource
  url?: string
  slug: string // Generated from title + year
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  date: string
  coverImage?: SanityImageSource
  content: any[] // Portable Text
}

export interface Contacto {
  email?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

// Helper to generate slug from title and year
function generateSlug(title: string, year: number): string {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
  return `${normalized}-${year}`
}

// GROQ Queries

export async function getInicio(): Promise<Inicio | null> {
  return client.fetch(`*[_id == "inicio"][0]{ title, bio, photo }`)
}

export async function getPublicaciones(): Promise<Publicacion[]> {
  const results = await client.fetch(`
    *[_type == "publicacion"] | order(year desc) {
      _id,
      title,
      year,
      type,
      description,
      coverImage,
      url
    }
  `)
  // Add generated slugs
  return results.map((pub: any) => ({
    ...pub,
    slug: generateSlug(pub.title, pub.year),
  }))
}

export async function getPublicacionBySlug(slug: string): Promise<Publicacion | null> {
  const publicaciones = await getPublicaciones()
  return publicaciones.find((p) => p.slug === slug) || null
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      coverImage
    }
  `)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      date,
      coverImage,
      content
    }`,
    { slug }
  )
}

export async function getContacto(): Promise<Contacto | null> {
  return client.fetch(`*[_id == "contacto"][0]{ email, socialLinks }`)
}

// For RSS feed
export async function getAllPostsForRSS(): Promise<Array<{ title: string; slug: string; date: string }>> {
  return client.fetch(`
    *[_type == "post"] | order(date desc) {
      title,
      "slug": slug.current,
      date
    }
  `)
}
