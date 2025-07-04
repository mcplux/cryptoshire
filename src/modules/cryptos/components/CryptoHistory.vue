<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

import type { CryptoHistory } from '../interfaces'
import { computed } from 'vue'
import { useTheme } from '@/modules/common/composables'

const GRAY_200 = '#e5e7eb'
const GRAY_700 = '#364153'
const INDIGO_400 = '#7c86ff'
const INDIGO_500 = '#615fff'

const { isDarkMode } = useTheme()

const props = defineProps<{
  history: CryptoHistory[]
  name: string
}>()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = computed(() => ({
  responsive: true,
  scales: {
    x: {
      ticks: { color: isDarkMode.value ? GRAY_200 : GRAY_700 },
      grid: { color: isDarkMode.value ? GRAY_700 : GRAY_200 },
    },
    y: {
      ticks: { color: isDarkMode.value ? GRAY_200 : GRAY_700 },
      grid: { color: isDarkMode.value ? GRAY_700 : GRAY_200 },
    },
  },
}))

const labels = props.history.map((h) => h.date.split('T')[0])
const datasets = [
  {
    label: props.name,
    data: props.history.map((h) => +h.priceUsd),
    borderColor: INDIGO_500,
    backgroundColor: INDIGO_400,
  },
]
</script>

<template>
  <div class="mt-10 container mx-auto">
    <h2 class="text-center text-2xl font-bold dark:text-white">History</h2>

    <div class="overflow-x-scroll lg:overflow-hidden mt-5">
      <div class="w-[1024px] lg:w-full mx-auto">
        <Line id="history-chart" :options="options" :data="{ labels, datasets }" />
      </div>
    </div>
  </div>
</template>
