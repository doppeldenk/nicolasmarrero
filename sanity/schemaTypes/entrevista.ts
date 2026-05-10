import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'entrevista',
  title: 'Entrevista',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL del video (YouTube)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Opcional. Si no se sube, se usa la miniatura de YouTube.',
      options: {
        hotspot: true,
      },
    }),
  ],
  orderings: [
    {
      title: 'Fecha, más reciente',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      }
    },
  },
})
