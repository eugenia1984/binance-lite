import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { CoinData } from '../../../models/CoinDataResponse'
import { BUY_FAV_MODAL } from './BuyCoinModalStyles'

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

  const navigate = useNavigate()
  const handleClick = () => navigate(`/buy/screen?coin=${ uuid }`)

  // TODO hay que agarrar al usuario y con eso traer los favoritos para ver si es favorito o no y setearlo
  const [isFavorite, setIsFavorite] = useState<boolean>(true)

  const handleFavorite = () => {
    // TODO aca la logica de agregar de agarrar al usuario
    setIsFavorite(isFavorite => !isFavorite)
  }

  const {
    uuid,
    symbol,
    name,
    color,
    iconUrl,
    currentPrice,
    change,
    marketCap
  } = cointToShow
  return (
    <section id="modal-favorito-comprar">
      <Dialog
        onClose={ handleClose }
        aria-labelledby="cerrar modal"
        open={ openModal }
      >
        <Box
          component="div"
          sx={ BUY_FAV_MODAL.container }
        >
          <IconButton
            aria-label="close"
            onClick={ handleClose }
            sx={ { color: (theme) => theme.palette.grey[500], } }
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={ BUY_FAV_MODAL.title }
          id="buy-icon-modal-title"
        >
          <Box>
            <Typography
              component="h2"
              sx={ BUY_FAV_MODAL.titleH2 }
            >
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
        <DialogContent
          sx={ { padding: '12px 24px 12px 32px' } }
        >
          <Typography
            sx={ BUY_FAV_MODAL.text }
          >
            ${ marketCap }
          </Typography>
          <Box>
            <img src={ iconUrl } alt={ name } width="100" height="100" />
          </Box>
          <Typography
            sx={ BUY_FAV_MODAL.text }
          >
            { currentPrice }
          </Typography>
          <Typography
            sx={ BUY_FAV_MODAL.text }
          >
            { change }%
          </Typography>
        </DialogContent>
        <DialogActions
          sx={ { padding: '0px 24px 12px 32px' } }
        >
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