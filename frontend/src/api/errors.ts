// Every failure the UI can show maps to one of these kinds.
//   validation: the API rejected the text (HTTP 422: empty or over 5000 characters)
//   network:    the request never got an answer (offline, server down, or blocked by CORS)
//   timeout:    no answer within the time limit
//   server:     the API answered with a 5xx error
//   unexpected: anything else (odd status, malformed response)
//   cancelled:  we cancelled the request ourselves; not shown to the user
export type ApiErrorKind =
  'validation' | 'network' | 'timeout' | 'server' | 'unexpected' | 'cancelled'

// An Error that carries a `kind`, so the UI can choose a friendly message
// without ever parsing raw error text.
export class ApiError extends Error {
  kind: ApiErrorKind

  constructor(kind: ApiErrorKind, message: string) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
  }
}
