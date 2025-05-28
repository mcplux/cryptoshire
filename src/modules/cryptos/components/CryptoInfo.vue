<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { formatCurrency, formatNumber, formatPercent } from '@/modules/common/helpers'
import type { Crypto } from '../interfaces'

const props = defineProps<{
  crypto: Crypto
}>()

const { t } = useI18n()

const isChangePositive = computed(() => +props.crypto.changePercent24Hr >= 0)
</script>

<template>
  <div class="max-w-4xl mx-auto p-5 flex flex-col sm:flex-row justify-between md:items-center">
    <div>
      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.rank') }}: <span class="font-bold text-black">#{{ crypto.rank }}</span>
      </p>

      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.priceUsd') }}:
        <span class="font-bold text-black">{{ formatCurrency(crypto.priceUsd) }}</span>
      </p>

      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.change24H') }}:
        <span :class="['font-bold', isChangePositive ? 'text-green-400' : 'text-red-400']">
          {{ formatPercent(crypto.changePercent24Hr) }}
        </span>
      </p>
    </div>

    <div>
      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.supply') }}:
        <span class="font-bold text-black">
          {{ crypto.symbol }} {{ formatNumber(crypto.supply) }}
        </span>
      </p>

      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.maxSupply') }}:
        <span class="font-bold text-black">
          {{ crypto.symbol }} {{ formatNumber(crypto.maxSupply) ?? '-' }}
        </span>
      </p>

      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.volume24H') }}:
        <span class="font-bold text-black">
          {{ formatCurrency(crypto.volumeUsd24Hr) }}
        </span>
      </p>

      <p class="text-gray-700 mt-5 text-xl">
        {{ t('crypto.marketCap') }}:
        <span class="font-bold text-black">
          {{ formatCurrency(crypto.marketCapUsd) }}
        </span>
      </p>
    </div>
  </div>
</template>
