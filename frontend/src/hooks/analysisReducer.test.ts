import { describe, expect, it } from 'vitest'
import { ApiError } from '../api/errors'
import { EXAMPLE_STORIES } from '../data/examples'
import { analysisReducer, initialState } from './analysisReducer'

const scores = EXAMPLE_STORIES[1].scores

describe('analysisReducer', () => {
  it('moves idle -> loading -> success and keeps the result', () => {
    const loading = analysisReducer(initialState, { type: 'started' })
    expect(loading.phase).toEqual({ status: 'loading', slow: false })

    const done = analysisReducer(loading, { type: 'succeeded', scores })
    expect(done.phase.status).toBe('success')
    expect(done.scores).toBe(scores)
    expect(done.resultId).toBe(1)
  })

  it('flags a slow request only while loading', () => {
    const loading = analysisReducer(initialState, { type: 'started' })
    expect(analysisReducer(loading, { type: 'slow' }).phase).toEqual({
      status: 'loading',
      slow: true,
    })
    const done = analysisReducer(loading, { type: 'succeeded', scores })
    expect(analysisReducer(done, { type: 'slow' })).toBe(done)
  })

  it('keeps the previous result visible when a later request fails', () => {
    const done = analysisReducer(initialState, { type: 'succeeded', scores })
    const failed = analysisReducer(done, {
      type: 'failed',
      error: new ApiError('network', 'x'),
    })
    expect(failed.phase.status).toBe('error')
    expect(failed.scores).toBe(scores)
  })
})
