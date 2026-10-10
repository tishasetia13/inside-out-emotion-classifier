import type { EmotionScores } from '../types/emotion'

export interface ExampleStory {
  id: string
  title: string
  text: string
  // Believable predictions that mock mode returns for this exact story.
  scores: EmotionScores
}

// Sample stories shown as clickable chips. They double as mock data.
export const EXAMPLE_STORIES: ExampleStory[] = [
  {
    id: 'good-call',
    title: 'A good call',
    text: "I got the call that I'd been accepted into the program I wanted for years, and I couldn't stop smiling for the rest of the day.",
    scores: { anger: 1.4, disgust: 0.9, fear: 3.1, joy: 91.2, sadness: 3.4 },
  },
  {
    id: 'quiet-apartment',
    title: 'The quiet apartment',
    text: 'My best friend moved to another country last week, and the apartment felt unbearably quiet when I got home.',
    scores: { anger: 4.8, disgust: 2.1, fear: 9.6, joy: 4.5, sadness: 79.0 },
  },
  {
    id: 'line-cutter',
    title: 'Cut in line',
    text: 'Someone shoved past me to cut in line, and then blamed me for it in front of everyone.',
    scores: { anger: 62.3, disgust: 28.4, fear: 1.7, joy: 1.1, sadness: 6.5 },
  },
  {
    id: 'footsteps',
    title: 'Late-night footsteps',
    text: 'I heard footsteps behind me on the empty street at night, and my heart started pounding.',
    scores: { anger: 3.6, disgust: 1.8, fear: 86.4, joy: 1.5, sadness: 6.7 },
  },
  {
    id: 'leftovers',
    title: 'Forgotten leftovers',
    text: 'I opened the fridge and found the leftovers had grown mold, and the smell made me gag.',
    scores: { anger: 9.2, disgust: 74.6, fear: 5.3, joy: 2.4, sadness: 8.5 },
  },
]
