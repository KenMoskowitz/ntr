import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'outcomeStat',
  title: 'Outcome Stat',
  type: 'document',
  fields: [
    defineField({name: 'statNumber', type: 'string'}),
    defineField({name: 'statLabel', type: 'string'}),
    defineField({name: 'source', type: 'string'}),
  ],
})
