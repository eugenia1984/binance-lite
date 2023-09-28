import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import { CoinData } from '../../../models/CoinDataResponse'
import { useNavigate } from 'react-router-dom'
import { useLoader } from '../../../context/LoaderProvider'
import { BUY_COIN } from './BuyCoinStyles'
import { getAmountToPaid, getSrcImg } from '../../../utils/strings'
import toast, { Toaster } from 'react-hot-toast'
import { URL_CRYPTOCURRENCY_BY_ID } from '../../../utils/url'
import { toastStyleBgGreen } from '../../../utils/styles'
import useAuth from '../../../hooks/useAuth'

const BuyCoin = () => {
  const { addLoading, removeLoading } = useLoader()
  const auth = useAuth()
  const { registerAuth } = auth
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinData | undefined>(undefined)

  const id = localStorage.getItem('coinToBuy')
  const cantidad = localStorage.getItem('amountToBuy')

  const getCoinId = async () => {
    try {
      addLoading()
      const response = await axios.get(`${ URL_CRYPTOCURRENCY_BY_ID }/${ id }`)
      const coinData: CoinData = response.data
      setCoin(coinData)
    } catch (error) {
      toast.error('Error al buscar la moneda a comprar')
    } finally {
      removeLoading()
    }
  }

  useEffect(() => {
    getCoinId()
  }, [])

  useEffect(() => {
    if (coin) {
      const { currentPrice } = coin
      const newAmount = +(localStorage.getItem('balance')) + +currentPrice * +(localStorage.getItem('amountToBuy'))
      // TODO: update the user with the new amount
      registerAuth({ balance: newAmount.toString() })
      // Update the key amount in the localStorage
      localStorage.setItem('balance', newAmount.toString())
    }
  }, [coin])

  const handleCompraClick = () => {
    toast.success('Compra realizada correctamente. Aguarde que estamos llegando a Market.')
    // once the buy it's ok delete the localStorage
    localStorage.removeItem('coinToBuy')
    localStorage.removeItem('amountToBuy')
    setTimeout(() => {
      navigate('/wallets')
    }, 5000)
  }

  return (
    <Box sx={ BUY_COIN.boxContainer } >
      <Toaster
        position="top-center"
        toastOptions={ { duration: 4000, style: toastStyleBgGreen } }
      />
      { coin &&
        <Card sx={ BUY_COIN.cardContainer }>
          <CardMedia
            component="img"
            sx={ { height: '160px', width: '160px', margin: '0 auto' } }
            image={ getSrcImg(coin.iconUrl) }
            title={ coin.name }
          />
          <CardContent>
            <Typography gutterBottom variant="h2" >
              Moneda: { coin.name }
            </Typography>
            <Typography gutterBottom variant="h3" >
              Simbolo: { coin.symbol }
            </Typography>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Precio: $ { coin.currentPrice }
            </Typography>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Cantidad: { cantidad }
            </Typography>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Fee: $ 500
            </Typography>
            <Divider />
            <Typography variant="h4" gutterBottom my={ 2 } >
              Total a abonar: $ { +getAmountToPaid(coin.currentPrice, cantidad, '500') }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={ handleCompraClick } aria-label="Comprar">
              Comprar
            </Button>
          </CardActions>
        </Card>
      }
    </Box>
  )
}

export default BuyCoin
