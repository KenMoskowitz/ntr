import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Fallback project ID matches studio/sanity.cli.ts until the real project is
// created — see README "Sanity setup". Must be a valid-looking ID (a-z0-9-
// only) because @sanity/client validates the format in its constructor,
// before any network call — an invalid placeholder would break every build,
// not just fail gracefully at fetch time.
const PLACEHOLDER_PROJECT_ID = 'placeholder-project'
const projectId = import.meta.env.SANITY_PROJECT_ID || PLACEHOLDER_PROJECT_ID
const dataset = import.meta.env.SANITY_DATASET || 'production'
const isConfigured = projectId !== PLACEHOLDER_PROJECT_ID

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Wraps both client construction and the fetch itself — a Sanity outage, a
// bad query, or an unset/invalid project ID must never break `astro build`.
//
// Skips the network call entirely while SANITY_PROJECT_ID isn't set: with the
// placeholder project, @sanity/client's underlying request agent throws an
// unhandled socket error on connection failure (a lower-level issue outside
// this try/catch) instead of rejecting the fetch promise cleanly, which would
// crash the whole build. Once a real project ID is configured, real network
// failures fall through to the try/catch below as expected.
export async function sanityFetch<T = any>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isConfigured) return null
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch (err) {
    console.error('Sanity fetch failed, falling back to build-safe defaults:', err)
    return null
  }
}
