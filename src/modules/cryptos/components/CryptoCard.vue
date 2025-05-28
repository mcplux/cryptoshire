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
    class="border border-l-8 border-gray-700 p-5 rounded shadow hover:scale-105 hover:bg-white transition-all"
    :class="[isChangePositive ? 'border-l-green-600' : 'border-l-red-600']"
    :to="{ name: 'crypto', params: { id: crypto.id } }"
  >
    <h2 class="font-bold text-xl truncate uppercase">
      #{{ crypto.rank }} {{ crypto.name }}
      <span class="text-gray-600 text-sm">{{ crypto.symbol }}</span>
    </h2>

    <div class="mt-5 flex flex-col gap-2">
      <p class="text-lg">
        {{ t('crypto.priceUsd') }}:
        <span class="font-semibold">{{ formatCurrency(crypto.priceUsd) }}</span>
      </p>
      <p class="text-lg">
        {{ t('crypto.change24H') }}:
        <span class="font-semibold">{{ formatPercent(crypto.changePercent24Hr) }}</span>
      </p>
    </div>
  </RouterLink>
</template>
