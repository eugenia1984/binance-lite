import { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderProvider'
import { FavoritesByUserResponse, FavoritesCoinsList } from '../models/FavoritesCoinsByUserResponse'
import { URL_GET_FAVORITES_BY_USERID } from '../utils/url'

const useFavorites = () => {
  const userId = localStorage.getItem('id')
  const { addLoading, removeLoading } = useLoader()

  const [favoritesList, setFavoritesList] = useState<FavoritesCoinsList[]>([])

  useEffect(() => {
    const getFavorites = async () => {
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

    getFavorites()
  }, [])

  return { favoritesList, setFavoritesList }
}

export default useFavorites