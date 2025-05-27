<script setup lang="ts">
import { computed } from 'vue'

import { formatCurrency, formatPercent } from '@/modules/common/helpers'
import type { Crypto } from '../interfaces'

const props = defineProps<{
  crypto: Crypto
}>()

const isChangePositive = computed(() => +props.crypto.changePercent24Hr >= 0)
</script>

<template>
  <RouterLink
    class="border border-l-8 border-gray-700 p-5 rounded shadow hover:scale-105 hover:bg-gray-100 transition-all"
    :class="[isChangePositive ? 'border-l-green-600' : 'border-l-red-600']"
    :to="{ name: 'crypto', params: { id: crypto.id } }"
  >
    <h2 class="font-bold text-xl truncate uppercase">
      #{{ crypto.rank }} {{ crypto.name }}
      <span class="text-gray-600 text-sm">{{ crypto.symbol }}</span>
    </h2>

    <div class="mt-5 flex flex-col gap-2">
      <p class="text-lg">
        Price (USD): <span class="font-semibold">{{ formatCurrency(crypto.priceUsd) }}</span>
      </p>
      <p class="text-lg">
        Change (24h):
        <span class="font-semibold">{{ formatPercent(crypto.changePercent24Hr) }}</span>
      </p>
    </div>
  </RouterLink>
</template>
