import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inicio',
  title: 'Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Saludo principal del home',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array',
      of: [{ type: 'block' }],
      description: '2–3 párrafos de presentación',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      description: 'Imagen de perfil',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'photo',
    },
  },
})
