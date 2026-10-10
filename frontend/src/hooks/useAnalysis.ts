import { useCallback, useEffect, useReducer, useRef } from 'react'
import { analyzeStory } from '../api/analyzeStory'
import { ApiError } from '../api/errors'
import { analysisReducer, initialState } from './analysisReducer'

// After this long without an answer we assume the server is waking up and say so.
const SLOW_AFTER_MS = 4000

// A "hook" is a function starting with `use` that lets a component remember things
// (state) and react to lifecycle events (effects). This one owns everything about
// running an analysis, so components only have to display the result.
export function useAnalysis() {
  // useReducer = state + the rules for changing it. React re-renders when it changes.
  const [state, dispatch] = useReducer(analysisReducer, initialState)

  // useRef keeps a value between renders WITHOUT triggering a re-render when it changes.
  const controllerRef = useRef<AbortController | null>(null)
  const slowTimerRef = useRef<number | undefined>(undefined)

  // Starts an analysis. useCallback keeps the function identity stable between renders.
  const analyze = useCallback(async (text: string) => {
    // Cancel any request still in flight before starting a new one.
    controllerRef.current?.abort()
    window.clearTimeout(slowTimerRef.current)

    const controller = new AbortController()
    controllerRef.current = controller

    dispatch({ type: 'started' })
    slowTimerRef.current = window.setTimeout(
      () => dispatch({ type: 'slow' }),
      SLOW_AFTER_MS,
    )

    try {
      const scores = await analyzeStory(text.trim(), controller.signal)
      if (!controller.signal.aborted) dispatch({ type: 'succeeded', scores })
    } catch (error) {
      if (controller.signal.aborted) return
      const apiError =
        error instanceof ApiError ? error : new ApiError('unexpected', String(error))
      dispatch({ type: 'failed', error: apiError })
    } finally {
      if (controllerRef.current === controller) window.clearTimeout(slowTimerRef.current)
    }
  }, [])

  // An effect runs code at specific moments. Returning a function makes React call it on
  // cleanup: here, when the component disappears, we cancel the request and the timer.
  useEffect(() => {
    return () => {
      controllerRef.current?.abort()
      window.clearTimeout(slowTimerRef.current)
    }
  }, [])

  return { ...state, analyze }
}
