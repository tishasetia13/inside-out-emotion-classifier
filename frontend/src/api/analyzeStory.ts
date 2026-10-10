import { API_BASE_URL, resolveMockMode } from '../config/env'
import type { EmotionScores } from '../types/emotion'
import { predictEmotions } from './client'
import { mockPredict } from './mock'

// The one function the UI calls to analyze a story. It hides whether the answer
// comes from the real API or from mock mode, so no component ever calls fetch itself.
export function analyzeStory(text: string, signal?: AbortSignal): Promise<EmotionScores> {
  const mockMode = resolveMockMode(window.location.search, import.meta.env.VITE_USE_MOCK)
  if (mockMode) return mockPredict(text, mockMode, signal)
  return predictEmotions(text, { baseUrl: API_BASE_URL, signal })
}
