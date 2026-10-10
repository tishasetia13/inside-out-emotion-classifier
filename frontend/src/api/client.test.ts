import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { predictEmotions } from './client'
import { ApiError } from './errors'
import { EXAMPLE_STORIES } from '../data/examples'

const baseUrl = 'https://api.test'
const scores = EXAMPLE_STORIES[0].scores

// Builds a fake fetch Response. The tests never touch the real network.
function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status })
}

describe('predictEmotions', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('returns the five scores and sends the story as JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, { emotions: scores }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(predictEmotions('hello', { baseUrl })).resolves.toEqual(scores)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.test/predict')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual({ text: 'hello' })
  })

  it('maps a 422 response to a validation error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(422, { detail: [{ msg: 'too long' }] })),
    )
    await expect(predictEmotions('x', { baseUrl })).rejects.toMatchObject({
      kind: 'validation',
    })
  })

  it('maps a 5xx response to a server error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(503, {})))
    await expect(predictEmotions('x', { baseUrl })).rejects.toMatchObject({
      kind: 'server',
    })
  })

  it('maps a failed fetch (offline or CORS) to a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(predictEmotions('x', { baseUrl })).rejects.toMatchObject({
      kind: 'network',
    })
  })

  it('rejects a response that is missing an emotion', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(200, { emotions: { joy: 100 } })),
    )
    await expect(predictEmotions('x', { baseUrl })).rejects.toMatchObject({
      kind: 'unexpected',
    })
  })

  // A fetch stand-in that never answers but reacts to the abort signal like the real one.
  function hangingFetch() {
    return vi.fn((_url: string, init: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener('abort', () =>
          reject(new DOMException('Aborted', 'AbortError')),
        )
      })
    })
  }

  it('times out when the server takes too long', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', hangingFetch())

    const result = predictEmotions('x', { baseUrl, timeoutMs: 1000 })
    const assertion = expect(result).rejects.toMatchObject({ kind: 'timeout' })
    await vi.advanceTimersByTimeAsync(1000)
    await assertion
  })

  it('reports cancellation when the caller aborts', async () => {
    vi.stubGlobal('fetch', hangingFetch())
    const controller = new AbortController()

    const result = predictEmotions('x', { baseUrl, signal: controller.signal })
    controller.abort()

    const error = await result.catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ kind: 'cancelled' })
  })
})
