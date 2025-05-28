<script setup lang="ts">
import { usePreferencesStore } from '../stores/preferences.store'
import SunIcon from '../components/icons/SunIcon.vue'
import MoonIcon from '../components/icons/MoonIcon.vue'

const preferencesStore = usePreferencesStore()
</script>

<template>
  <header
    class="bg-blue-400 dark:bg-slate-900 text-white py-8 px-5 shadow-lg flex items-center justify-between"
  >
    <RouterLink :to="{ name: 'cryptos' }" class="font-bold text-3xl md:text-4xl">
      CryptoShire
    </RouterLink>

    <button @click="preferencesStore.toggleTheme()" class="cursor-pointer">
      <MoonIcon v-if="preferencesStore.isDark" />
      <SunIcon v-else />
    </button>
  </header>

  <main class="mt-10 px-5 container mx-auto">
    <RouterView />
  </main>

  <footer class="text-gray-700 dark:text-gray-300 text-center my-10">
    &copy;All rights reserved - CryptoShire - {{ new Date().getFullYear() }}
  </footer>
</template>
