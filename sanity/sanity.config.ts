import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { esESLocale } from '@sanity/locale-es-es'
import { schemaTypes } from './schemaTypes'

// Singleton document IDs
const SINGLETON_IDS = ['inicio', 'contacto']

// Structure builder for singletons
const structure = (S: any) =>
  S.list()
    .title('Contenido')
    .items([
      // Inicio singleton
      S.listItem()
        .title('Inicio')
        .id('inicio')
        .child(
          S.document()
            .schemaType('inicio')
            .documentId('inicio')
            .title('Inicio')
        ),
      S.divider(),
      // Publicaciones collection
      S.documentTypeListItem('publicacion').title('Publicaciones'),
      // Blog collection
      S.documentTypeListItem('post').title('Blog'),
      S.divider(),
      // Contacto singleton
      S.listItem()
        .title('Contacto')
        .id('contacto')
        .child(
          S.document()
            .schemaType('contacto')
            .documentId('contacto')
            .title('Contacto')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Nicolás Marrero',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    esESLocale(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating new documents for singletons
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_IDS.includes(schemaType)),
  },

  document: {
    // Prevent actions that don't make sense for singletons
    actions: (actions, { schemaType }) => {
      if (SINGLETON_IDS.includes(schemaType)) {
        return actions.filter(
          ({ action }) =>
            action && !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return actions
    },
  },
})
