import i18n from '@/plugins/i18n'
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

type Language = 'en' | 'es'

export const useLanguage = () => {
  const language = useLocalStorage<Language>('lang', 'en')
  const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ]

  const setLanguage = (lang: Language) => {
    language.value = lang
  }

  watchEffect(() => {
    if (!LANGUAGE_OPTIONS.some((option) => option.code === language.value)) {
      language.value = 'en'
    }
    i18n.global.locale.value = language.value
  })

  return {
    language,
    languageOptions: LANGUAGE_OPTIONS,
    setLanguage,
  }
}
