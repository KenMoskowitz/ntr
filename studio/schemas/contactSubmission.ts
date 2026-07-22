import {defineField, defineType} from 'sanity'

// Where /contact submissions land (written by web/api/contact.js). Read-only
// from the site's perspective — Studio is the inbox until a real CRM/email
// integration replaces it. See README "Contact form" section.
export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'submissionType',
      type: 'string',
      options: {list: ['district', 'candidate']},
    }),
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'state', type: 'string'}),
    defineField({name: 'message', type: 'text'}),
    defineField({name: 'submittedAt', type: 'datetime'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'submissionType'},
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
})
