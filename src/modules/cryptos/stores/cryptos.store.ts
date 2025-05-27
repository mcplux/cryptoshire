import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Crypto } from '../interfaces'
import { getAssetsAction } from '../actions/get-assets.action'

enum CryptoStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useCryptosStore = defineStore('cryptos', () => {
  const cryptos = ref<Crypto[]>([])

  const cryptoStatus = ref<CryptoStatus>(CryptoStatus.SUCCESS)

  const getCryptos = async () => {
    cryptoStatus.value = CryptoStatus.LOADING
    try {
      cryptos.value = await getAssetsAction()
      cryptoStatus.value = CryptoStatus.SUCCESS
    } catch (error) {
      console.error(error)
      cryptoStatus.value = CryptoStatus.ERROR
    }
  }

  return {
    cryptos,
    getCryptos,
    isSuccess: computed(() => cryptoStatus.value === CryptoStatus.SUCCESS),
    isLoading: computed(() => cryptoStatus.value === CryptoStatus.LOADING),
    isError: computed(() => cryptoStatus.value === CryptoStatus.ERROR),
  }
})
