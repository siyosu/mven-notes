<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'danger' | 'ghost' | 'outline'
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    loading: false
  }
)

const variantsClass = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/75',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/75',
  ghost: 'hover:bg-accent',
  outline: 'border hover:bg-accent'
}
</script>

<template>
  <button
    :class="variantsClass[variant]"
    class="flex justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition duration-200 disabled:pointer-events-none disabled:opacity-75"
    :disabled="loading"
  >
    <slot>Submit</slot>
  </button>
</template>
