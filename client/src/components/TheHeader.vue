<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import NavBar from './NavBar.vue'

const user = useUserStore()

const showNav = ref(false)
const toggleNav = () => {
  showNav.value = !showNav.value
}

const navBar = ref<HTMLElement | null>(null)
const navToggle = ref<HTMLElement | null>(null)
onClickOutside(
  navBar,
  () => {
    if (showNav.value) {
      showNav.value = false
    }
  },
  { ignore: [navToggle] }
)
</script>

<template>
  <header class="sticky top-0 w-full overflow-x-clip border-b bg-background">
    <div class="container">
      <div class="relative flex items-center justify-between py-6">
        <RouterLink :to="{ name: 'home' }" class="text-2xl font-bold uppercase">Notes</RouterLink>

        <button
          ref="navToggle"
          v-if="user.isLoggedIn"
          @click="toggleNav"
          class="flex h-5 w-10 flex-col justify-between sm:hidden"
        >
          <span
            class="h-1 w-full rounded-full bg-foreground transition"
            :class="{ 'translate-y-2 rotate-45': showNav }"
          ></span>
          <span
            class="h-1 w-full rounded-full bg-foreground transition"
            :class="{ '-translate-y-2 -rotate-45': showNav }"
          ></span>
        </button>

        <NavBar v-if="user.isLoggedIn" ref="navBar" :show="showNav" />
      </div>
    </div>
  </header>
</template>
