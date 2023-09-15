import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { CoinData } from '../../../models/CoinDataResponse'
import { BUY_FAV_MODAL } from './BuyCoinModalStyles'
import { BUY_SELL_FAV_MODAL } from './BuySellCoinModalStyles'

interface BuySellCoinModalProps {
  handleClose: () => void
  openModal: boolean
  cointToShow: CoinData
  urlPathName: string
  btnModalText: string
}
const BuySellCoinModal: React.FC<BuySellCoinModalProps> = ({
  handleClose,
  openModal,
  cointToShow,
  urlPathName,
  btnModalText
}) => {
  const navigate = useNavigate()
  const handleClick = () => navigate(`${ urlPathName }/screen?coin=${ uuid }`)

  const {
    uuid,
    symbol,
    name,
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
            <Typography component="h2" sx={ BUY_SELL_FAV_MODAL.titleH2 }>
              { symbol }
            </Typography>
            <Typography component="h3" sx={ BUY_FAV_MODAL.titleH3 }>
              { name }
            </Typography>
          </Box>
        </Box>
        <DialogContent sx={ { padding: '12px 24px 12px 32px' } }>
          <Typography sx={ BUY_FAV_MODAL.text }>
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
        <DialogActions sx={ { padding: '0px 24px 12px 32px' } }>
          <Button
            autoFocus
            onClick={ handleClick }
            aria-label={`${btnModalText} moneda`}
          >
            { btnModalText }
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}
export default BuySellCoinModal