<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCryptosStore } from '../stores/cryptos.store'
import CryptoCard from '../components/CryptoCard.vue'
import LoaderSpinner from '@/modules/common/components/LoaderSpinner.vue'

const cryptosStore = useCryptosStore()
const { t } = useI18n()

onMounted(async () => {
  await cryptosStore.getCryptos()
})
</script>

<template>
  <h1 class="text-2xl md:text-3xl text-center font-bold">{{ t('app.title') }}</h1>
  <p class="mt-5">{{ t('app.subtitle') }}</p>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-5"
    v-if="cryptosStore.isSuccess"
  >
    <CryptoCard v-for="crypto in cryptosStore.cryptos" :key="crypto.id" :crypto="crypto" />
  </div>

  <LoaderSpinner v-if="cryptosStore.isLoading" />
</template>
