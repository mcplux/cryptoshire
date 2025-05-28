import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref<'light' | 'dark'>('light')

  const getInitialTheme = () => {
    const localStorageTheme = localStorage.getItem('theme')
    if (localStorageTheme !== 'light' && localStorageTheme !== 'dark') {
      const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      theme.value = userTheme
      localStorage.setItem('theme', theme.value)
    } else {
      theme.value = localStorageTheme
    }
  }

  const getUserPreferences = () => {
    getInitialTheme()
    const html = document.documentElement
    if (theme.value === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return {
    getUserPreferences,
    isDark: computed(() => theme.value === 'dark'),
  }
})
