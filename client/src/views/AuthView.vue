<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = computed(() => {
  return router.currentRoute.value.name === 'login' ? LoginForm : RegisterForm
})
</script>
<template>
  <main>
    <div class="container">
      <div class="flex min-h-[calc(100vh-93px)] items-center justify-center">
        <Transition
          enter-active-class="animate-slide-in"
          leave-active-class="animate-slide-out"
          mode="out-in"
        >
          <component :is="activeTab"></component>
        </Transition>
      </div>
    </div>
  </main>
</template>
