import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stateServicePage',
  title: 'State Service Page',
  type: 'document',
  fields: [
    defineField({name: 'stateName', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'stateName'}}),
    defineField({name: 'metaTitle', type: 'string'}),
    defineField({name: 'metaDescription', type: 'text'}),
    defineField({name: 'fundingNotes', type: 'text'}),
    defineField({name: 'medicaidNotes', type: 'text'}),
    defineField({name: 'intro', type: 'text'}),
  ],
})
