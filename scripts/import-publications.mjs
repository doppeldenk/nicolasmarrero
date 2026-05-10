import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables from .env file
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Read publications data
const dataPath = join(__dirname, 'publications-data.json')
const data = JSON.parse(readFileSync(dataPath, 'utf-8'))

async function createDocument(type, item) {
  const doc = {
    _type: type,
    title: item.title,
    year: item.year,
    description: item.description || undefined,
    url: item.url || undefined,
  }

  return client.create(doc)
}

async function importPublications() {
  console.log('Starting import...\n')

  let totalCreated = 0

  // Import libros
  if (data.libros && data.libros.length > 0) {
    console.log(`Importing ${data.libros.length} libros...`)
    for (const item of data.libros) {
      try {
        const result = await createDocument('libro', item)
        console.log(`  Created libro: ${result.title}`)
        totalCreated++
      } catch (error) {
        console.error(`  Error creating libro "${item.title}":`, error.message)
      }
    }
  }

  // Import articulos
  if (data.articulos && data.articulos.length > 0) {
    console.log(`\nImporting ${data.articulos.length} articulos...`)
    for (const item of data.articulos) {
      try {
        const result = await createDocument('articulo', item)
        console.log(`  Created articulo: ${result.title}`)
        totalCreated++
      } catch (error) {
        console.error(`  Error creating articulo "${item.title}":`, error.message)
      }
    }
  }

  // Import conferencias
  if (data.conferencias && data.conferencias.length > 0) {
    console.log(`\nImporting ${data.conferencias.length} conferencias...`)
    for (const item of data.conferencias) {
      try {
        const result = await createDocument('conferencia', item)
        console.log(`  Created conferencia: ${result.title}`)
        totalCreated++
      } catch (error) {
        console.error(`  Error creating conferencia "${item.title}":`, error.message)
      }
    }
  }

  // Import charlas
  if (data.charlas && data.charlas.length > 0) {
    console.log(`\nImporting ${data.charlas.length} charlas...`)
    for (const item of data.charlas) {
      try {
        const result = await createDocument('charla', item)
        console.log(`  Created charla: ${result.title}`)
        totalCreated++
      } catch (error) {
        console.error(`  Error creating charla "${item.title}":`, error.message)
      }
    }
  }

  console.log(`\nImport complete! Created ${totalCreated} documents.`)
}

// Check for required environment variables
if (!process.env.SANITY_PROJECT_ID) {
  console.error('Error: SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('Error: SANITY_WRITE_TOKEN is not set')
  console.error('You can create a write token at: https://www.sanity.io/manage')
  process.exit(1)
}

importPublications().catch(console.error)
