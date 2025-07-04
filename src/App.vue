<script setup lang="ts">
import { useTheme, useLanguage } from './modules/common/composables'
useTheme()
useLanguage()
</script>

<template>
  <RouterView />
</template>
