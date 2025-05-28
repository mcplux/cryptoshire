import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref<'light' | 'dark'>('light')

  const getUserTheme = () => {
    const localStorageTheme = localStorage.getItem('theme')
    if (localStorageTheme !== 'light' && localStorageTheme !== 'dark') {
      const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      theme.value = userTheme
    } else {
      theme.value = localStorageTheme
    }
  }

  watch(theme, (newTheme) => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    localStorage.setItem('theme', newTheme)
  })

  return {
    getUserTheme,
    isDark: computed(() => theme.value === 'dark'),
  }
})
