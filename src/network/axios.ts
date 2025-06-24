import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import { getToken, logout, setToken } from "./api/auth/auth" // Assuming setToken exists

// Create the Axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
  config: AxiosRequestConfig
}[] = []

/**
 * Processes the queue of failed requests.
 * If a new token is provided, it retries the requests with the new token.
 * If an error is provided, it rejects all queued requests.
 * @param error - An error object if the refresh token failed.
 * @param token - The new access token if the refresh was successful.
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(prom => {
    if (error) {
      // If refresh failed, reject all queued promises
      prom.reject(error)
    } else {
      // If refresh succeeded, update the Authorization header and retry the request
      if (prom.config.headers) {
        prom.config.headers.Authorization = `Bearer ${token}`
      } else {
        prom.config.headers = { Authorization: `Bearer ${token}` }
      }
      prom.resolve(api(prom.config)) // Re-run the original request
    }
  })
  failedQueue = [] // Clear the queue after processing
}

api.interceptors.request.use(config => {
  const tokens = getToken()
  const access_token = tokens?.access_token

  if (access_token && config.url && !config.url.includes("/auth/")) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  return config
})

api.interceptors.response.use(
  response => response, // If response is successful, just return it
  async (error: AxiosError) => {
    const originalRequest: any = error.config

    // Check if the error is 401 (Unauthorized) and it's not the refresh token endpoint itself
    // We explicitly check originalRequest to ensure it's defined and not null/undefined.
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      // If a refresh is already in progress, queue the current failed request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      // If no refresh is in progress, initiate one
      isRefreshing = true

      const tokens = getToken()
      const currentRefreshToken = tokens?.refresh_token

      // If no refresh token is available, or it's invalid, force logout
      if (!currentRefreshToken) {
        logout()
        window.location.href = "/login" // Redirect to login page
        return Promise.reject(error) // Reject the original error immediately
      }

      try {
        // Make the refresh token request
        // This assumes your refresh endpoint is '/auth/refresh' and expects a refresh_token in the body
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/refresh`,
          { refresh_token: currentRefreshToken }
        )

        const newAccessToken = refreshResponse.data.access_token
        const newRefreshToken = refreshResponse.data.refresh_token // Assuming your refresh endpoint returns a new refresh token

        // Update tokens in your storage (e.g., localStorage, sessionStorage)
        setToken({
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        })

        // Process all requests that were queued while refreshing
        processQueue(null, newAccessToken)

        // Retry the original request that triggered the refresh
        if (originalRequest.headers?.set) {
          // AxiosHeaders instance – safe way to update
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${newAccessToken}`
          )
        } else {
          // Fallback – mutate plain object
          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
          }
        }
        return api(originalRequest) // Re-run the original request with the new token
      } catch (refreshError: any) {
        // If the refresh token request itself fails (e.g., refresh token expired/invalid)
        processQueue(refreshError) // Reject all queued requests with the refresh error
        logout() // Log out the user
        window.location.href = "/login" // Redirect to login page
        return Promise.reject(refreshError) // Reject the original error with the refresh failure
      } finally {
        isRefreshing = false // Reset the refreshing flag
      }
    }

    // For any other errors (e.g., 400, 403, 404, or 401 from refresh endpoint),
    // or if originalRequest is undefined, just propagate the error.
    return Promise.reject(error)
  }
)
