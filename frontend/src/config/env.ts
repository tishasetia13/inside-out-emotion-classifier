// Environment variables are settings that live outside the code, so the same build can
// behave differently in different places (your laptop vs. the live site). Vite copies
// any variable starting with VITE_ from the .env file into `import.meta.env` at build time.

const DEFAULT_API_BASE_URL = 'https://tishasetia13-inside-out-api.hf.space'

// Base URL of the emotion API, with any trailing slash removed.
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/+$/, '')

// Which fake-response behavior mock mode should use.
//   normal: a believable result after a short delay
//   slow:   same, but after a long delay (to see the cold-start message)
//   error:  fails with a server error (to see the error state)
export type MockMode = 'normal' | 'slow' | 'error'

// Decides whether mock mode is on. The ?mock= URL parameter wins over the
// VITE_USE_MOCK environment variable, so you can flip it without rebuilding.
// ?mock=0 forces real calls even if the environment variable says otherwise.
export function resolveMockMode(search: string, envFlag?: string): MockMode | null {
  const param = new URLSearchParams(search).get('mock')
  if (param === 'slow' || param === 'error') return param
  if (param === '1' || param === 'true') return 'normal'
  if (param === '0' || param === 'false') return null
  return envFlag?.trim().toLowerCase() === 'true' ? 'normal' : null
}
