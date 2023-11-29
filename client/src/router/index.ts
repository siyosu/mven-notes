import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useNProgress } from '@vueuse/integrations/useNProgress'

import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/AuthView.vue')
    }
  ]
})

const { isLoading } = useNProgress()

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  isLoading.value = true
  if (to.matched.some((target) => target.meta.auth) && !store.isLoggedIn) {
    return next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && store.isLoggedIn) {
    return next({ name: 'home' })
  }
  next()
})

router.afterEach(() => {
  isLoading.value = false
})

export default router
