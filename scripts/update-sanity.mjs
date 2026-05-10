#!/usr/bin/env node
/**
 * Script to programmatically update Sanity content
 *
 * Usage:
 *   node scripts/update-sanity.mjs
 *
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_WRITE_TOKEN in .env
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Upload an image to Sanity and return the asset reference
export async function uploadImage(filePath) {
  const buffer = readFileSync(resolve(filePath))
  const asset = await client.assets.upload('image', buffer, {
    filename: filePath.split('/').pop(),
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

// Update the "inicio" singleton document
export async function updateInicio({ title, bio, photoPath }) {
  const patch = client.patch('inicio')

  if (title) patch.set({ title })
  if (bio) patch.set({ bio: [{ _type: 'block', children: [{ _type: 'span', text: bio }] }] })
  if (photoPath) {
    const photo = await uploadImage(photoPath)
    patch.set({ photo })
  }

  return patch.commit()
}

// Update the "contacto" singleton document
export async function updateContacto({ email, socialLinks }) {
  const patch = client.patch('contacto')

  if (email) patch.set({ email })
  if (socialLinks) patch.set({ socialLinks })

  return patch.commit()
}

// Create a new publication
export async function createPublicacion({ title, year, type, description, url, coverImagePath }) {
  const doc = {
    _type: 'publicacion',
    title,
    year,
    type,
    description,
    url,
  }

  if (coverImagePath) {
    doc.coverImage = await uploadImage(coverImagePath)
  }

  return client.create(doc)
}

// Create a new blog post
export async function createPost({ title, slug, date, content, coverImagePath }) {
  const doc = {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    date,
    content: [{ _type: 'block', children: [{ _type: 'span', text: content }] }],
  }

  if (coverImagePath) {
    doc.coverImage = await uploadImage(coverImagePath)
  }

  return client.create(doc)
}

// Example usage (uncomment and modify as needed):
// await updateInicio({
//   title: 'Nicolás Marrero',
//   bio: 'Your bio text here...',
//   photoPath: './path/to/photo.jpg',
// })

// await createPublicacion({
//   title: 'My Publication',
//   year: 2024,
//   type: 'articulo',
//   description: 'Description here',
//   url: 'https://example.com',
// })

console.log('Sanity update script loaded. Import functions or uncomment examples to use.')
