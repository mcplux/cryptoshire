import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import i18n from '@/plugins/i18n'

type Theme = 'light' | 'dark'
type Language = 'en' | 'es'

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref<Theme>('light')
  const language = ref<Language>('en')

  const VALID_THEMES: Theme[] = ['light', 'dark']
  const VALID_LANGUAGES: Language[] = ['en', 'es']
  const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ]

  const isValidTheme = (value: string): value is Theme => VALID_THEMES.includes(value as Theme)

  const getUserTheme = () => {
    const localStorageTheme = localStorage.getItem('theme') ?? ''
    let chosenTheme: Theme
    if (isValidTheme(localStorageTheme)) {
      chosenTheme = localStorageTheme
    } else {
      chosenTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    theme.value = chosenTheme
    localStorage.setItem('theme', chosenTheme)
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const isValidLanguage = (value: string): value is Language =>
    VALID_LANGUAGES.includes(value as Language)

  const getUserLanguage = () => {
    const localStorageLanguage = localStorage.getItem('lang') ?? ''
    let chosenLanguage: Language
    if (isValidLanguage(localStorageLanguage)) {
      chosenLanguage = localStorageLanguage
    } else {
      const browserLanguage = navigator.language.split('-')[0]
      chosenLanguage = isValidLanguage(browserLanguage) ? browserLanguage : 'en'
    }
    language.value = chosenLanguage
    i18n.global.locale.value = chosenLanguage
    localStorage.setItem('lang', chosenLanguage)
  }

  const setLanguage = (lang: Language) => {
    language.value = lang
  }

  watch(theme, (newTheme) => {
    const html = document.documentElement
    html.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  })

  watch(language, (newLang) => {
    localStorage.setItem('lang', newLang)
    i18n.global.locale.value = newLang
  })

  return {
    getUserTheme,
    toggleTheme,
    getUserLanguage,
    setLanguage,
    selectedLanguage: computed(() => language.value),
    languageOptions: LANGUAGE_OPTIONS,
    isDark: computed(() => theme.value === 'dark'),
  }
})
