<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MoonIcon, SunIcon } from '@heroicons/vue/16/solid'
import { usePreferencesStore } from '../stores/preferences.store'
import LanguageMenu from '../components/LanguageMenu.vue'

const preferencesStore = usePreferencesStore()
const { t } = useI18n()
</script>

<template>
  <header
    class="bg-blue-400 dark:bg-slate-900 text-white py-8 px-5 shadow-lg flex items-center justify-between"
  >
    <RouterLink :to="{ name: 'cryptos' }" class="font-bold text-3xl md:text-4xl">
      {{ t('app.title') }}
    </RouterLink>

    <div class="flex gap-2 items-center">
      <LanguageMenu />
      <button @click="preferencesStore.toggleTheme()" class="cursor-pointer">
        <MoonIcon class="size-8" v-if="preferencesStore.isDark" />
        <SunIcon class="size-8" v-else />
      </button>
    </div>
  </header>

  <main class="mt-10 px-5 container mx-auto">
    <RouterView />
  </main>

  <footer class="text-gray-700 dark:text-gray-300 text-center my-10">
    &copy; {{ t('app.copy') }} - {{ t('app.title') }} - {{ new Date().getFullYear() }}
  </footer>
</template>
