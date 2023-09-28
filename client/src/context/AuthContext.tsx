import React, { ReactNode, createContext, useState } from 'react'
import { LoginAuth, RegisterAuth } from '../models/RegisterAuth'

interface Auth {
  auth: RegisterAuth
  registerAuth: (data: RegisterAuth) => Promise<void>
  login: ({ userOrEmail, password, token }) => void
  favoritesList: any[] // almacenarán las monedas favoritas
  setFavoritesList: (list: any[]) => void, // actualizar la lista de favoritos
  loginAuth: LoginAuth
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<Auth | undefined>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialAuthValues = {
    id: '',
    email: '',
    password: '',
    username: '',
    balance: '',
    celphone: '',
  }

  const initialLoginAutnValues = { token: '', userOrEmail: '', password: '' }

  const [auth, setauth] = useState<RegisterAuth>(initialAuthValues)
  const [loginAuth, setLoginAuth] = useState<LoginAuth>(initialLoginAutnValues)
  const [favoritesList, setFavoritesList] = useState<any[]>([]) // estado para las monedas favoritas

  const registerAuth = async (data: RegisterAuth) => {
    setauth((prevState) => ({
      ...prevState,
      ...data,
    }))
  }

  const login = async (response) => {
    localStorage.setItem('token', response.token)
    localStorage.setItem('userOrEmail', response.userOrEmail)

    setLoginAuth((prevState) => ({
      ...prevState,
      ...response
    }))
  }

  return (
    <AuthContext.Provider
      value={ {
        auth,
        registerAuth,
        login,
        favoritesList,
        setFavoritesList,
        loginAuth
      } }
    >
      { children }
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
