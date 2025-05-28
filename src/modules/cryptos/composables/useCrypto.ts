import { computed, ref } from 'vue'

import type { Crypto, CryptoHistory } from '../interfaces'
import { getAssetAction, getAssetHistoryAction, getAssetsAction } from '../actions'

enum CryptoStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useCrypto = () => {
  const cryptos = ref<Crypto[]>([])
  const crypto = ref<Crypto | null>(null)
  const cryptoHistory = ref<CryptoHistory[]>([])
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

    const [assetResponse, historyResponse] = await Promise.all([
      getAssetAction(id),
      getAssetHistoryAction(id),
    ])

    if (!assetResponse.ok) {
      crypto.value = null
      cryptoHistory.value = []
      cryptoError.value = assetResponse.msg
      cryptoStatus.value = CryptoStatus.ERROR
      return
    }

    if (!historyResponse.ok) {
      crypto.value = null
      cryptoHistory.value = []
      cryptoError.value = historyResponse.msg
      cryptoStatus.value = CryptoStatus.ERROR
      return
    }

    crypto.value = assetResponse.crypto
    cryptoHistory.value = historyResponse.history
    cryptoError.value = ''
    cryptoStatus.value = CryptoStatus.SUCCESS
  }

  return {
    cryptos,
    crypto,
    cryptoHistory,
    cryptoError,
    getCryptos,
    getCrypto,
    isSuccess: computed(() => cryptoStatus.value === CryptoStatus.SUCCESS),
    isLoading: computed(() => cryptoStatus.value === CryptoStatus.LOADING),
    isError: computed(() => cryptoStatus.value === CryptoStatus.ERROR),
  }
}
