import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Crypto } from '../interfaces'
import { getAssetsAction } from '../actions/get-assets.action'

export const useCryptosStore = defineStore('cryptos', () => {
  const cryptos = ref<Crypto[]>([])

  const getCryptos = async () => {
    cryptos.value = await getAssetsAction()
  }

  return {
    cryptos,
    getCryptos,
  }
})
