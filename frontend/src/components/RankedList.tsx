import type { CSSProperties } from 'react'
import { EMOTION_LABELS } from '../data/emotions'
import { formatPercent, rankEmotions } from '../lib/results'
import { EMOTIONS, type EmotionScores } from '../types/emotion'
import './RankedList.css'

// A plain ranked list: emotion name, a thin bar in its color, and the exact percentage.
// Before any result it shows the five emotions with empty bars.
export function RankedList({ scores }: { scores: EmotionScores | null }) {
  const rows = scores
    ? rankEmotions(scores)
    : EMOTIONS.map((emotion) => ({ emotion, percent: null }))

  return (
    <ol className="ranking" aria-label="Emotions ranked by strength">
      {rows.map(({ emotion, percent }) => (
        <li
          key={emotion}
          className="ranking__row"
          data-emotion={emotion}
          style={{ '--fill': percent === null ? 0 : percent / 100 } as CSSProperties}
        >
          <span className="ranking__name">{EMOTION_LABELS[emotion]}</span>
          <span className="ranking__bar" aria-hidden="true">
            <span className="ranking__fill" />
          </span>
          <span className="ranking__percent">
            {percent === null ? '—' : formatPercent(percent)}
          </span>
        </li>
      ))}
    </ol>
  )
}
