import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { RegisterAuth } from '../models/RegisterAuth'

interface AuthMethods {
  registerAuth: (data: RegisterAuth) => Promise<void>
  login: ({ userOrEmail, password, token }) => void
  isLogueado?: boolean
  setIsLogueado?: React.Dispatch<React.SetStateAction<boolean>>,
  loginAuth: any
}

const useAuth = (): AuthMethods | undefined => {
  const authContext = useContext(AuthContext)
  const [isLogueado, setIsLogueado] = useState<boolean>(false)

  useEffect(() => {
    if (authContext) {
      setIsLogueado(true)
    }
  }, [authContext])

  if (!authContext) {
    setIsLogueado(false)
    return undefined // when the context is not defined
  }

  return {
    registerAuth: authContext.registerAuth,
    login: authContext.login,
    isLogueado,
    setIsLogueado,
    loginAuth: authContext.loginAuth
  };
};

export default useAuth
