let _baseUrl = ''
let _getToken: (() => string | undefined) | undefined

export function setBaseUrl(url: string) {
  _baseUrl = url
}

export function setTokenProvider(fn: () => string | undefined) {
  _getToken = fn
}

export type RequestConfig<TData = unknown> = {
  url: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: object
  data?: TData | FormData
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
}

export type ResponseConfig<TData = unknown> = {
  data: TData
  status: number
  statusText: string
}

export type ResponseErrorConfig<TData = unknown> = {
  data: TData
  status: number
  statusText: string
}

export const client = async <TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const base = _baseUrl || window.location.origin
  const url = new URL(`${base}${config.url}`)

  if (config.params) {
    for (const [key, value] of Object.entries(config.params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    }
  }

  const headers = new Headers(config.headers)

  const token = _getToken?.()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (config.data && !(config.data instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url.toString(), {
    method: config.method.toUpperCase(),
    body: config.data instanceof FormData ? config.data : config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    headers,
  })

  const contentType = response.headers.get('content-type')
  let data: TData
  if (contentType?.includes('application/json')) {
    data = await response.json()
  } else {
    data = (await response.text()) as unknown as TData
  }

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`)
    Object.assign(error, { data, status: response.status, statusText: response.statusText })
    throw error
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
  }
}

export type Client = typeof client

export function mergeConfig(
  ...configs: (Partial<RequestConfig> & { client?: Client })[]
): Partial<RequestConfig> & { client?: Client } {
  return Object.assign({}, ...configs)
}

export default client
