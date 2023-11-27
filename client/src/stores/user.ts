import type { UserData } from '@/services/auth'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, readonly } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = useStorage<UserData | null>('user', null, undefined, {
    serializer: StorageSerializers.object
  })

  const isLoggedIn = computed(() => {
    if (!user.value) return false
    return !!user.value.token
  })

  const setUser = (userData: UserData) => {
    user.value = userData
  }

  return { user: readonly(user), isLoggedIn, setUser }
})
