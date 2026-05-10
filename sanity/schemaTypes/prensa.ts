import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prensa',
  title: 'Prensa',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.title}-${doc.year}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'URL de imagen externa',
      type: 'url',
      description: 'URL de imagen externa (si no se sube imagen)',
    }),
    defineField({
      name: 'url',
      title: 'Enlace externo',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'coverImage',
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year?.toString(),
        media,
      }
    },
  },
})
