<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useCrypto } from '../composables/useCrypto'
import LoaderSpinner from '@/modules/common/components/LoaderSpinner.vue'
import ErrorMessage from '@/modules/common/components/ErrorMessage.vue'
import CryptoInfo from '../components/CryptoInfo.vue'
import CryptoHistory from '../components/CryptoHistory.vue'

const route = useRoute()
const { crypto, cryptoHistory, cryptoError, getCrypto, isSuccess, isLoading, isError } = useCrypto()

const id = route.params.id as string

onMounted(async () => {
  await getCrypto(id)

  console.log(crypto.value, cryptoHistory.value)
})
</script>

<template>
  <div v-if="isSuccess && crypto">
    <h1 class="text-2xl md:text-3xl text-center font-bold dark:text-white">{{ crypto.name }}</h1>

    <CryptoInfo :crypto="crypto" />
    <CryptoHistory :history="cryptoHistory" :name="crypto.name" />
  </div>

  <LoaderSpinner v-if="isLoading" />

  <ErrorMessage v-if="isError" :error="cryptoError" />
</template>
