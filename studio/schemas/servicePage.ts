import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'metaTitle', type: 'string'}),
    defineField({name: 'metaDescription', type: 'text'}),
    defineField({name: 'heroHeadline', type: 'string'}),
    defineField({name: 'heroSubhead', type: 'text'}),
    defineField({
      name: 'solutionBlocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', type: 'string'},
            {name: 'bullets', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    }),
    defineField({
      name: 'differenceBlocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', type: 'string'},
            {name: 'body', type: 'text'},
            {name: 'image', type: 'image'},
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text'},
          ],
        },
      ],
    }),
  ],
})
