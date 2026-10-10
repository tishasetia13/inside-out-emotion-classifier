import { describe, expect, it } from 'vitest'
import { resolveMockMode } from './env'

describe('resolveMockMode', () => {
  it('is off by default', () => {
    expect(resolveMockMode('', undefined)).toBeNull()
  })

  it('turns on from the environment variable', () => {
    expect(resolveMockMode('', 'true')).toBe('normal')
  })

  it('turns on from the URL parameter, including slow and error variants', () => {
    expect(resolveMockMode('?mock=1', undefined)).toBe('normal')
    expect(resolveMockMode('?mock=slow', undefined)).toBe('slow')
    expect(resolveMockMode('?mock=error', undefined)).toBe('error')
  })

  it('lets ?mock=0 override the environment variable', () => {
    expect(resolveMockMode('?mock=0', 'true')).toBeNull()
  })
})
