import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Grid,
  Slide,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { TransitionProps } from '@mui/material/transitions'
import { BUY_SELL_STYLES } from './BuySellModalStyles'
import { useNavigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ ref } { ...props } />;
})

interface BuyDepositModalProps {
  openBuyDepositModal: boolean
  handleCloseBuyDepositModal: () => void
}

const BuyDepositModal: React.FC<BuyDepositModalProps> = ({
  openBuyDepositModal,
  handleCloseBuyDepositModal
}) => {
  const navigate = useNavigate()
  const handleBuy = () => navigate('/buy')
  const handleSell = () => navigate('/sell')

  return (
    <Dialog
      open={ openBuyDepositModal }
      TransitionComponent={ Transition }
      keepMounted
      onClose={ handleCloseBuyDepositModal }
      aria-describedby="comprar o vender"
    >
      <Box component="div" sx={ { heigth: '50px' } }>
        <IconButton aria-label="close" onClick={ handleCloseBuyDepositModal } sx={ BUY_SELL_STYLES.xIcon } >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogActions sx={ BUY_SELL_STYLES.dialogActions }>
        <Grid container sx={ BUY_SELL_STYLES.actionsContainer }>
          <Grid item xs={ 3 }>
            <Button aria-label="comprar" onClick={ handleBuy } sx={ BUY_SELL_STYLES.actionsBtn } >
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs={ 9 }>
            <DialogTitle id="compra-title" sx={ BUY_SELL_STYLES.title }>
              Comprar
            </DialogTitle>
            <DialogContent sx={ BUY_SELL_STYLES.content }>
              <DialogContentText id="compra-description" >
                Compra activos con ARS
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Grid>
        <Grid container sx={ BUY_SELL_STYLES.actionsContainerLast }>
          <Grid item xs={ 3 }>
            <Button aria-label="vender" onClick={ handleSell } sx={ BUY_SELL_STYLES.actionsBtn } >
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item xs={ 9 }>
            <DialogTitle id="vender-title" sx={ BUY_SELL_STYLES.title }>
              Vender
            </DialogTitle>
            <DialogContent sx={ BUY_SELL_STYLES.content }>
              <DialogContentText id="vender-description">
                Vende activos a ARS
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default BuyDepositModal