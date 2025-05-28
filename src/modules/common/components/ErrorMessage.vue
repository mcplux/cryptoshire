<script setup lang="ts">
defineProps<{
  error: string
}>()
</script>

<template>
  <p class="mt-10 text-center bg-red-200 text-red-700 py-5 font-bold text-lg uppercase">
    {{ error }}
  </p>
</template>
