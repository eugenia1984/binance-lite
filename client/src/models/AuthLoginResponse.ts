export type AuthLoginResponse = {
  status: string
  data: Data
  message: string
}

export type Data = {
  id: number
  username: string
  email: string
  balance: string
  celphone: string
  token: string
}
