import { createRouter, createWebHistory } from 'vue-router'
import { cryptoRoutes } from '@/modules/cryptos/routes'
import NotFoundView from '@/modules/common/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'cryptos' },
    },
    cryptoRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
