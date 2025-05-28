<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { formatCurrency, formatPercent } from '@/modules/common/helpers'
import type { Crypto } from '../interfaces'

const { t } = useI18n()

const props = defineProps<{
  crypto: Crypto
}>()

const isChangePositive = computed(() => +props.crypto.changePercent24Hr >= 0)
</script>

<template>
  <RouterLink
    class="border border-l-8 border-gray-700 dark:border-gray-400 p-5 rounded shadow hover:scale-105 hover:bg-white dark:hover:bg-gray-500 transition-all"
    :class="[
      isChangePositive
        ? 'border-l-green-600 dark:border-l-green-800'
        : 'border-l-red-600 dark:border-l-red-800',
    ]"
    :to="{ name: 'crypto', params: { id: crypto.id } }"
  >
    <h2 class="font-bold text-xl truncate uppercase dark:text-white">
      #{{ crypto.rank }} {{ crypto.name }}
      <span class="text-gray-600 dark:text-gray-400 text-sm">{{ crypto.symbol }}</span>
    </h2>

    <div class="mt-5 flex flex-col gap-2">
      <p class="text-lg text-gray-700 dark:text-gray-300">
        {{ t('crypto.priceUsd') }}:
        <span class="font-semibold text-black dark:text-white">{{
          formatCurrency(crypto.priceUsd)
        }}</span>
      </p>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        {{ t('crypto.change24H') }}:
        <span class="font-semibold text-black dark:text-white">{{
          formatPercent(crypto.changePercent24Hr)
        }}</span>
      </p>
    </div>
  </RouterLink>
</template>
