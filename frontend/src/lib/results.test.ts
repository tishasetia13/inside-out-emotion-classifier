import { describe, expect, it } from 'vitest'
import { EXAMPLE_STORIES } from '../data/examples'
import { formatPercent, rankEmotions, summarizeScores } from './results'

describe('rankEmotions', () => {
  it('orders emotions from highest to lowest', () => {
    const ranked = rankEmotions(EXAMPLE_STORIES[0].scores)
    expect(ranked.map((r) => r.emotion)[0]).toBe('joy')
    expect(ranked[0].percent).toBeGreaterThanOrEqual(ranked[1].percent)
  })
})

describe('summarizeScores', () => {
  it('picks a clear winner when the gap is large', () => {
    const summary = summarizeScores(EXAMPLE_STORIES[3].scores)
    expect(summary.top.emotion).toBe('fear')
    expect(summary.isTie).toBe(false)
  })

  it('flags a near tie between the top two', () => {
    const summary = summarizeScores({
      anger: 5,
      disgust: 2,
      fear: 41,
      joy: 44,
      sadness: 8,
    })
    expect(summary.top.emotion).toBe('joy')
    expect(summary.second.emotion).toBe('fear')
    expect(summary.isTie).toBe(true)
  })
})

describe('formatPercent', () => {
  it('rounds to one decimal place', () => {
    expect(formatPercent(62.437)).toBe('62.4%')
  })
})
