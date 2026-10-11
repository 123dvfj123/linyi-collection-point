import axios from 'axios'

// The only Axios instance in the application. ADR-003 requires this single
// wrapper so that pages never talk to Axios directly.
const TOKEN_KEY = 'auth.token'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
})

// One place injects the token and one request id, so every call is traceable.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['X-Request-Id'] = crypto.randomUUID()
  return config
})

// Every failure leaves this wrapper in the same shape, so pages only ever
// handle { status, code, message }.
http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status ?? 0
    if (status === 401) {
      // Clearing the session here keeps the rule in one place. The reload is
      // deliberate: a guard cannot run inside an interceptor, and reloading
      // avoids a circular import between the router, the store and this file.
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('auth.user')
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject({
      status,
      code: error.response?.data?.code ?? 'REQUEST_FAILED',
      message: error.response?.data?.message ?? error.message,
    })
  },
)

export { TOKEN_KEY }
export default http