import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'quote', type: 'text'}),
    defineField({name: 'attributionName', type: 'string'}),
    defineField({name: 'attributionRole', type: 'string'}),
    defineField({name: 'attributionDistrict', type: 'string'}),
  ],
})
