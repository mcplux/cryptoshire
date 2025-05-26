import type { RouteRecordRaw } from 'vue-router'
import CryptoLayout from '../layouts/CryptoLayout.vue'

export const cryptoRoutes: RouteRecordRaw = {
  path: '/crytocurrencies',
  component: CryptoLayout,
  children: [
    {
      path: '',
      name: 'cryptos',
      component: () => import('../views/CryptosView.vue'),
    },
  ],
}
