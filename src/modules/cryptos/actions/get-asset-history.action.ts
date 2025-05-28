import coinCapApi from '@/modules/common/api/coin-cap.api'
import type { CryptoHistory } from '../interfaces'

type GetAssetHistoryResponse =
  | {
      ok: true
      history: CryptoHistory[]
    }
  | {
      ok: false
      msg: string
    }

export const getAssetHistoryAction = async (id: string): Promise<GetAssetHistoryResponse> => {
  try {
    const { data } = await coinCapApi.get<{
      data: CryptoHistory[]
      timestamp: number
    }>(`/assets/${id}/history?interval=d1`)

    return {
      ok: true,
      history: data.data,
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      msg: 'Something went wrong while fetching crypto',
    }
  }
}
