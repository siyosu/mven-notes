import { ApiClient } from './api'

export interface Note {
  _id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

/**
 * Get all notes for the current user, return an empty array if user don't have note
 */
export const getNotes = async (): Promise<Note[]> => {
  const res = await ApiClient.get<Note[]>('/notes')
  return res.data
}

/**
 * Get note for the specified note id
 */
export const getNote = async (noteId: string): Promise<Note> => {
  const res = await ApiClient.get<Note>(`/notes/${noteId}`)
  return res.data
}

interface NewNote {
  title: string
  body: string
}

/**
 * Create new note
 */
export const addNote = async (note: NewNote): Promise<string> => {
  const res = await ApiClient.post<{ message: string }>('/notes', note)
  return res.data.message
}

/**
 * Delte note for specified note id
 */
export const deleteNote = async (noteId: string): Promise<string> => {
  const res = await ApiClient.delete<{ message: string }>(`/notes/${noteId}`)
  return res.data.message
}

/**
 * Update note for the specified note id
 */
export const udpateNote = async (noteId: string, note: NewNote): Promise<string> => {
  const res = await ApiClient.put<{ message: string }>(`/notes/${noteId}`, note)
  return res.data.message
}
