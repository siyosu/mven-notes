import type { UserData } from '@/services/auth'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, readonly } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = useStorage<UserData | null>('user', null, undefined, {
    serializer: StorageSerializers.object
  })

  const isLoggedIn = computed(() => {
    if (!user.value) return false
    return !!user.value.token
  })

  const setUser = (userData: UserData) => {
    user.value = userData
    router.push({ name: 'home' })
  }

  const logOut = () => {
    user.value = null
    router.push({ name: 'login' })
  }

  return { user: readonly(user), isLoggedIn, setUser, logOut }
})
