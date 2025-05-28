import coinCapApi from '@/modules/common/api/coin-cap.api'
import type { Crypto } from '../interfaces'
import { isAxiosError } from 'axios'

type GetAssetResponse =
  | {
      ok: true
      crypto: Crypto
    }
  | {
      ok: false
      msg: string
    }

export const getAssetAction = async (id: string): Promise<GetAssetResponse> => {
  try {
    const { data } = await coinCapApi.get<{
      data: Crypto
      timestamp: number
    }>(`/assets/${id}`)

    return {
      ok: true,
      crypto: data.data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 404) {
      return {
        ok: false,
        msg: 'Cryptocurrency not found',
      }
    }

    console.error(error)
    return {
      ok: false,
      msg: 'Something went wrong while fetching crypto',
    }
  }
}
