<script setup lang="ts">
import { onMounted } from 'vue'
import { usePreferencesStore } from './modules/common/stores/preferences.store'

const preferencesStore = usePreferencesStore()

onMounted(() => {
  preferencesStore.getUserTheme()
})
</script>

<template>
  <RouterView />
</template>
