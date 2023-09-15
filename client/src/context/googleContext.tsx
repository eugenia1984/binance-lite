import { ReactNode, createContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';


// Define el tipo para la autenticación de Google
interface GoogleAuthData {
  signInWithGoogle: () => Promise<UserCredential | null>;
  googleUser: UserCredential
}
interface AuthProviderProps {
    children: ReactNode
}

// Crea un contexto para la autenticación de Google
const GoogleAuthContext = createContext<GoogleAuthData | undefined>(undefined);

// Proveedor de contexto de autenticación de Google
const GoogleAuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [googleUser, setGoogleUser] = useState<UserCredential | null>(null)

  // Función para iniciar sesión con Google
  const signInWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      const result = await signInWithPopup(FirebaseAuth, googleProvider);
      setGoogleUser(result)
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      return null;
    }
  };

  return (
    <GoogleAuthContext.Provider value={{ signInWithGoogle, googleUser }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthContext
export { GoogleAuthContextProvider }




