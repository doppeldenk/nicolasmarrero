import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articulo',
  title: 'Artículos',
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: '1–3 frases describiendo el artículo',
      rows: 3,
    }),
    defineField({
      name: 'url',
      title: 'Enlace',
      type: 'url',
      description: 'Link a Academia.edu, DOI, etc.',
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
    },
    prepare({ title, year }) {
      return {
        title,
        subtitle: `${year}`,
      }
    },
  },
})
