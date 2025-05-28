import coinCapApi from '@/modules/common/api/coin-cap.api'
import type { Crypto } from '../interfaces'

type GetAssetsResponse =
  | {
      ok: true
      cryptos: Crypto[]
    }
  | {
      ok: false
      msg: string
    }

export const getAssetsAction = async (): Promise<GetAssetsResponse> => {
  try {
    const { data } = await coinCapApi.get<{
      data: Crypto[]
      timestamp: number
    }>('/assets')

    return {
      ok: true,
      cryptos: data.data,
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      msg: 'Something went wrong while fetching cryptos',
    }
  }
}
