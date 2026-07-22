import {defineCliConfig} from 'sanity/cli'

// TODO (manual step, needs a real Sanity account): replace projectId below with
// the real project ID from sanity.io/manage after running `npx sanity init`
// in this folder. See README.md "Sanity setup" for the full walkthrough.
export default defineCliConfig({
  api: {
    projectId: 'placeholder-project',
    dataset: 'production',
  },
  studioHost: 'ntrlink', // -> https://ntrlink.sanity.studio (confirm available, or pick another slug)
})
