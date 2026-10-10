import type { ApiError } from '../api/errors'
import type { EmotionScores } from '../types/emotion'

// The request can be in exactly one of these phases at a time. Because each phase is
// its own object shape, impossible combinations (like "loading AND error") cannot exist.
export type Phase =
  | { status: 'idle' }
  | { status: 'loading'; slow: boolean }
  | { status: 'success' }
  | { status: 'error'; error: ApiError }

export interface AnalysisState {
  phase: Phase
  // The most recent successful result. It stays on screen while a new request runs,
  // so the characters can animate smoothly from the old sizes to the new ones.
  scores: EmotionScores | null
  // Increases with every success; used to replay the "result arrived" animation.
  resultId: number
}

export type AnalysisAction =
  | { type: 'started' }
  | { type: 'slow' }
  | { type: 'succeeded'; scores: EmotionScores }
  | { type: 'failed'; error: ApiError }

export const initialState: AnalysisState = {
  phase: { status: 'idle' },
  scores: null,
  resultId: 0,
}

// A reducer is a function (currentState, action) => newState. It is the single place
// that decides how the state may change, which keeps the logic easy to follow and test.
export function analysisReducer(
  state: AnalysisState,
  action: AnalysisAction,
): AnalysisState {
  switch (action.type) {
    case 'started':
      return { ...state, phase: { status: 'loading', slow: false } }
    case 'slow':
      // Ignore a late "slow" signal if the request already finished.
      return state.phase.status === 'loading'
        ? { ...state, phase: { status: 'loading', slow: true } }
        : state
    case 'succeeded':
      return {
        phase: { status: 'success' },
        scores: action.scores,
        resultId: state.resultId + 1,
      }
    case 'failed':
      return { ...state, phase: { status: 'error', error: action.error } }
  }
}
