import { EXAMPLE_STORIES } from '../data/examples'
import type { MockMode } from '../config/env'
import { EMOTIONS, type Emotion, type EmotionScores } from '../types/emotion'
import { ApiError } from './errors'

const DELAYS_MS: Record<MockMode, number> = { normal: 1200, slow: 8000, error: 1200 }

// A few words that nudge the fake result toward an emotion, so typing your own
// story gives plausible-looking output.
const KEYWORDS: Record<Emotion, string[]> = {
  anger: ['angry', 'furious', 'shouted', 'unfair', 'blamed', 'rude', 'yelled'],
  disgust: ['gross', 'smell', 'mold', 'rotten', 'sick', 'filthy', 'disgusting'],
  fear: ['scared', 'afraid', 'dark', 'alone', 'footsteps', 'danger', 'panic'],
  joy: ['happy', 'smile', 'laughed', 'won', 'excited', 'love', 'celebrate'],
  sadness: ['sad', 'cried', 'lost', 'miss', 'died', 'lonely', 'goodbye'],
}

// Resolves after `ms` milliseconds, or rejects right away if the request is cancelled.
function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new ApiError('cancelled', 'Request cancelled.'))
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    const onAbort = () => {
      clearTimeout(timer)
      reject(new ApiError('cancelled', 'Request cancelled.'))
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

// Builds a fake result: the exact answer for example stories, otherwise a
// keyword-based guess scaled so the numbers add up to 100.
export function fakeScores(text: string): EmotionScores {
  const known = EXAMPLE_STORIES.find((story) => story.text === text.trim())
  if (known) return known.scores

  const lower = text.toLowerCase()
  const raw = {} as EmotionScores
  EMOTIONS.forEach((emotion, index) => {
    const hits = KEYWORDS[emotion].filter((word) => lower.includes(word)).length
    // The length-based term gives every story a stable, slightly different baseline.
    raw[emotion] = 1 + hits * 6 + ((text.length * (index + 3)) % 7)
  })
  const total = EMOTIONS.reduce((sum, emotion) => sum + raw[emotion], 0)
  const scores = {} as EmotionScores
  for (const emotion of EMOTIONS) {
    scores[emotion] = Math.round((raw[emotion] / total) * 10000) / 100
  }
  return scores
}

// Stands in for the real API: waits a moment, then returns fake percentages.
export async function mockPredict(
  text: string,
  mode: MockMode,
  signal?: AbortSignal,
): Promise<EmotionScores> {
  await wait(DELAYS_MS[mode], signal)
  if (mode === 'error') throw new ApiError('server', 'Mock server error.')
  return fakeScores(text)
}
