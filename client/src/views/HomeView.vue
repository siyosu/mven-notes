<script setup lang="ts">
import AddNoteModal from '@/components/AddNoteModal.vue'
import NoteList from '@/components/NoteList.vue'
import { Alert, Button } from '@/components/base'
import { ref } from 'vue'

import { useRoute } from 'vue-router'

const showModal = ref(false)
const openModal = () => {
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}

const route = useRoute()
</script>

<template>
  <main>
    <div class="container">
      <div class="mt-6">
        <div class="mb-4 max-w-lg">
          <Alert v-if="route.query.success" variant="success">
            {{ route.query.success }}
          </Alert>
          <Alert v-if="route.query.failed" variant="danger">
            {{ route.query.failed }}
          </Alert>
        </div>
        <div>
          <Button @click="openModal">Add Note</Button>
        </div>

        <Teleport to="#modal">
          <Transition
            enter-active-class="animate-slide-in"
            leave-active-class="animate-slide-out"
            mode="out-in"
          >
            <AddNoteModal @close="closeModal" v-if="showModal" />
          </Transition>
        </Teleport>

        <NoteList />
      </div>
    </div>
  </main>
</template>
