// Newsletter signup, same pattern as web/api/contact.js: plain Vercel
// serverless function, writes into Sanity as a newsletterSubscriber
// document (visible in Studio), honeypot instead of a CAPTCHA.
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'})
    return
  }

  if (!projectId || !token) {
    console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN env vars on Vercel.')
    res.status(500).json({error: 'Newsletter signup is not configured yet.'})
    return
  }

  const {email, website} = req.body || {}

  // Honeypot: real users never fill in a field named "website".
  if (website) {
    res.status(200).json({ok: true})
    return
  }

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({error: 'A valid email is required.'})
    return
  }

  const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

  try {
    await client.create({
      _type: 'newsletterSubscriber',
      email: String(email).slice(0, 200),
      subscribedAt: new Date().toISOString(),
    })
    res.status(200).json({ok: true})
  } catch (err) {
    console.error('Failed to write newsletter subscriber to Sanity:', err)
    res.status(500).json({error: 'Something went wrong. Please try again.'})
  }
}
