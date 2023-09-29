import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { CoinData } from '../../../models/CoinDataResponse'
import { BUY_FAV_MODAL } from './BuyCoinModalStyles'
import { useLoader } from '../../../context/LoaderProvider'
import { URL_DELETE_FAVORITE_BY_USEDI, URL_POST_FAVORITES_BY_USERID } from '../../../utils/url'
import useFavorites from '../../../hooks/useFavorites'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgBlack } from '../../../utils/styles'

interface BuyCoinModalProps {
  handleClose: () => void
  openModal: boolean
  cointToShow: CoinData
}

const BuyCoinModal: React.FC<BuyCoinModalProps> = ({
  handleClose,
  openModal,
  cointToShow
}) => {
  const { uuid, symbol, name, color, iconUrl, currentPrice, change, marketCap } = cointToShow
  const userId = localStorage.getItem('id')
  const navigate = useNavigate()
  const { addLoading, removeLoading } = useLoader()
  const { favoritesList } = useFavorites()

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const isFavoriteInitialState = favoritesList.some(favorite => favorite.cryptoId === uuid)
    setIsFavorite(isFavoriteInitialState)
  }, [favoritesList, uuid])

  const handleClick = () => navigate(`/buy/screen?coin=${ uuid }`)

  const cryptoCoinIsAlreadyFavorite = favoritesList.some((item) => item.cryptoId === uuid)

  const addToFavorites = async () => {
    // First cheeck if it`s already a favorite coin
    if (cryptoCoinIsAlreadyFavorite) return toast.error('La cryptomoneda ya esta en favoritos.')

    // If it`s not already a favorite coint I make the fetch
    try {
      addLoading()
      const response = await fetch(`${ URL_POST_FAVORITES_BY_USERID }`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cryptoId: [uuid]
        })
      })

      if (!response.ok) return toast.error('Error al agregar la cryptomoneda a favoritos.')

      if (response.ok) {
        const dataReponse = await response.json()
        const { status, message } = dataReponse

        if (status === 'false') return toast.error(`Error. ${ message }`)

        if (status === 'true') {
          toast.success(message)
          setIsFavorite(isFavorite => !isFavorite)
          return
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

  const deleteFromFavorites = async () => {
    // First cheeck if it isn't a favorite coin
    if (!cryptoCoinIsAlreadyFavorite) return toast.error('La crtyptomoneda no esta en favoritos.')

    // Then delete the cryptocurrency
    try {
      addLoading()
      const response = await fetch(`${ URL_DELETE_FAVORITE_BY_USEDI }/${ userId }/${ uuid }`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })

      if (!response.ok) return toast.error('Error al eliminar la cryptomoneda de favoritos.')

      if (response.ok) {
        const dataReponse = await response.json()
        const { status } = dataReponse

        if(status === 'true') {
          toast.success('Cryptomoneda eliminada correctamente de favoritos.')
          setIsFavorite(isFavorite => !isFavorite)
          return
        } else {
          throw new Error('La cryptomoneda no pudo ser eliminada de favoritos.')
        }
      }

    } catch (error) {
      console.error("Error al obtener los datos:", error)
    } finally {
      removeLoading()
    }
  }

  const handleFavorite = () => {
    if (isFavorite) return deleteFromFavorites()
    if (!isFavorite) return addToFavorites()
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={ { duration: 5000, style: toastStyleBgBlack } }
      />
      <section id="modal-favorito-comprar">
        <Dialog
          onClose={ handleClose }
          aria-labelledby="cerrar modal"
          open={ openModal }
        >
          <Box component="div" sx={ BUY_FAV_MODAL.container }>
            <IconButton
              aria-label="close"
              onClick={ handleClose }
              sx={ { color: (theme) => theme.palette.grey[500] } }
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={ BUY_FAV_MODAL.title } id="buy-icon-modal-title" >
            <Box>
              <Typography component="h2" sx={ BUY_FAV_MODAL.titleH2 } >
                { symbol }
              </Typography>
              <Typography
                component="h3"
                sx={ BUY_FAV_MODAL.titleH3 }
              >
                { name }
              </Typography>
            </Box>
            <Box>
              <Box
                component="span"
                sx={ BUY_FAV_MODAL.icon }
                onClick={ handleFavorite }
              >
                { isFavorite ?
                  <StarIcon sx={ { color: color } } fontSize="large" />
                  : <StarBorderIcon sx={ { color: color } } fontSize="large" />
                }
              </Box>
            </Box>
          </Box>
          <DialogContent sx={ { padding: '12px 24px 12px 32px' } }>
            <Typography sx={ BUY_FAV_MODAL.text } >
              ${ marketCap }
            </Typography>
            <Box>
              <img src={ iconUrl } alt={ name } width="100" height="100" />
            </Box>
            <Typography sx={ BUY_FAV_MODAL.text }>
              { currentPrice }
            </Typography>
            <Typography sx={ BUY_FAV_MODAL.text }>
              { change }%
            </Typography>
          </DialogContent>
          <DialogActions sx={ { padding: '0px 24px 12px 32px' } }>
            <Button
              autoFocus
              onClick={ handleClick }
              aria-label="Comprar"
            >
              Comprar
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </>
  )
}
export default BuyCoinModal