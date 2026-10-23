import { afterEach, describe, expect, it } from 'vitest'
import http from '../../src/api/http.js'

// ADR-003 requires one Axios wrapper that turns every failure into the same
// shape, so that a page never reads an axios error.
//
// The contract (OpenAPI v0.2.0-draft) wraps a failure as
//   { error: { code, message, requestId } }
// and returns a success payload flat, with no envelope. Both behaviours are
// pinned by the tests below, because the wrapper is the only file that knows
// about them.

// Each test replaces the adapter, which is the seam axios offers for exactly
// this: no network call is made and the error can be shaped by hand.
const originalAdapter = http.defaults.adapter

afterEach(() => {
  http.defaults.adapter = originalAdapter
})

describe('http error normalisation', () => {
  it('flattens the contract error object into { status, code, message, requestId }', async () => {
    http.defaults.adapter = async (config) => {
      const error = new Error('Request failed with status code 422')
      error.config = config
      error.response = {
        status: 422,
        data: { error: { code: 'VALIDATION', message: 'bad input', requestId: 'req-1' } },
      }
      throw error
    }

    await expect(http.get('/parcels')).rejects.toEqual({
      status: 422,
      code: 'VALIDATION',
      message: 'bad input',
      requestId: 'req-1',
    })
  })

  it('still produces a usable error when the failure never reached the server', async () => {
    http.defaults.adapter = async (config) => {
      const error = new Error('Network Error')
      error.config = config
      throw error
    }

    await expect(http.get('/parcels')).rejects.toEqual({
      status: 0,
      code: 'REQUEST_FAILED',
      message: 'Network Error',
      requestId: null,
    })
  })

  it('returns a successful response body unchanged, with no envelope to unwrap', async () => {
    http.defaults.adapter = async (config) => ({
      data: { items: [], total: 0 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    })

    await expect(http.get('/parcels')).resolves.toEqual({ items: [], total: 0 })
  })
})
