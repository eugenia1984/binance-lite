export interface RegisterAuth {
  id?: string,
  email?: string
  password: string
  username?: string
  balance?: number
  celphone?: number
}

export interface LoginAuth {
  userOrEmail?: string
  password: string
  token: string
}

