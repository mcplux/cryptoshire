import coinCapApi from '@/modules/common/api/coin-cap.api'
import type { GetAssetsResponse } from '../interfaces'

export const getAssetsAction = async () => {
  try {
    const {
      data: { data },
    } = await coinCapApi.get<GetAssetsResponse>('/assets')

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong')
  }
}
