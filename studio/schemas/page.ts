import {defineField, defineType} from 'sanity'

// Shared schema for the core singleton marketing pages (home, about, team,
// services hub, careers hub, contact, results, resources hub, privacy policy).
// One flexible type instead of nine near-identical ones — the dedicated
// schemas (servicePage, stateJobPage, etc.) cover the structurally distinct
// content types; these pages are all "headline + body + optional CTA/refs."
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      options: {
        list: [
          'home',
          'about',
          'team',
          'services-index',
          'careers',
          'contact',
          'results',
          'resources-index',
          'privacy-policy',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'metaTitle', type: 'string'}),
    defineField({name: 'metaDescription', type: 'text'}),
    defineField({name: 'heroHeadline', type: 'string'}),
    defineField({name: 'heroSubhead', type: 'text'}),
    defineField({name: 'body', title: 'Body copy', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'bullets',
      title: 'Bullets (trust icons / benefits list)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'ctaButtons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'href', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'outcomeStat'}]}],
    }),
    defineField({
      name: 'jobOpenings',
      title: 'Featured job openings',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'jobOpening'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'pageId'},
  },
})
