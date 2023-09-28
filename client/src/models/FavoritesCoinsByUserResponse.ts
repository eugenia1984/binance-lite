export interface FavoritesByUserResponse {
  status: string
  data: FavoritesCoinsList[]
  message: string
}

export interface FavoritesCoinsList {
  userFavoriteId: number
  userId: number
  cryptoId: string
  name: string
  iconUrl: string
}
