// Vercel Node.js serverless function (zero-config: web/api/* is picked up
// automatically once Vercel's project root is set to web/). Kept as a plain
// Vercel function, not an Astro endpoint, so it works regardless of Astro's
// `output: 'static'` setting.
//
// Writes leads straight into Sanity as `contactSubmission` documents —
// visible in Studio immediately. Replaces the WordPress form that was
// refusing all submissions ("This contact form is deactivated because you
// refused to accept Google reCaptcha service"). No CAPTCHA here either
// (that refusal was intentional), just a honeypot field.
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN // server-only, never PUBLIC_/exposed to the client

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'})
    return
  }

  if (!projectId || !token) {
    console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN env vars on Vercel.')
    res.status(500).json({error: 'Form is not configured yet.'})
    return
  }

  const body = req.body || {}
  const {submissionType, name, email, phone, state, message, website} = body

  // Honeypot: real users never fill in a field named "website".
  if (website) {
    res.status(200).json({ok: true})
    return
  }

  if (!['district', 'candidate'].includes(submissionType)) {
    res.status(400).json({error: 'Missing or invalid submissionType.'})
    return
  }
  if (!name || !email || !EMAIL_RE.test(email)) {
    res.status(400).json({error: 'Name and a valid email are required.'})
    return
  }

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

  try {
    await client.create({
      _type: 'contactSubmission',
      submissionType,
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 50) : undefined,
      state: state ? String(state).slice(0, 50) : undefined,
      message: message ? String(message).slice(0, 5000) : undefined,
      submittedAt: new Date().toISOString(),
    })
    res.status(200).json({ok: true})
  } catch (err) {
    console.error('Failed to write contact submission to Sanity:', err)
    res.status(500).json({error: 'Something went wrong submitting the form. Please try again.'})
  }
}
