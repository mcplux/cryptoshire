<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string

console.log(id)
</script>

<template>
  <h1 class="text-2xl md:text-3xl text-center font-bold">{{ id.toUpperCase() }}</h1>
</template>
