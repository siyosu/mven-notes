<script setup lang="ts">
import { ValidationError } from '@/error/api'
import { register } from '@/services/auth'
import { useUserStore } from '@/stores/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'zod'
import { Alert, Button, Card, Input } from './base/index'

const validationSchema = toTypedSchema(
  object({
    username: string({ required_error: 'Username cannot be empty' })
      .min(5)
      .max(250)
      .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain alpha numeric characters'),
    password: string({ required_error: 'Password cannot be empty' }).min(6).max(250),
    confirmPassword: string({ required_error: 'Confirm Password cannot be empty' })
  }).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] })
    }
  })
)
const { handleSubmit, errors, setErrors } = useForm({
  validationSchema
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const store = useUserStore()
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const user = await register(values)
    store.setUser(user)
  } catch (error: any) {
    errorMessage.value = error.message ?? 'Something went wrong'
    if (error instanceof ValidationError) {
      setErrors(error.errors)
    }
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <Card>
    <h4 class="mb-2 text-2xl font-bold uppercase">Register</h4>

    <Alert class="mb-2" v-if="errorMessage" variant="danger" title="Failed to register">
      <p>{{ errorMessage }}</p>
    </Alert>

    <form @submit="onSubmit" class="mb-2 flex flex-col gap-2">
      <div class="flex flex-col">
        <Input v-model="username" label="Username" :error="errors.username" />
      </div>
      <div class="flex flex-col">
        <Input type="password" v-model="password" label="Password" :error="errors.password" />
      </div>
      <div class="flex flex-col">
        <Input
          type="password"
          v-model="confirmPassword"
          label="Confirm Password"
          :error="errors.confirmPassword"
        />
      </div>
      <Button :loading="isLoading">{{ isLoading ? 'Loading...' : 'Register' }}</Button>
    </form>
    <p>
      Already have an account?
      <RouterLink class="font-medium text-primary" :to="{ name: 'login' }">Login</RouterLink>
    </p>
  </Card>
</template>
