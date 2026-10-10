import type { Emotion } from '../types/emotion'

// Display names for each emotion. Colors live in the CSS design tokens instead.
export const EMOTION_LABELS: Record<Emotion, string> = {
  anger: 'Anger',
  disgust: 'Disgust',
  fear: 'Fear',
  joy: 'Joy',
  sadness: 'Sadness',
}
