import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/modules/common/layouts/AppLayout.vue'

export const cryptoRoutes: RouteRecordRaw = {
  path: '/crytocurrencies',
  component: AppLayout,
  children: [
    {
      path: '',
      name: 'cryptos',
      component: () => import('../views/CryptosView.vue'),
    },
  ],
}
