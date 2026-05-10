import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Press articles from Brecha
const prensaArticles = [
  {
    title: "El robo del tiempo",
    year: 2026,
    description: "La discusión sobre la reducción de la jornada laboral",
    url: "https://brecha.com.uy/el-robo-del-tiempo/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/09/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Es necesario «un derecho colectivo sobre los datos»",
    year: 2025,
    description: "Entrevista con la doctora en Ciencias Sociales Luciana Zorzoli",
    url: "https://brecha.com.uy/es-necesario-un-derecho-colectivo-sobre-los-datos/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2025/12/6-Entrevista-Marrero-w-600x524.jpg"
  },
  {
    title: "La ciencia bajo tutela",
    year: 2025,
    description: "El gobierno busca crear una ciencia presidencialista, subordinada al gobierno de turno",
    url: "https://brecha.com.uy/la-ciencia-bajo-tutela/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/09/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Una tarea ineludible",
    year: 2025,
    description: "Uruguay en la encrucijada global por regular el trabajo en plataformas",
    url: "https://brecha.com.uy/una-tarea-ineludible/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/09/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "La encrucijada",
    year: 2025,
    description: "Uruguay, el mundo del trabajo y los caminos por venir",
    url: "https://brecha.com.uy/la-encrucijada-2058/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2025/05/Contratapa-pa-pel-20250501DV_14244-600x371.jpg"
  },
  {
    title: "Hora de asumir el desafío II",
    year: 2025,
    description: "Ucronías digitales: ¿un futuro más allá de las plataformas?",
    url: "https://brecha.com.uy/hora-de-asumir-el-desafio-ii/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/09/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Hora de asumir el desafío",
    year: 2025,
    description: "El futuro de la regulación en las plataformas digitales",
    url: "https://brecha.com.uy/hora-de-asumir-el-desafio/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/09/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Un camino de regresión (II)",
    year: 2024,
    description: "El proyecto de ley del gobierno para regular el trabajo en plataformas digitales",
    url: "https://brecha.com.uy/un-camino-de-regresion-ii/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/06/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Un camino de regresión (I)",
    year: 2024,
    description: "El proyecto de ley del gobierno para regular el trabajo en plataformas digitales",
    url: "https://brecha.com.uy/un-camino-de-regresion-i/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/05/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Cuando el algoritmo no puede calcular la capacidad de organización",
    year: 2024,
    description: "La clase trabajadora y el conflicto de PedidosYa",
    url: "https://brecha.com.uy/cuando-el-algoritmo-no-puede-calcular-la-capacidad-de-organizacion/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2023/12/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-1-1-600x300.webp"
  },
  {
    title: "Informalidad, precariedad e hiperflexibilización",
    year: 2024,
    description: "Capitalismo de plataformas en Uruguay",
    url: "https://brecha.com.uy/informalidad-precariedad-e-hiperflexibilizacion/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2024/01/4-5-6-w-Msarrero-pedidos-ya-FGI2024010900031-600x400.jpg"
  },
  {
    title: "Una crisis no solo bancaria",
    year: 2023,
    description: "De Silicon Valley a la economía internacional",
    url: "https://brecha.com.uy/una-crisis-no-solo-bancaria/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2023/03/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-600x300.webp"
  },
  {
    title: "¿Consolidación del (falso) trabajo autónomo?",
    year: 2022,
    description: "La regulación laboral en las plataformas digitales propuesta por el gobierno",
    url: "https://brecha.com.uy/la-regulacion-laboral-en-las-plataformas-digitales-propuesta-por-el-gobierno-consolidacion-del-falso-trabajo-autonomo/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2022/08/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-2-600x300.webp"
  },
  {
    title: "La verdadera cara del emprendedurismo de las plataformas",
    year: 2022,
    description: "#Uberfiles",
    url: "https://brecha.com.uy/uber-uberfiles-plataformas-evasion-fiscal-lobby/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2022/07/WEB_Subsecciones_Opi2-2048x1024-1-2-1-1-600x300.png"
  },
  {
    title: "El ganador se lo lleva todo",
    year: 2022,
    description: "Detrás de las empresas de plataformas digitales",
    url: "https://brecha.com.uy/el-ganador-se-lo-lleva-todo/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2021/08/WEB_Subsecciones_Opi2-2048x1024-1-600x300.png"
  },
  {
    title: "El retrato de la uberización del trabajo",
    year: 2021,
    description: "Ken Loach, las plataformas uruguayas y lo que está por venir",
    url: "https://brecha.com.uy/el-retrato-de-la-uberizacion-del-trabajo/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2021/08/WEB_Subsecciones_Opi2-2048x1024-1-600x300.png"
  },
  {
    title: "Navidad en las trincheras",
    year: 2016,
    description: "Trabajadores de supermercados en Uruguay",
    url: "https://brecha.com.uy/navidad-las-trincheras/",
    externalImageUrl: "https://brecha.com.uy/wp-content/uploads/2016/12/supermercads-Foto-Leonidas-Martinez-600x398.jpg"
  },
  {
    title: "Un proyecto de ley contra la precarización laboral",
    year: 2016,
    description: "Tercerización y precarización del trabajo en América Latina",
    url: "https://brecha.com.uy/proyecto-ley-la-precarizacion-laboral/"
  }
]

function generateSlug(title, year) {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${normalized}-${year}`
}

async function importPrensa() {
  console.log('Starting prensa import...\n')

  let created = 0
  for (const item of prensaArticles) {
    try {
      const doc = {
        _type: 'prensa',
        title: item.title,
        slug: { _type: 'slug', current: generateSlug(item.title, item.year) },
        year: item.year,
        description: item.description || undefined,
        externalImageUrl: item.externalImageUrl || undefined,
        url: item.url,
      }

      const result = await client.create(doc)
      console.log(`  Created: ${result.title}`)
      created++
    } catch (error) {
      console.error(`  Error creating "${item.title}":`, error.message)
    }
  }

  console.log(`\nImport complete! Created ${created} prensa articles.`)
}

if (!process.env.SANITY_PROJECT_ID) {
  console.error('Error: SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('Error: SANITY_WRITE_TOKEN is not set')
  process.exit(1)
}

importPrensa().catch(console.error)
