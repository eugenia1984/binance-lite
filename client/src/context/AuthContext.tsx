import React, { ReactNode, createContext, useState } from 'react'
// import { firebaseAuth } from '../firebase/index'
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LoginAuth, RegisterAuth } from '../models/RegisterAuth'

interface Auth {
  auth: RegisterAuth
  registerAuth: ({ email, password, username, balance, celphone }) => void
  login: ({ userOrEmail, password, token }) => void
  favoritesList: any[] // almacenarán las monedas favoritas
  setFavoritesList: (list: any[]) => void, // actualizar la lista de favoritos
  loginAuth: any
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<Auth | undefined>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [auth, setauth] = useState<RegisterAuth>({
    id: '',
    email: "",
    password: "",
    username: "",
    balance: 0,
    celphone: 0,
  });

  const [loginAuth, setLoginAuth] = useState<LoginAuth>({
    token: '',
    userOrEmail: "",
    password: "",
  })

  const [favoritesList, setFavoritesList] = useState<any[]>([]) // estado para las monedas favoritas

  const registerAuth = async (data: RegisterAuth) => {
    setauth((prevState) => ({
      ...prevState,
      ...data,
    }))
  }

  const login = async (data: LoginAuth) => {
    localStorage.setItem('token', data.token)
    setLoginAuth(data)
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
