import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderProvider'
import { URL_GET_FAVORITES_BY_USERID } from '../utils/url'
import { FavoritesByUserResponse, FavoritesCoinsList } from '../models/FavoritesCoinsByUserResponse'

interface FavoriteCoin {
  favoritesList: FavoritesCoinsList[]
  setFavoritesList: React.Dispatch<React.SetStateAction<FavoritesCoinsList[]>>
}

interface FavoriteCoinProviderProps {
  children: ReactNode
}

const FavoriteCoinContext = createContext<FavoriteCoin | undefined>(undefined)

const FavoriteCoinProvider: React.FC<FavoriteCoinProviderProps> = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState<FavoritesCoinsList[]>([])
  const { addLoading, removeLoading } = useLoader()
  const userId = localStorage.getItem('id')

  const fetchFavorites = async () => {
    try {
      addLoading()
      const response = await fetch(`${ URL_GET_FAVORITES_BY_USERID }/${ userId }`)
      if (response.ok) {
        const dataReponse: FavoritesByUserResponse = await response.json()
        const { status, data } = dataReponse

        if (status === 'true') {
          setFavoritesList(data)
        } else {
          throw new Error('La respuesta de la red no fue exitosa.')
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error)
    } finally {
      removeLoading()
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <FavoriteCoinContext.Provider
      value={ { favoritesList, setFavoritesList } }
    >
      { children }
    </FavoriteCoinContext.Provider>
  )
}

export { FavoriteCoinProvider }
export default FavoriteCoinContext