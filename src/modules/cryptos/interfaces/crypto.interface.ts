export interface Crypto {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: null | string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: null | string
  explorer: null | string
  tokens: { [key: string]: string[] }
}
