<script setup lang="ts">
import { ValidationError } from '@/error/api'
import { addNote } from '@/services/notes'
import { useNotesStore } from '@/stores/notes'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'zod'
import { Button, Card, Input, Modal, TextArea } from './base'

const emit = defineEmits(['close'])
const router = useRouter()
const notes = useNotesStore()

const validationSchema = toTypedSchema(
  object({
    title: string({ required_error: 'Note title cannot be emtpy' }),
    body: string({ required_error: 'Note body cannot be empty' })
  })
)

const { handleSubmit, errors, setErrors, resetForm } = useForm({
  validationSchema
})

const { value: title } = useField<string>('title')
const { value: body } = useField<string>('body')
const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const res = await addNote(values)
    await notes.refreshNotes()
    router.push({ query: { success: res } })
    emit('close')
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return setErrors(error.errors)
    }
    router.push({ query: { failed: error.message ?? 'Something went wrong' } })
  } finally {
    isLoading.value = false
  }
  resetForm()
})
</script>

<template>
  <Modal @close="emit('close')">
    <Card>
      <h4 class="mb-2 text-2xl font-bold uppercase">Add Note</h4>

      <form @submit="onSubmit" class="flex flex-col gap-2">
        <div class="flex flex-col">
          <Input v-model="title" label="Title" :error="errors.title" />
        </div>
        <div class="flex flex-col">
          <TextArea label="Body" v-model="body" :error="errors.body" rows="4" />
        </div>
        <div class="mt-2 flex justify-end gap-2">
          <Button type="button" @click="emit('close')" variant="ghost">Cancel</Button>
          <Button type="submit" :loading="isLoading">{{
            isLoading ? 'Loading...' : 'Submit'
          }}</Button>
        </div>
      </form>
    </Card>
  </Modal>
</template>
