<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'success' | 'danger'
    title?: string
  }>(),
  {
    title: '',
    variant: 'default'
  }
)

const variantsClass = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-teal-500 dark:bg-teal-700 text-primary-foreground',
  danger: 'bg-destructive text-destructive-foreground'
}
</script>
<template>
  <div class="rounded p-2" :class="variantsClass[variant]">
    <p v-if="title" class="font-semibold md:text-lg">{{ title }}</p>
    <div class="text-sm md:text-base">
      <slot>
        <p>Alert description</p>
      </slot>
    </div>
  </div>
</template>
