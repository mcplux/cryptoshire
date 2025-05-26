import { createRouter, createWebHistory } from 'vue-router'
import { cryptoRoutes } from '@/modules/cryptos/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'cryptos' },
    },
    cryptoRoutes,
  ],
})

export default router
