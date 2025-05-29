<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/16/solid'

import { usePreferencesStore } from '../stores/preferences.store'

const preferencesStore = usePreferencesStore()

const selectedLanguage = ref(preferencesStore.languageOptions[0])

watch(selectedLanguage, (newLang) => {
  preferencesStore.setLanguage(newLang.code)
})

onMounted(() => {
  selectedLanguage.value =
    preferencesStore.languageOptions.find(
      (lang) => lang.code === preferencesStore.selectedLanguage,
    ) ?? preferencesStore.languageOptions[0]
})
</script>

<template>
  <div class="w-32 sm:w-48">
    <Listbox v-model="selectedLanguage">
      <div class="relative mt-1">
        <ListboxButton
          class="w-full cursor-pointer rounded-lg bg-blue-600 dark:bg-slate-500 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none"
        >
          <span class="block truncate">{{ selectedLanguage.label }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="size-5" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg focus:outline-none text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in preferencesStore.languageOptions"
              :key="person.code"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-blue-100 text-blue-900 dark:bg-gray-100 dark:text-gray-900'
                    : 'text-gray-900 dark:text-gray-100',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span :class="[selected ? 'font-bold' : 'font-normal', 'block truncate']">{{
                  person.label
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-gray-400"
                >
                  <CheckIcon class="size-5" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
