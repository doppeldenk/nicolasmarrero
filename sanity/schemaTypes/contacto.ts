import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contacto',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      email: 'email',
    },
    prepare({ email }) {
      return {
        title: 'Contacto',
        subtitle: email,
      }
    },
  },
})
