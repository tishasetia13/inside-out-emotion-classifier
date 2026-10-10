import { describe, expect, it } from 'vitest'
import { MAX_CHARS, canSubmit, countChars, getCounterState } from './charCount'

describe('countChars', () => {
  it('counts an emoji as one character, like the backend does', () => {
    expect(countChars('hi 😀')).toBe(4)
  })
})

describe('getCounterState', () => {
  it('is ok for short text', () => {
    expect(getCounterState('hello')).toEqual({ count: 5, remaining: 4995, level: 'ok' })
  })

  it('warns near the limit', () => {
    expect(getCounterState('a'.repeat(4600)).level).toBe('warning')
  })

  it('is still valid exactly at the limit', () => {
    expect(getCounterState('a'.repeat(MAX_CHARS))).toMatchObject({
      remaining: 0,
      level: 'warning',
    })
  })

  it('reports over once past the limit', () => {
    expect(getCounterState('a'.repeat(MAX_CHARS + 1))).toMatchObject({
      remaining: -1,
      level: 'over',
    })
  })
})

describe('canSubmit', () => {
  it('rejects empty and whitespace-only text', () => {
    expect(canSubmit('')).toBe(false)
    expect(canSubmit('   \n ')).toBe(false)
  })

  it('accepts text up to the limit and rejects beyond it', () => {
    expect(canSubmit('a'.repeat(MAX_CHARS))).toBe(true)
    expect(canSubmit('a'.repeat(MAX_CHARS + 1))).toBe(false)
  })
})
