<script setup lang="ts">
import { login } from '@/services/auth'
import { useUserStore } from '@/stores/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'zod'
import { Alert, Button, Card, Input } from './base/index'

const validationSchema = toTypedSchema(
  object({
    username: string({ required_error: 'Username cannot be empty' }),
    password: string({ required_error: 'Password cannot be empty' })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const store = useUserStore()
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const user = await login(values)
    store.setUser(user)
  } catch (error: any) {
    errorMessage.value = error.message ?? 'Something went wrong'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Card>
    <h4 class="mb-2 text-2xl font-bold uppercase">Login</h4>

    <Alert class="mb-2" v-if="errorMessage" variant="danger" title="Failed to login">
      <p>{{ errorMessage }}</p>
    </Alert>

    <form @submit="onSubmit" class="mb-2 flex flex-col gap-2">
      <div class="flex flex-col">
        <Input v-model="username" label="Username" :error="errors.username" />
      </div>
      <div class="flex flex-col">
        <Input type="password" v-model="password" label="Password" :error="errors.password" />
      </div>
      <Button :loading="isLoading">{{ isLoading ? 'Loading...' : 'Login' }}</Button>
    </form>
    <p>
      Don't have an account?
      <RouterLink class="font-medium text-primary" :to="{ name: 'register' }">Register</RouterLink>
    </p>
  </Card>
</template>
