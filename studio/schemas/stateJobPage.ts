import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stateJobPage',
  title: 'State Job Page',
  type: 'document',
  fields: [
    defineField({name: 'stateName', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'stateName'}}),
    defineField({name: 'metaTitle', type: 'string'}),
    defineField({name: 'metaDescription', type: 'text'}),
    defineField({name: 'licenseNote', type: 'text'}),
    defineField({
      name: 'openRoles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'jobOpening'}]}],
    }),
    defineField({name: 'intro', type: 'text'}),
  ],
})
