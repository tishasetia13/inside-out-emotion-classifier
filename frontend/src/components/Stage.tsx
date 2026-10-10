import { useEffect, useRef } from 'react'
import type { Phase } from '../hooks/analysisReducer'
import { EMOTION_LABELS } from '../data/emotions'
import { IDLE_MESSAGE } from '../data/messages'
import { layoutStage } from '../lib/layout'
import { summarizeScores, type ResultSummary } from '../lib/results'
import type { EmotionScores } from '../types/emotion'
import { AboutModel } from './AboutModel'
import { AnalysisStatus } from './AnalysisStatus'
import { Cast } from './Cast'
import { RankedList } from './RankedList'
import './Stage.css'

interface StageProps {
  scores: EmotionScores | null
  resultId: number
  phase: Phase
  onRetry: () => void
}

// One calm line describing the result, including the near-tie case.
function describe(summary: ResultSummary): string {
  const top = EMOTION_LABELS[summary.top.emotion]
  const second = EMOTION_LABELS[summary.second.emotion].toLowerCase()
  if (summary.isTie) return `${top} and ${second} are nearly tied.`
  return `Mostly ${top.toLowerCase()} (${Math.round(summary.top.percent)}%).`
}

// The hero of the page: the status line, the characters, the ranked list and the
// About note. It shows an invitation before any result, so it never looks empty.
export function Stage({ scores, resultId, phase, onRetry }: StageProps) {
  const lineRef = useRef<HTMLParagraphElement>(null)
  const isBusy = phase.status === 'loading' || phase.status === 'error'
  const state = phase.status === 'loading' ? 'loading' : scores ? 'ready' : 'idle'

  // Focus management: when a new result arrives, move keyboard focus to the result line.
  // The browser also scrolls it into view, which matters on phones, where the stage sits
  // below the form. Screen readers then read the result straight away.
  useEffect(() => {
    if (resultId > 0) lineRef.current?.focus()
  }, [resultId])

  const line = scores ? describe(summarizeScores(scores)) : IDLE_MESSAGE

  return (
    <section className="stage" data-state={state} aria-label="Result">
      <div className="stage__head">
        {isBusy ? (
          <AnalysisStatus phase={phase} onRetry={onRetry} />
        ) : (
          <p className="stage__line" tabIndex={-1} ref={lineRef} aria-live="polite">
            {line}
          </p>
        )}
      </div>
      <Cast items={layoutStage(scores)} />
      <RankedList scores={scores} />
      <AboutModel />
    </section>
  )
}
