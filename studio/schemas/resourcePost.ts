import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resourcePost',
  title: 'Resource Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'metaDescription', type: 'text'}),
    defineField({name: 'publishDate', type: 'date'}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'relatedServiceSlugs',
      title: 'Related service pages (for internal linking)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
