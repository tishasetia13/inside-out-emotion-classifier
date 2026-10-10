import { EMOTIONS, type Emotion, type EmotionScores } from '../types/emotion'

// If the top two emotions are closer than this many percentage points, we call it a tie.
export const TIE_MARGIN = 5

export interface RankedEmotion {
  emotion: Emotion
  percent: number
}

export interface ResultSummary {
  top: RankedEmotion
  second: RankedEmotion
  // True when the top two are too close to name a single winner.
  isTie: boolean
}

// Sorts emotions from highest to lowest percentage.
export function rankEmotions(scores: EmotionScores): RankedEmotion[] {
  return EMOTIONS.map((emotion) => ({ emotion, percent: scores[emotion] })).sort(
    (a, b) => b.percent - a.percent,
  )
}

// Finds the leading emotion and whether it is a clear win or a near tie.
export function summarizeScores(scores: EmotionScores): ResultSummary {
  const [top, second] = rankEmotions(scores)
  return { top, second, isTie: top.percent - second.percent < TIE_MARGIN }
}

// Formats a percentage for display, e.g. 62.437 -> "62.4%".
export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`
}
