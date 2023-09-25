export interface RegisterAuth {
  id?: string,
  email?: string
  password: string
  username?: string
  balance?: string
  celphone?: string
}

export interface LoginAuth {
  userOrEmail?: string
  password: string
  token: string
}

