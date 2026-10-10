import { EMOTIONS, type EmotionScores, type PredictRequest } from '../types/emotion'
import { ApiError } from './errors'

// How long we wait before giving up. Generous, because a sleeping free server
// can take up to a minute to wake on the first request.
export const DEFAULT_TIMEOUT_MS = 60_000

export interface PredictOptions {
  // Base URL of the API, e.g. "https://example.hf.space".
  baseUrl: string
  // Lets the caller cancel the request (for example when a newer one starts).
  signal?: AbortSignal
  timeoutMs?: number
}

// Checks that unknown JSON really has the shape { emotions: { anger: number, ... } }.
// Data from the network is untrusted, so we verify it instead of just assuming.
function parseScores(data: unknown): EmotionScores {
  const emotions = (data as { emotions?: Record<string, unknown> } | null)?.emotions
  const scores: Partial<EmotionScores> = {}
  for (const emotion of EMOTIONS) {
    const value = emotions?.[emotion]
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new ApiError('unexpected', `Response is missing a number for "${emotion}".`)
    }
    scores[emotion] = value
  }
  return scores as EmotionScores
}

// Calls POST /predict and returns the five emotion percentages.
// `async` functions return a Promise: a value that arrives later. `await` pauses this
// function until the Promise settles, while the rest of the page keeps running.
export async function predictEmotions(
  text: string,
  { baseUrl, signal, timeoutMs = DEFAULT_TIMEOUT_MS }: PredictOptions,
): Promise<EmotionScores> {
  // An AbortController is the browser's "stop button" for a fetch request.
  const controller = new AbortController()
  let timedOut = false

  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)
  const cancel = () => controller.abort()
  if (signal?.aborted) cancel()
  signal?.addEventListener('abort', cancel)

  try {
    const body: PredictRequest = { text }
    let response: Response
    try {
      response = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      })
    } catch (error) {
      if (timedOut) throw new ApiError('timeout', 'The request timed out.')
      if (controller.signal.aborted) throw new ApiError('cancelled', 'Request cancelled.')
      // Browsers hide the exact reason a fetch failed. A blocked cross-origin
      // request (CORS) looks identical to being offline, so we leave a hint.
      console.warn(
        'The request to the API failed before any response arrived. If you are online, ' +
          'this is often CORS: browsers only allow a page to call another website if ' +
          'that site sends an "Access-Control-Allow-Origin" header. Add CORS support to ' +
          'the backend, or use mock mode (?mock=1) meanwhile.',
        error,
      )
      throw new ApiError('network', 'Could not reach the server.')
    }

    if (response.status === 422) {
      throw new ApiError('validation', 'The API rejected the text.')
    }
    if (response.status >= 500) {
      throw new ApiError('server', `Server error (${response.status}).`)
    }
    if (!response.ok) {
      throw new ApiError('unexpected', `Unexpected status ${response.status}.`)
    }

    try {
      const data: unknown = await response.json()
      return parseScores(data)
    } catch (error) {
      if (error instanceof ApiError) throw error
      if (timedOut) throw new ApiError('timeout', 'The request timed out.')
      if (controller.signal.aborted) throw new ApiError('cancelled', 'Request cancelled.')
      throw new ApiError('unexpected', 'The response was not valid JSON.')
    }
  } finally {
    // Always clean up, whether the request succeeded or failed.
    clearTimeout(timer)
    signal?.removeEventListener('abort', cancel)
  }
}
