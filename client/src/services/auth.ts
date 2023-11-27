import { LoginError, RegisterError } from '@/error/auth'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import axios, { AxiosError } from 'axios'

const ApiClient = axios.create({
  baseURL: 'http://localhost:3900/auth',
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

const handleAuthError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.status === 500 || !error.response || !error.response.data) {
      throw error
    }

    if (error.response.data.errors) {
      throw new RegisterError(error.response.data)
    }

    throw new LoginError(error.response.data.message ?? 'Failed to login')
  }
  throw error
}

const { isLoading } = useNProgress() // progress bar
const post = async <T>(endpoint: string, data: any): Promise<T> => {
  isLoading.value = true
  try {
    const res = await ApiClient.post<T>(endpoint, data)
    return res.data
  } catch (error) {
    return handleAuthError(error)
  } finally {
    isLoading.value = false
  }
}

export interface UserData {
  id: string
  username: string
  token: string
}

interface UserInput {
  username: string
  password: string
  confirmPassword: string
}

const login = async (input: { username: string; password: string }): Promise<UserData> => {
  const res = await post<UserData>('/login', input)
  return res
}

const register = async (input: UserInput): Promise<UserData> => {
  const res = await post<UserData>('/register', input)
  return res
}

export const AuthService = {
  login,
  register
}
