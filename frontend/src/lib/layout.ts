import { EMOTIONS, type Emotion, type EmotionScores } from '../types/emotion'
import { rankEmotions } from './results'
import { diameterForPercent, intensityForPercent, STANDBY_PERCENT } from './scaling'

// Space between neighboring characters, as a fraction of the stage width.
export const STAGE_GAP = 0.02

// Resting energy used for the idle animation before any result exists.
const IDLE_ENERGY = 0.3

export interface StageItem {
  emotion: Emotion
  // The returned percentage, or null before any result.
  percent: number | null
  // Horizontal start and width, both as fractions (0 to 1) of the stage width.
  left: number
  width: number
  // 0 to 1: how strongly the character animates.
  energy: number
}

// Works out where each character stands on the stage. Characters are sorted largest
// first, then laid out in one row whose widths are proportional to their diameters and
// which together fill the stage exactly. Before a result, all five are equal and in the
// API's order. Because this is a pure function, we can test the layout without a browser.
export function layoutStage(scores: EmotionScores | null): StageItem[] {
  const entries = scores
    ? rankEmotions(scores)
    : EMOTIONS.map((emotion) => ({ emotion, percent: null }))

  const diameters = entries.map(({ percent }) =>
    diameterForPercent(percent ?? STANDBY_PERCENT),
  )
  const total = diameters.reduce((sum, d) => sum + d, 0)
  const usable = 1 - STAGE_GAP * (entries.length - 1)

  let cursor = 0
  return entries.map(({ emotion, percent }, index) => {
    const width = (diameters[index] / total) * usable
    const item: StageItem = {
      emotion,
      percent,
      left: cursor,
      width,
      energy: percent === null ? IDLE_ENERGY : intensityForPercent(percent),
    }
    cursor += width + STAGE_GAP
    return item
  })
}
