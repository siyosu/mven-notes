import { SessionExpiredError, UnauthorizedError } from '@/error/api'
import { getNotes, type Note } from '@/services/notes'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const isNotesAvailable = computed(() => {
    return !!notes.value.length
  })
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  interface NotesQuery {
    sortBy: 'updated_asc' | 'updated_desc' | 'title_asc' | 'title_desc'
    page: number
    limit: number
  }
  const query = ref<NotesQuery>({ limit: 15, page: 1, sortBy: 'updated_asc' })

  const user = useUserStore()

  const handleError = (err: any) => {
    switch (true) {
      case err instanceof SessionExpiredError:
        return user.logOut(err.message)
      case err instanceof UnauthorizedError:
        return user.logOut()
      default:
        error.value = err.message ?? 'Something went wrong'
    }
  }

  const refreshNotes = async () => {
    isLoading.value = true
    error.value = null
    try {
      notes.value = await getNotes()
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  return { notes, isNotesAvailable, isLoading, error, refreshNotes }
})
