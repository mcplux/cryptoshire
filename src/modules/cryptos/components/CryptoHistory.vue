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

const props = defineProps<{
  history: CryptoHistory[]
  name: string
}>()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  scales: {
    x: { ticks: { color: '#364153' }, grid: { color: '#e1e1e1' } },
    y: { ticks: { color: '#364153' }, grid: { color: '#e1e1e1' } },
  },
}

const labels = props.history.map((h) => h.date.split('T')[0])
const datasets = [
  {
    label: props.name,
    data: props.history.map((h) => +h.priceUsd),
    borderColor: '#6366f1',
    backgroundColor: '#818cf8',
  },
]
</script>

<template>
  <div class="mt-10 container mx-auto">
    <h2 class="text-center text-2xl font-bold">History</h2>

    <div class="overflow-x-scroll lg:overflow-hidden">
      <div class="w-[1024px] lg:w-full mx-auto">
        <Line id="history-chart" :options="options" :data="{ labels, datasets }" />
      </div>
    </div>
  </div>
</template>
