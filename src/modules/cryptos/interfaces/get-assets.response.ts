import type { Crypto } from './crypto.interface'

export interface GetAssetsResponse {
  data: Crypto[]
  timestamp: number
}
