import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'jobOpening',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'state', type: 'string'}),
    defineField({
      name: 'employmentType',
      type: 'string',
      options: {list: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR']},
    }),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'datePosted', type: 'date'}),
    defineField({name: 'validThrough', type: 'date'}),
  ],
})
