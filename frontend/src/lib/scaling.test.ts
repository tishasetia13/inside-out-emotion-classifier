import { describe, expect, it } from 'vitest'
import { MIN_DIAMETER, diameterForPercent, intensityForPercent } from './scaling'

describe('diameterForPercent', () => {
  it('never goes below the floor, so a tiny emotion is still visible', () => {
    expect(diameterForPercent(0)).toBe(MIN_DIAMETER)
    expect(diameterForPercent(0.2)).toBe(MIN_DIAMETER)
  })

  it('reaches full size at 100%', () => {
    expect(diameterForPercent(100)).toBe(1)
  })

  it('makes area proportional to the percentage', () => {
    // Doubling the percentage should double the circle's area (diameter squared).
    const area = (percent: number) => diameterForPercent(percent) ** 2
    expect(area(50) / area(25)).toBeCloseTo(2)
    expect(area(80) / area(20)).toBeCloseTo(4)
  })

  it('makes a dominant emotion dramatically larger than a tiny one', () => {
    expect(diameterForPercent(98) / diameterForPercent(0.2)).toBeGreaterThan(5)
  })

  it('clamps out-of-range and invalid input', () => {
    expect(diameterForPercent(-20)).toBe(MIN_DIAMETER)
    expect(diameterForPercent(250)).toBe(1)
    expect(diameterForPercent(Number.NaN)).toBe(MIN_DIAMETER)
  })
})

describe('intensityForPercent', () => {
  it('stays between 0 and 1', () => {
    expect(intensityForPercent(0)).toBe(0)
    expect(intensityForPercent(100)).toBe(1)
    expect(intensityForPercent(25)).toBeCloseTo(0.5)
  })
})
