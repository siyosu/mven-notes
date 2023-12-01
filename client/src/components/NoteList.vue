<script setup lang="ts">
import { deleteNote } from '@/services/notes'
import { useNotesStore } from '@/stores/notes'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Card } from './base'

const notes = useNotesStore()
const router = useRouter()
const truncate = (str: string, max: number) => {
  return str.length > max ? str.slice(0, max) + '...' : str
}

const isLoading = ref(false)
const handleDelete = async (noteId: string) => {
  isLoading.value = true
  try {
    const res = await deleteNote(noteId)
    await notes.refreshNotes()
    router.push({ query: { success: res } })
  } catch (error: any) {
    router.push({ query: { failed: error.message ?? 'Something went wrong' } })
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await notes.refreshNotes()
})
</script>

<template>
  <div>
    <ul v-if="notes.isNotesAvailable" class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="note in notes.notes" :key="note._id" class="flex w-full cursor-pointer">
        <Card
          class="flex flex-col justify-between rounded-md ring-2 ring-transparent transition hover:ring-primary"
        >
          <div>
            <div class="flex items-start justify-between gap-4">
              <p class="font-bold uppercase">{{ note.title }}</p>
              <div class="flex flex-shrink-0 gap-2">
                <Button><FontAwesomeIcon icon="pen-to-square" /></Button>
                <Button :loading="isLoading" @click="handleDelete(note._id)" variant="danger"
                  ><FontAwesomeIcon icon="trash"
                /></Button>
              </div>
            </div>
            <p class="font-light">{{ truncate(note.body, 150) }}</p>
          </div>
          <p class="mt-4 text-right text-sm">{{ new Date(note.updatedAt).toLocaleString() }}</p>
        </Card>
      </li>
    </ul>
    <div class="mt-4" v-else>
      <p>You don't have any note</p>
    </div>
  </div>
</template>
