<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCrypto } from '../composables/useCrypto'
import CryptoCard from '../components/CryptoCard.vue'
import LoaderSpinner from '@/modules/common/components/LoaderSpinner.vue'
import ErrorMessage from '@/modules/common/components/ErrorMessage.vue'

const { cryptos, cryptoError, getCryptos, isLoading, isSuccess, isError } = useCrypto()
const { t } = useI18n()

onMounted(async () => {
  await getCryptos()
})
</script>

<template>
  <h1 class="text-2xl md:text-3xl text-center font-bold dark:text-white">{{ t('app.title') }}</h1>
  <p class="mt-5 dark:text-white">{{ t('app.subtitle') }}</p>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-5"
    v-if="isSuccess"
  >
    <CryptoCard v-for="crypto in cryptos" :key="crypto.id" :crypto="crypto" />
  </div>

  <LoaderSpinner v-if="isLoading" />

  <ErrorMessage v-if="isError" :error="cryptoError" />
</template>
