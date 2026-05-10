import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const entrevistas = [
  {
    title: "Telsur: Análisis de las Elecciones Presidenciales en Uruguay",
    url: "https://www.youtube.com/watch?v=VnYSmGBiVzs",
    date: "2024-01-01"
  },
  {
    title: "Uberización del trabajo RLC T3 E07",
    url: "https://www.youtube.com/watch?v=qhSSEo6bFHg",
    date: "2024-01-01"
  },
  {
    title: "Relatos: Trabajo de lo artesanal a lo digital",
    url: "https://www.youtube.com/watch?v=8ZJarREYhrA",
    date: "2024-01-01"
  },
  {
    title: "Trabajadores de plataformas y seguridad social",
    url: "https://www.youtube.com/watch?v=LRADWkAPYxs",
    date: "2024-01-01"
  },
  {
    title: "Lado B: En la ciudad de la furia, el mundo de los repartidores",
    url: "https://www.youtube.com/watch?v=VIRR20AdfpI",
    date: "2023-01-01"
  },
  {
    title: "Trabajo en las empresas de plataforma de reparto en América Latina",
    url: "https://www.youtube.com/watch?v=5GkpoKIJxz0",
    date: "2023-01-01"
  },
  {
    title: "La Trinchera - Capítulo 9: Educación y Rendición de Cuentas",
    url: "https://www.youtube.com/watch?v=1uF8VK_ZVUo",
    date: "2023-01-01"
  },
  {
    title: "Las formas de contratación en aplicaciones genera una falsa autonomía laboral",
    url: "https://www.youtube.com/watch?v=VEd3PjCzHwQ",
    date: "2023-01-01"
  },
  {
    title: "En Uruguay se esconde explotación laboral en plataformas digitales",
    url: "https://www.youtube.com/watch?v=ViMhu1llEOI",
    date: "2023-01-01"
  },
  {
    title: "Entrevista en Dato mata relato sobre libro Emprendedores Ya!",
    url: "https://www.youtube.com/watch?v=6OFeW_E565g",
    date: "2023-01-01"
  },
  {
    title: "Entrevista con Camila Lara (UTP) en Legítima Defensa",
    url: "https://www.youtube.com/watch?v=eyR-wtSrxpo",
    date: "2023-01-01"
  }
]

async function importEntrevistas() {
  console.log('Starting entrevistas import...\n')

  let created = 0
  for (const item of entrevistas) {
    try {
      const doc = {
        _type: 'entrevista',
        title: item.title,
        url: item.url,
        date: item.date,
      }

      const result = await client.create(doc)
      console.log(`  Created: ${result.title}`)
      created++
    } catch (error) {
      console.error(`  Error creating "${item.title}":`, error.message)
    }
  }

  console.log(`\nImport complete! Created ${created} entrevistas.`)
}

if (!process.env.SANITY_PROJECT_ID) {
  console.error('Error: SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('Error: SANITY_WRITE_TOKEN is not set')
  process.exit(1)
}

importEntrevistas().catch(console.error)
