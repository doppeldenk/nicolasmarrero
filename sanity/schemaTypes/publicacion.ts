import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'publicacion',
  title: 'Publicaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Libro', value: 'libro' },
          { title: 'Artículo', value: 'articulo' },
          { title: 'Charla', value: 'charla' },
          { title: 'Otro', value: 'otro' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: '1–3 frases describiendo la publicación',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Útil sobre todo para libros',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Enlace',
      type: 'url',
      description: 'Link al publisher, DOI, video de la charla, etc.',
    }),
  ],
  orderings: [
    {
      title: 'Año, descendente',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      type: 'type',
      media: 'coverImage',
    },
    prepare({ title, year, type, media }) {
      const typeLabels: Record<string, string> = {
        libro: 'Libro',
        articulo: 'Artículo',
        charla: 'Charla',
        otro: 'Otro',
      }
      return {
        title,
        subtitle: `${year} · ${typeLabels[type] || type}`,
        media,
      }
    },
  },
})
