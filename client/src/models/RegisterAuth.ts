export interface RegisterAuth {
  id?: string,
  email?: string
  password: string
  username?: string
  balance?: number
  celphone?: number
}
// export interface GoogleAuth {
//   email?: string
//   displayName?: string,
//   photoURL?: string,
//   uid?: string,
//   token?: string
// }

export interface LoginAuth {
  userOrEmail?: string
  password: string
  token: string
}

export interface CoinData {
  change: string 
  color: string 
  currentPrice: string 
  iconUrl:  string
  marketCap: string 
  name: string
  symbol:  string
  uuid: string 

}
