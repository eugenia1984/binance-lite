import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { CoinData } from '../../../models/CoinDataResponse'
import { BUY_FAV_MODAL } from './BuyCoinModalStyles'
import FavoriteCoinContext from '../../../context/FavoriteCoinContext'
import { useLoader } from '../../../context/LoaderProvider'
import { URL_POST_FAVORITES_BY_USERID } from '../../../utils/url'

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
  const { addLoading, removeLoading } = useLoader()
  const { favoritesList, setFavoritesList } = useContext(FavoriteCoinContext)
  const userId = localStorage.getItem('id')
  const navigate = useNavigate()

  const { uuid, symbol, name, color, iconUrl, currentPrice, change, marketCap } = cointToShow

  const isFavoriteInitialState = favoritesList.some(favorite => favorite.cryptoId === uuid)

  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteInitialState)

  const handleClick = () => navigate(`/buy/screen?coin=${ uuid }`)

  const addToFavorites = async () => {
    // TODO: de favoritesList agarray y armar un arrai con los id(cryptoId) y agregarle el uuid del click para poner en el array cryptoId
    try {
      addLoading()
      const response = await fetch(`${ URL_POST_FAVORITES_BY_USERID }/${ userId }`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cryptoId: [] // aca va el uuid que ya tengo en favoritos mas el uuid del que hice click
        })
      })

      if (response.ok) {
        const dataReponse = await response.json()
        const { status, data } = dataReponse
        if (status === 'true') {

          /* Me da una respuesta como esta
            Response body
            Download
            {
              "status": "true",
              "data": [
                {
                  "userId": 33,
                  "cryptoId": "2b53d2f6a4e9b",
                  "id": 2
                }
              ],
              "message": "Guardado correctamente"
            }
            Puedo usar el message para el Toast*/
          //setFavoritesList(data)
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

  const deleteFromFavorites = () => { }

  const handleFavorite = () => {
    if (isFavorite) {
      // TODO: cambiar en el context y sacarlo de la lista de favoritos -> setFavoritesList
      deleteFromFavorites()
      setIsFavorite(isFavorite => !isFavorite)
    }

    if (!isFavorite) {
      addToFavorites()
      setIsFavorite(isFavorite => !isFavorite)
    }
  }

  return (
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
            sx={ { color: (theme) => theme.palette.grey[500], } }
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
  )
}
export default BuyCoinModal