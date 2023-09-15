
import { useContext } from 'react'
import  GoogleAuthContext  from '../context/googleContext'
import { UserCredential } from 'firebase/auth'


interface GoogleAuthData {
    signInWithGoogle: () => Promise<UserCredential | null>
  }

const useGoogleAuth = (): GoogleAuthData => {
    const context = useContext(GoogleAuthContext)
    if (!context) {
      throw new Error('useGoogleAuth debe ser utilizado dentro de un GoogleAuthContextProvider')
    }
    return{
        signInWithGoogle: context.signInWithGoogle
    }
  }

export default useGoogleAuth