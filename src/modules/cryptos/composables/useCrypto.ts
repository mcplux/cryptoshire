import { computed, ref } from 'vue'

import { getAssetsAction } from '../actions/get-assets.action'
import type { Crypto } from '../interfaces'

enum CryptoStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useCrypto = () => {
  const cryptos = ref<Crypto[]>([])
  const cryptoError = ref('')

  const cryptoStatus = ref<CryptoStatus>(CryptoStatus.SUCCESS)

  const getCryptos = async () => {
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

  return {
    cryptos,
    cryptoError,
    getCryptos,
    isSuccess: computed(() => cryptoStatus.value === CryptoStatus.SUCCESS),
    isLoading: computed(() => cryptoStatus.value === CryptoStatus.LOADING),
    isError: computed(() => cryptoStatus.value === CryptoStatus.ERROR),
  }
}
