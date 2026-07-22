// Idempotent seed script. Reads SANITY_TOKEN (Editor robot token) from .env.
// Run with: npm run seed  (from studio/)
//
// Deliberately does NOT fabricate testimonials or outcome stats — the master
// plan flags both as real content gaps ("Anonymous NTR Therapist" everywhere,
// zero numbers on the results page). Inventing named quotes or stats here
// would put false claims on a live business site. Those two documents stay
// empty until the client supplies real names/numbers (see README TODOs).

import 'dotenv/config'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_TOKEN

if (!projectId || !token) {
  console.error(
    'Missing SANITY_STUDIO_PROJECT_ID or SANITY_TOKEN. Copy .env.example to .env and fill both in first.',
  )
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

async function run() {
  const docs = [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'NTR Link',
      legalName: 'National TeleTherapy Resources',
      domain: 'https://ntrlink.com',
      phone: '844-687-5465',
      email: 'info@ntrlink.com',
      foundedYear: 2015,
      facebookUrl: 'https://www.facebook.com/nationalteletherapyresources',
      instagramUrl: 'https://www.instagram.com/ntrlink/',
      linkedinUrl: 'https://www.linkedin.com/company/national-teletherapy-resources/',
      analytics: {gtmContainerId: '', ga4MeasurementId: '', metaPixelId: ''},
    },
    {
      _id: 'navigation',
      _type: 'navigation',
      headerLinks: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Team & Culture', href: '/team'},
        {label: 'Careers', href: '/careers'},
        {label: 'Contact', href: '/contact'},
      ],
      footerLinks: [
        {label: 'Home', href: '/'},
        {label: 'About', href: '/about'},
        {label: 'Services', href: '/services'},
        {label: 'Careers', href: '/careers'},
        {label: 'Contact', href: '/contact'},
        {label: 'Privacy Policy', href: '/privacy-policy'},
      ],
    },
    {
      _id: 'page-home',
      _type: 'page',
      pageId: 'home',
      title: 'Home',
      slug: {_type: 'slug', current: 'home'},
      metaTitle: 'NTR Link | Virtual Speech & OT Services for Schools',
      metaDescription:
        'NTR Link places licensed speech and occupational therapists into school districts nationwide. Solve staffing shortages with a team that shows up.',
      heroHeadline: 'Speech and OT Solutions, Anywhere Your Students Are',
      heroSubhead:
        "Special education directors don't lose sleep over paperwork. They lose sleep over the open SLP position nobody's filled since August. NTR Link exists to close that gap, fast, with real licensed therapists who show up the same way every week.\n\nSince 2015, we've grown from one therapist's idea to a nationwide team supporting schools in nearly every related service area. We're therapist owned, therapist run, and small enough that you get one person to call instead of a ticket number.",
      bullets: [
        'Therapist owned and operated',
        'One point of contact, not a call center',
        'State and nationally licensed providers',
      ],
      ctaButtons: [
        {label: 'Work with us', href: '/contact'},
        {label: 'Work for us', href: '/careers'},
      ],
    },
    {
      _id: 'page-about',
      _type: 'page',
      pageId: 'about',
      title: 'About',
      slug: {_type: 'slug', current: 'about'},
      metaTitle: 'About NTR Link | Therapist Owned Teletherapy Staffing',
      metaDescription:
        'NTR Link is a therapist-owned teletherapy staffing company placing licensed SLPs and OTs into public school districts nationwide since 2015.',
      heroHeadline: 'A Therapist Started This Company Because She Saw the Gap Firsthand',
      body: [],
    },
    {
      _id: 'page-team',
      _type: 'page',
      pageId: 'team',
      title: 'Team & Culture',
      slug: {_type: 'slug', current: 'team'},
      metaTitle: 'Team & Culture | NTR Link',
      metaDescription: 'Meet the therapists and staff behind NTR Link.',
      heroHeadline: 'The People Who Show Up Every Week',
      testimonials: [],
    },
    {
      _id: 'page-services-index',
      _type: 'page',
      pageId: 'services-index',
      title: 'Services',
      slug: {_type: 'slug', current: 'services'},
      metaTitle: 'Our Services | NTR Link Virtual School Therapy',
      metaDescription:
        "Explore NTR Link's virtual speech-language and occupational therapy programs built for public school districts.",
      heroHeadline: 'Two Services. One Team. Zero Guesswork.',
      heroSubhead:
        "Two ways we show up for your students: Speech-Language Therapy and Occupational Therapy, both delivered virtually, both built around your district's actual schedule.",
    },
    {
      _id: 'page-careers',
      _type: 'page',
      pageId: 'careers',
      title: 'Careers',
      slug: {_type: 'slug', current: 'careers'},
      metaTitle: 'Careers | Virtual SLP & OT Jobs | NTR Link',
      metaDescription:
        "Remote speech-language pathologist and occupational therapist jobs with NTR Link. Licensed in your state? We're hiring.",
      heroHeadline: "Work From Home. Still Change a Kid's Whole Year.",
      jobOpenings: [
        {_type: 'reference', _ref: 'jobOpening-california-slp'},
        {_type: 'reference', _ref: 'jobOpening-tennessee-slp'},
      ],
    },
    {
      _id: 'page-contact',
      _type: 'page',
      pageId: 'contact',
      title: 'Contact',
      slug: {_type: 'slug', current: 'contact'},
      metaTitle: 'Contact NTR Link | Request Services or Apply',
      metaDescription:
        'Reach NTR Link to request teletherapy services for your school district or to apply for a virtual SLP or OT position.',
      heroHeadline: 'Two Doors In. Pick Yours.',
    },
    {
      _id: 'page-results',
      _type: 'page',
      pageId: 'results',
      title: 'Results',
      slug: {_type: 'slug', current: 'results'},
      metaTitle: 'Results | Student Outcomes with NTR Link',
      metaDescription:
        "See the real numbers behind NTR Link's virtual therapy programs, from IEP goal progress to therapist retention.",
      heroHeadline: 'The Numbers Behind the Claim',
      stats: [],
    },
    {
      _id: 'page-resources-index',
      _type: 'page',
      pageId: 'resources-index',
      title: 'Resources',
      slug: {_type: 'slug', current: 'resources'},
      metaTitle: 'Resources | NTR Link',
      metaDescription:
        'Guides on teletherapy, IEP compliance, and Medicaid billing for special education administrators.',
      heroHeadline: 'Answers for the Research Before the Call',
    },
    {
      _id: 'page-privacy-policy',
      _type: 'page',
      pageId: 'privacy-policy',
      title: 'Privacy Policy',
      slug: {_type: 'slug', current: 'privacy-policy'},
      metaTitle: 'Privacy Policy | NTR Link',
      metaDescription: 'NTR Link privacy policy.',
      heroHeadline: 'Privacy Policy',
      body: [],
    },
    {
      _id: 'servicePage-speech-therapy',
      _type: 'servicePage',
      title: 'Speech-Language Therapy',
      slug: {_type: 'slug', current: 'speech-therapy'},
      metaTitle: 'Virtual Speech-Language Therapy for Schools | NTR Link',
      metaDescription:
        'Licensed SLPs delivering virtual speech-language therapy to public school students, with real-time progress data for IEP teams.',
      heroHeadline: 'Virtual Speech-Language Therapy That Keeps Up With Your Caseload',
      heroSubhead:
        'Language, articulation, fluency, social communication, AAC — delivered virtually by licensed SLPs who stay with your district week after week.',
      faqs: [
        {question: 'How fast can NTR place a speech therapist in an open position?', answer: ''},
        {question: 'Does virtual speech therapy count for IEP compliance?', answer: ''},
        {question: 'Who documents Medicaid billing for teletherapy sessions?', answer: ''},
        {question: 'What happens if our assigned therapist is out sick?', answer: ''},
        {question: 'Can therapists attend IEP meetings virtually?', answer: ''},
      ],
    },
    {
      _id: 'servicePage-occupational-therapy',
      _type: 'servicePage',
      title: 'Occupational Therapy',
      slug: {_type: 'slug', current: 'occupational-therapy'},
      metaTitle: 'Virtual Occupational Therapy for Schools | NTR Link',
      metaDescription:
        'Licensed OTs delivering virtual occupational therapy to public school students, with real-time progress data for IEP teams.',
      heroHeadline: 'Virtual Occupational Therapy Built Around Your Caseload',
      heroSubhead:
        'Fine motor, visual-motor integration, sensory processing, executive functioning — delivered virtually by licensed OTs who stay with your district week after week.',
      faqs: [
        {question: 'How fast can NTR place an occupational therapist in an open position?', answer: ''},
        {question: 'Does virtual OT count for IEP compliance?', answer: ''},
        {question: 'Who documents Medicaid billing for teletherapy sessions?', answer: ''},
        {question: 'What happens if our assigned therapist is out sick?', answer: ''},
        {question: 'Can therapists attend IEP meetings virtually?', answer: ''},
      ],
    },
    {
      _id: 'jobOpening-california-slp',
      _type: 'jobOpening',
      title: 'California Licensed Speech-Language Pathologist',
      state: 'California',
      employmentType: 'PART_TIME',
      description: 'Remote teletherapy SLP role serving California public school districts. Update with real req details before launch.',
      datePosted: '2026-07-01',
      validThrough: '2026-09-01',
    },
    {
      _id: 'jobOpening-tennessee-slp',
      _type: 'jobOpening',
      title: 'Tennessee Licensed Speech-Language Pathologist',
      state: 'Tennessee',
      employmentType: 'PART_TIME',
      description: 'Remote teletherapy SLP role serving Tennessee public school districts. Update with real req details before launch.',
      datePosted: '2026-07-01',
      validThrough: '2026-09-01',
    },
    {
      _id: 'stateJobPage-california',
      _type: 'stateJobPage',
      stateName: 'California',
      slug: {_type: 'slug', current: 'california'},
      metaTitle: 'California Speech & OT Jobs | Remote | NTR Link',
      metaDescription: 'Licensed in California? NTR Link is hiring remote speech-language pathologists and occupational therapists for public schools.',
      licenseNote: 'Requires active California licensure (SLP: California Speech-Language Pathology and Audiology and Hearing Aid Dispensers Board; OT: California Board of Occupational Therapy).',
      intro: "California Licensed? We're Hiring.",
      openRoles: [{_type: 'reference', _ref: 'jobOpening-california-slp'}],
    },
    {
      _id: 'stateJobPage-tennessee',
      _type: 'stateJobPage',
      stateName: 'Tennessee',
      slug: {_type: 'slug', current: 'tennessee'},
      metaTitle: 'Tennessee Speech & OT Jobs | Remote | NTR Link',
      metaDescription: 'Licensed in Tennessee? NTR Link is hiring remote speech-language pathologists and occupational therapists for public schools.',
      licenseNote: 'Requires active Tennessee licensure (SLP/Audiology Licensing Board; OT: Board of Occupational Therapy).',
      intro: "Tennessee Licensed? We're Hiring.",
      openRoles: [{_type: 'reference', _ref: 'jobOpening-tennessee-slp'}],
    },
    {
      _id: 'stateServicePage-california',
      _type: 'stateServicePage',
      stateName: 'California',
      slug: {_type: 'slug', current: 'california'},
      metaTitle: 'Virtual Speech & OT Services for California Schools | NTR Link',
      metaDescription: 'NTR Link places licensed SLPs and OTs into California school districts, with state-specific Medicaid billing and licensure support.',
      intro: 'Virtual therapy staffing for California school districts, built around California licensure and Medi-Cal billing requirements.',
      fundingNotes: '',
      medicaidNotes: '',
    },
    {
      _id: 'stateServicePage-tennessee',
      _type: 'stateServicePage',
      stateName: 'Tennessee',
      slug: {_type: 'slug', current: 'tennessee'},
      metaTitle: 'Virtual Speech & OT Services for Tennessee Schools | NTR Link',
      metaDescription: 'NTR Link places licensed SLPs and OTs into Tennessee school districts, with state-specific Medicaid billing and licensure support.',
      intro: 'Virtual therapy staffing for Tennessee school districts, built around Tennessee licensure and TennCare billing requirements.',
      fundingNotes: '',
      medicaidNotes: '',
    },
    {
      _id: 'resourcePost-what-is-teletherapy',
      _type: 'resourcePost',
      title: 'What Is Teletherapy? A Guide for Special Education Administrators',
      slug: {_type: 'slug', current: 'what-is-teletherapy'},
      metaDescription: 'A plain-language guide to virtual speech and OT therapy for district administrators evaluating teletherapy providers.',
      publishDate: '2026-07-22',
      body: [],
      relatedServiceSlugs: ['speech-therapy', 'occupational-therapy'],
    },
    {
      _id: 'resourcePost-slp-shortage',
      _type: 'resourcePost',
      title: 'How Virtual Speech Therapy Solves the SLP Shortage',
      slug: {_type: 'slug', current: 'virtual-speech-therapy-slp-shortage'},
      metaDescription: 'Why districts are turning to virtual SLPs to close staffing gaps that local hiring alone cannot fill.',
      publishDate: '2026-07-22',
      body: [],
      relatedServiceSlugs: ['speech-therapy'],
    },
    {
      _id: 'resourcePost-medicaid-billing',
      _type: 'resourcePost',
      title: 'Medicaid Billing Documentation for School-Based Teletherapy',
      slug: {_type: 'slug', current: 'medicaid-billing-documentation-teletherapy'},
      metaDescription: 'What districts need on file to bill Medicaid correctly for virtual speech and OT sessions.',
      publishDate: '2026-07-22',
      body: [],
      relatedServiceSlugs: ['speech-therapy', 'occupational-therapy'],
    },
    {
      _id: 'resourcePost-iep-compliance',
      _type: 'resourcePost',
      title: 'IEP Compliance Timelines: What Virtual Providers Need to Know',
      slug: {_type: 'slug', current: 'iep-compliance-timelines-virtual-providers'},
      metaDescription: 'How virtual therapy providers stay inside IEP compliance timelines and documentation requirements.',
      publishDate: '2026-07-22',
      body: [],
      relatedServiceSlugs: ['speech-therapy', 'occupational-therapy'],
    },
  ]

  for (const doc of docs) {
    await client.createOrReplace(doc as any)
    console.log(`upserted ${doc._id}`)
  }

  console.log(`\nDone. ${docs.length} documents seeded.`)
  console.log('NOTE: no testimonial or outcomeStat documents were seeded — see README TODOs.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
