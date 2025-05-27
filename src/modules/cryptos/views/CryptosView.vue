<script setup lang="ts">
import CryptoCard from '../components/CryptoCard.vue'
</script>

<template>
  <h1 class="text-2xl md:text-3xl text-center font-bold">CryptoShire</h1>
  <p class="mt-5">Explore the most important cryptocurrencies on the market</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-5 gap-3">
    <CryptoCard />
    <CryptoCard />
    <CryptoCard />
  </div>
</template>
