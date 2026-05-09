import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable para el post',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Featured image para listing y header del post',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Pie de imagen',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Fecha, descendente',
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
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title,
        subtitle: formattedDate,
        media,
      }
    },
  },
})
