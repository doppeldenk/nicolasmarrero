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

export interface Libro {
  _id: string
  title: string
  year: number
  description?: string
  coverImage?: SanityImageSource
  url?: string
  slug: string
}

export interface Articulo {
  _id: string
  title: string
  year: number
  description?: string
  url?: string
  slug: string
}

export interface Conferencia {
  _id: string
  title: string
  year: number
  description?: string
  url?: string
  slug: string
}

export interface Charla {
  _id: string
  title: string
  year: number
  description?: string
  url?: string
  slug: string
}

export interface Prensa {
  _id: string
  title: string
  year: number
  description?: string
  coverImage?: SanityImageSource
  externalImageUrl?: string
  url?: string
  slug: string
}

export interface Entrevista {
  _id: string
  title: string
  url: string
  date?: string
  videoId: string
  coverImage?: SanityImageSource
}

export interface Podcast {
  _id: string
  title: string
  description?: string
  url: string
  coverImage?: SanityImageSource
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

export async function getLibros(): Promise<Libro[]> {
  const results = await client.fetch(`
    *[_type == "libro"] | order(_createdAt desc) {
      _id,
      title,
      year,
      description,
      coverImage,
      url
    }
  `)
  return results.map((item: any) => ({
    ...item,
    slug: generateSlug(item.title, item.year),
  }))
}

export async function getArticulos(): Promise<Articulo[]> {
  const results = await client.fetch(`
    *[_type == "articulo"] | order(year desc) {
      _id,
      title,
      year,
      description,
      url
    }
  `)
  return results.map((item: any) => ({
    ...item,
    slug: generateSlug(item.title, item.year),
  }))
}

export async function getConferencias(): Promise<Conferencia[]> {
  const results = await client.fetch(`
    *[_type == "conferencia"] | order(year desc) {
      _id,
      title,
      year,
      description,
      url
    }
  `)
  return results.map((item: any) => ({
    ...item,
    slug: generateSlug(item.title, item.year),
  }))
}

export async function getCharlas(): Promise<Charla[]> {
  const results = await client.fetch(`
    *[_type == "charla"] | order(year desc) {
      _id,
      title,
      year,
      description,
      url
    }
  `)
  return results.map((item: any) => ({
    ...item,
    slug: generateSlug(item.title, item.year),
  }))
}

export async function getPrensa(): Promise<Prensa[]> {
  const results = await client.fetch(`
    *[_type == "prensa"] | order(_createdAt desc) {
      _id,
      title,
      year,
      description,
      coverImage,
      externalImageUrl,
      url
    }
  `)
  return results.map((item: any) => ({
    ...item,
    slug: generateSlug(item.title, item.year),
  }))
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : ''
}

export async function getEntrevistas(): Promise<Entrevista[]> {
  const results = await client.fetch(`
    *[_type == "entrevista"] | order(_createdAt desc) {
      _id,
      title,
      url,
      date,
      coverImage
    }
  `)
  return results.map((item: any) => ({
    ...item,
    videoId: extractYouTubeId(item.url),
  }))
}

export async function getPodcasts(): Promise<Podcast[]> {
  return client.fetch(`
    *[_type == "podcast"] | order(_createdAt desc) {
      _id,
      title,
      description,
      url,
      coverImage
    }
  `)
}

export async function getPublicacionBySlug(slug: string): Promise<(Libro | Articulo | Conferencia | Charla) | null> {
  // Search across all publication types
  const [libros, articulos, conferencias, charlas] = await Promise.all([
    getLibros(),
    getArticulos(),
    getConferencias(),
    getCharlas(),
  ])

  const allPublications = [
    ...libros.map((item) => ({ ...item, type: 'libro' as const })),
    ...articulos.map((item) => ({ ...item, type: 'articulo' as const })),
    ...conferencias.map((item) => ({ ...item, type: 'conferencia' as const })),
    ...charlas.map((item) => ({ ...item, type: 'charla' as const })),
  ]

  return allPublications.find((p) => p.slug === slug) || null
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
