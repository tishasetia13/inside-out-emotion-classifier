import type { ApiErrorKind } from '../api/errors'

// All user-facing wording for failures lives here, so the tone stays consistent
// and no raw error text ever reaches the screen.
export const ERROR_MESSAGES: Record<Exclude<ApiErrorKind, 'cancelled'>, string> = {
  validation:
    'The story must be between 1 and 5,000 characters. Shorten it and try again.',
  network: "We couldn't reach the server. Check your connection and try again.",
  timeout:
    'The server took too long to respond. It may still be waking up, so try again.',
  server: 'The server returned an error. Try again in a moment.',
  unexpected: 'Something unexpected went wrong. Please try again.',
}

export const IDLE_MESSAGE = 'Five emotions are waiting to hear your story.'

export const LOADING_MESSAGE = 'Analyzing your story…'

export const SLOW_MESSAGE =
  'Waking up the server. The first request can take up to a minute.'
