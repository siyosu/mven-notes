<script setup lang="ts">
import { onClickOutside } from '@vueuse/core/index.cjs'
import { ref } from 'vue'

const emit = defineEmits(['close'])
const modal = ref<HTMLElement | null>(null)
onClickOutside(modal, () => {
  emit('close')
})
</script>
<template>
  <div class="fixed left-0 top-0 flex h-screen w-full p-6 backdrop-blur-sm">
    <div ref="modal" class="m-auto w-full">
      <slot>Modal Content</slot>
    </div>
  </div>
</template>
