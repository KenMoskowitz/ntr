import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', type: 'string', initialValue: 'NTR Link'}),
    defineField({name: 'legalName', type: 'string', initialValue: 'National TeleTherapy Resources'}),
    defineField({name: 'domain', type: 'string', initialValue: 'https://ntrlink.com'}),
    defineField({name: 'phone', type: 'string', initialValue: '844-687-5465'}),
    defineField({name: 'email', type: 'string', initialValue: 'info@ntrlink.com'}),
    defineField({name: 'foundedYear', type: 'number', initialValue: 2015}),
    defineField({name: 'logo', type: 'image'}),
    defineField({name: 'facebookUrl', type: 'url'}),
    defineField({name: 'instagramUrl', type: 'url'}),
    defineField({name: 'linkedinUrl', type: 'url'}),
    defineField({
      name: 'analytics',
      title: 'Analytics IDs',
      type: 'object',
      description: 'Leave blank until confirmed from the WordPress admin (see SEO Preservation Checklist).',
      fields: [
        {name: 'gtmContainerId', type: 'string', title: 'GTM Container ID'},
        {name: 'ga4MeasurementId', type: 'string', title: 'GA4 Measurement ID'},
        {name: 'metaPixelId', type: 'string', title: 'Meta Pixel ID'},
      ],
    }),
  ],
})
