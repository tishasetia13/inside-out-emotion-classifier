// The five emotions the model knows, in the same order the API uses.
// `as const` makes TypeScript treat this as a fixed list of exact strings, not just string[].
export const EMOTIONS = ['anger', 'disgust', 'fear', 'joy', 'sadness'] as const

// A "union type": a value of type Emotion can only be one of the five strings above.
export type Emotion = (typeof EMOTIONS)[number]

// Percentages per emotion, e.g. { anger: 3.2, disgust: 1.1, ... }.
export type EmotionScores = Record<Emotion, number>

// JSON body we send to POST /predict.
export interface PredictRequest {
  text: string
}

// JSON body the API returns on success (HTTP 200).
export interface PredictResponse {
  emotions: EmotionScores
}
