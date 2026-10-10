/// <reference types="vite/client" />

// Tells TypeScript which environment variables exist, so typos become compile errors.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_USE_MOCK?: string
}
