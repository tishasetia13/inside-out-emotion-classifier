import { MAX_CHARS, type CounterState } from '../lib/charCount'
import './CharCounter.css'

const nf = new Intl.NumberFormat('en-US')

// What a screen reader should hear when the counter changes level.
// (Announcing every keystroke would be noise, so only level changes are announced.)
function announcement({ level, remaining }: CounterState): string {
  if (level === 'over') return `${nf.format(-remaining)} characters over the limit.`
  if (level === 'warning') return `${nf.format(remaining)} characters left.`
  return ''
}

// Shows "current / 5,000", with extra emphasis near and over the limit.
export function CharCounter({ id, state }: { id: string; state: CounterState }) {
  return (
    <p id={id} className={`counter counter--${state.level}`}>
      {nf.format(state.count)} / {nf.format(MAX_CHARS)}
      {state.level === 'over' && ` · ${nf.format(-state.remaining)} over`}
      {state.level === 'warning' && ` · ${nf.format(state.remaining)} left`}
      <span className="visually-hidden" role="status">
        {announcement(state)}
      </span>
    </p>
  )
}
