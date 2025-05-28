import { computed, ref } from 'vue'

import type { Crypto } from '../interfaces'
import { getAssetAction, getAssetsAction } from '../actions'

enum CryptoStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useCrypto = () => {
  const cryptos = ref<Crypto[]>([])
  const crypto = ref<Crypto | null>(null)
  const cryptoError = ref('')

  const cryptoStatus = ref<CryptoStatus>(CryptoStatus.SUCCESS)

  const getCryptos = async (): Promise<void> => {
    cryptoStatus.value = CryptoStatus.LOADING

    const response = await getAssetsAction()
    if (!response.ok) {
      cryptos.value = []
      cryptoError.value = response.msg
      cryptoStatus.value = CryptoStatus.ERROR
      return
    }

    cryptos.value = response.cryptos
    cryptoError.value = ''
    cryptoStatus.value = CryptoStatus.SUCCESS
  }

  const getCrypto = async (id: string): Promise<void> => {
    cryptoStatus.value = CryptoStatus.LOADING

    const response = await getAssetAction(id)
    if (!response.ok) {
      crypto.value = null
      cryptoError.value = response.msg
      cryptoStatus.value = CryptoStatus.ERROR
      return
    }
    crypto.value = response.crypto
    cryptoError.value = ''
    cryptoStatus.value = CryptoStatus.SUCCESS
  }

  return {
    cryptos,
    crypto,
    cryptoError,
    getCryptos,
    getCrypto,
    isSuccess: computed(() => cryptoStatus.value === CryptoStatus.SUCCESS),
    isLoading: computed(() => cryptoStatus.value === CryptoStatus.LOADING),
    isError: computed(() => cryptoStatus.value === CryptoStatus.ERROR),
  }
}
