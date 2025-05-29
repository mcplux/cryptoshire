import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref<Theme>('light')

  const isValidTheme = (value: string): value is Theme => ['light', 'dark'].includes(value)

  const getUserTheme = () => {
    const localStorageTheme = localStorage.getItem('theme') ?? ''
    if (isValidTheme(localStorageTheme)) {
      theme.value = localStorageTheme
    } else {
      const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      theme.value = userTheme
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
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
    toggleTheme,
    isDark: computed(() => theme.value === 'dark'),
  }
})
