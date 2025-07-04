import { useLocalStorage } from '@vueuse/core'
import { computed, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = useLocalStorage<Theme>('theme', 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const isDarkMode = computed(() => theme.value === 'dark')

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  })

  return {
    theme,
    toggleTheme,
    isDarkMode,
  }
}
