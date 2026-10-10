import type { Phase } from '../hooks/analysisReducer'
import { ERROR_MESSAGES, LOADING_MESSAGE, SLOW_MESSAGE } from '../data/messages'
import './AnalysisStatus.css'

interface AnalysisStatusProps {
  phase: Phase
  onRetry: () => void
}

// Tells the user what is happening: analyzing, waking the server, or what went wrong.
// The wrapper is an "aria-live" region, so screen readers announce changes inside it.
export function AnalysisStatus({ phase, onRetry }: AnalysisStatusProps) {
  return (
    <div className="status" aria-live="polite">
      {phase.status === 'loading' && (
        <div role="status">
          <p className="status__title">{LOADING_MESSAGE}</p>
          {phase.slow && <p className="status__detail">{SLOW_MESSAGE}</p>}
        </div>
      )}
      {phase.status === 'error' && phase.error.kind !== 'cancelled' && (
        <div className="status__error" role="alert">
          <p className="status__title">Couldn't analyze that story</p>
          <p className="status__detail">{ERROR_MESSAGES[phase.error.kind]}</p>
          <button type="button" className="status__retry" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
