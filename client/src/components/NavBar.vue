<script setup lang="ts">
import { useUserStore } from '@/stores/user'
defineProps<{ show: boolean }>()

const store = useUserStore()
</script>

<template>
  <nav
    class="absolute right-0 top-full mt-2 rounded-md border bg-background p-2 transition sm:static sm:translate-x-0 sm:border-none sm:p-0"
    :class="show ? 'translate-x-0' : 'translate-x-[150%]'"
  >
    <ul class="flex flex-col gap-2 sm:flex-row">
      <li class="flex rounded-md hover:bg-accent/50">
        <a class="flex w-full items-center gap-2 px-2 py-1" href="#"
          ><span class="text-lg"><FontAwesomeIcon icon="home" /></span>Home</a
        >
      </li>
      <li class="flex rounded-md hover:bg-accent/50">
        <a class="flex w-full items-center gap-2 px-2 py-1" href="#"
          ><span class="text-lg"><FontAwesomeIcon icon="note-sticky" /></span>Notes</a
        >
      </li>
      <li class="flex rounded-md hover:bg-accent/50">
        <button @click="store.logOut" class="flex w-full items-center gap-2 px-2 py-1">
          <span class="text-lg"><FontAwesomeIcon icon="right-from-bracket" /></span>Log out
        </button>
      </li>
    </ul>
  </nav>
</template>
