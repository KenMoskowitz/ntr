import {defineField, defineType} from 'sanity'

// Written by web/api/subscribe.js — same pattern as contactSubmission.
export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'subscribedAt', type: 'datetime'}),
  ],
  preview: {
    select: {title: 'email'},
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'subscribedAtDesc',
      by: [{field: 'subscribedAt', direction: 'desc'}],
    },
  ],
})
