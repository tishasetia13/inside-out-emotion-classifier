// Pure helpers for the story length counter. "Pure" means: same input, same output,
// no side effects, which makes them trivial to test.

export const MAX_CHARS = 5000

// The counter turns to a warning once the story is within this many characters of the limit.
export const WARN_REMAINING = 500

export type CounterLevel = 'ok' | 'warning' | 'over'

export interface CounterState {
  count: number
  remaining: number
  level: CounterLevel
}

// Counts characters the way the Python backend does (Unicode code points),
// so an emoji counts as 1 here, not 2 like JavaScript's .length would say.
export function countChars(text: string): number {
  return Array.from(text).length
}

// Summarizes how full the text box is, for display.
export function getCounterState(text: string): CounterState {
  const count = countChars(text)
  const remaining = MAX_CHARS - count
  const level: CounterLevel =
    remaining < 0 ? 'over' : remaining <= WARN_REMAINING ? 'warning' : 'ok'
  return { count, remaining, level }
}

// A story can be submitted only if it has real content and fits the API limit.
export function canSubmit(text: string): boolean {
  return text.trim().length > 0 && countChars(text) <= MAX_CHARS
}
