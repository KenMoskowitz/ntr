export const structure = (S: any) =>
  S.list()
    .title('NTR Link Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.divider(),
      S.documentTypeListItem('contactSubmission').title('Contact Form Submissions'),
      S.divider(),
      S.documentTypeListItem('servicePage').title('Service Pages'),
      S.documentTypeListItem('stateServicePage').title('State Service Pages (buyers)'),
      S.documentTypeListItem('stateJobPage').title('State Job Pages (candidates)'),
      S.documentTypeListItem('jobOpening').title('Job Openings'),
      S.documentTypeListItem('resourcePost').title('Resource Posts'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('outcomeStat').title('Outcome Stats'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) =>
          ![
            'siteSettings',
            'navigation',
            'contactSubmission',
            'servicePage',
            'stateServicePage',
            'stateJobPage',
            'jobOpening',
            'resourcePost',
            'testimonial',
            'outcomeStat',
          ].includes(item.getId()),
      ),
    ])
