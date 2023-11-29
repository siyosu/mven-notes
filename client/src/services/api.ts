import { NetworkError, NotFoundError, UnauthorizedError, ValidationError } from '@/error/api'
import axios, { AxiosError } from 'axios'
import { useNProgress } from '@vueuse/integrations/useNProgress'

interface UserData {
  id: string
  username: string
  token: string
}

const ApiClient = axios.create({
  withCredentials: false,
  baseURL: 'http://localhost:3900',
  headers: {
    Accept: 'application/json'
  }
})

const { isLoading } = useNProgress() // progress bar
// Intercepts request
ApiClient.interceptors.request.use(
  (config) => {
    isLoading.value = true
    const user = localStorage.getItem('user')
    if (user) {
      const { token } = JSON.parse(user) as UserData
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepts response
ApiClient.interceptors.response.use(
  (response) => {
    isLoading.value = false
    return response
  },
  (error) => {
    console.error(error)
    isLoading.value = false
    if (!(error instanceof AxiosError)) {
      throw error
    }
    if (error.message === 'Network Error' || !error.response) {
      throw new NetworkError('Network Error - make sure the API is running!')
    }

    const { status, data } = error.response
    if (status === 400 && data.errors) {
      throw new ValidationError(data)
    }
    if (status === 401) {
      throw new UnauthorizedError(data.message)
    }
    if (status === 404) {
      throw new NotFoundError(data.message)
    }
    throw error
  }
)

export { ApiClient }
