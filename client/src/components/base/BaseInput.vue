<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    modelValue?: string | number
    type?: string
    error?: string | undefined
  }>(),
  {
    label: '',
    modelValue: '',
    type: 'text',
    error: undefined
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="font-medium md:text-lg">{{ label }}</label>
  <input
    @input="onInput"
    class="rounded border bg-background p-2 text-sm md:text-base"
    :type="type"
    :value="modelValue"
    v-bind="$attrs"
  />
  <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
</template>
