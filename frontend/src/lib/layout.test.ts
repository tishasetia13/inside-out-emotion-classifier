import { describe, expect, it } from 'vitest'
import { EXAMPLE_STORIES } from '../data/examples'
import { EMOTIONS } from '../types/emotion'
import { STAGE_GAP, layoutStage } from './layout'

describe('layoutStage', () => {
  it('shows all five equal and in API order before any result', () => {
    const items = layoutStage(null)
    expect(items.map((i) => i.emotion)).toEqual([...EMOTIONS])
    expect(new Set(items.map((i) => i.width.toFixed(6))).size).toBe(1)
    expect(items.every((i) => i.percent === null)).toBe(true)
  })

  it('orders characters from largest to smallest', () => {
    const items = layoutStage(EXAMPLE_STORIES[3].scores)
    expect(items[0].emotion).toBe('fear')
    for (let i = 1; i < items.length; i++) {
      expect(items[i - 1].width).toBeGreaterThanOrEqual(items[i].width)
    }
  })

  it('keeps the API order when percentages are tied', () => {
    const items = layoutStage({ anger: 20, disgust: 20, fear: 20, joy: 20, sadness: 20 })
    expect(items.map((i) => i.emotion)).toEqual([...EMOTIONS])
  })

  it('fills the stage exactly, with no overlap', () => {
    const items = layoutStage(EXAMPLE_STORIES[0].scores)
    const last = items[items.length - 1]
    expect(items[0].left).toBe(0)
    expect(last.left + last.width).toBeCloseTo(1)
    for (let i = 1; i < items.length; i++) {
      const previous = items[i - 1]
      expect(items[i].left).toBeCloseTo(previous.left + previous.width + STAGE_GAP)
    }
  })

  it('gives a dominant emotion far more room than a tiny one', () => {
    const items = layoutStage({
      anger: 0.2,
      disgust: 0.4,
      fear: 0.6,
      joy: 98.2,
      sadness: 0.6,
    })
    expect(items[0].width / items[4].width).toBeGreaterThan(5)
  })
})
