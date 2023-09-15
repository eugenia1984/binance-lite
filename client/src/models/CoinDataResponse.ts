export type CoinDataResponse = {
  status: string
  data: CoinData[]
  message: string
}

export type CoinData = {
  uuid: string
  symbol: string
  name: string
  color: string
  iconUrl: string
  currentPrice: string
  change: string
  marketCap: string
}

