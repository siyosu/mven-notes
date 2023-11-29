import { ApiClient } from './api'

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

export const login = async (input: { username: string; password: string }): Promise<UserData> => {
  const res = await ApiClient.post<UserData>('/auth/login', input)
  return res.data
}

export const register = async (input: UserInput): Promise<UserData> => {
  const res = await ApiClient.post<UserData>('/auth/register', input)
  return res.data
}
