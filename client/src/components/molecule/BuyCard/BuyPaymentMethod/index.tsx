import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Divider, FormControlLabel, FormControl, Radio, RadioGroup, Typography } from '@mui/material'
import { loginStyle } from '../../Login/loginStyle'
import { useApiContext } from '../../../../context/FetchContext'
import { formatCurrencyToTwoDecimals, getAmountToPaid } from '../../../../utils/strings'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgRed } from '../../../../utils/styles'

const BuyPaymentMethod: React.FC = () => {
  const { coinsData } = useApiContext()
  const navigate = useNavigate()
  const [method, setMethod] = useState<string>("")

  const moneda = localStorage.getItem('coinToBuy')
  const cantidad = localStorage.getItem('amountToBuy')
  const coinToShow = coinsData.filter(coin => coin.uuid === moneda)

  const handleMethodChange = (event) => setMethod(event.target.value)

  const handleClick = () => {
    if (!method) toast.error('Debe seleccionar un método de pago')
    if (method) navigate('/agregar-tarjeta')
  }

  return (
    <Container maxWidth="xs" sx={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Toaster
        position="top-center"
        toastOptions={ { duration: 5000, style: toastStyleBgRed } }
      />
      <Typography variant="h2" sx={ loginStyle.typography }>
        Seleccionar metodo de cobro para comprar { coinToShow[0]?.name }
      </Typography>
      { coinToShow.length > 0 &&
        <>
          <Divider sx={ { margin: '12px auto' } } />
          <Typography gutterBottom ml={ 2 } >
            { cantidad } unidades de { coinToShow[0]?.name } <img src={ coinToShow[0]?.iconUrl } width="20" height="20" />
          </Typography>
          <Typography gutterBottom ml={ 2 } >
            $ { formatCurrencyToTwoDecimals(coinToShow[0]?.currentPrice) } precio actual por unidad
          </Typography>
          <Typography gutterBottom ml={ 2 } >
            $ 500 de comisión
          </Typography>
          <Divider sx={ { margin: '12px auto' } } />
          <Typography gutterBottom ml={ 2 } >
            $ { +getAmountToPaid(coinToShow[0]?.currentPrice, cantidad, '500') } total a abonar
          </Typography>
          <Divider sx={ { margin: '12px auto' } } />
        </>
      }
      <FormControl component="fieldset">
        <Typography variant="h3" align="center" my={ 3 }>
          Método de Pago:
        </Typography>
        <RadioGroup
          aria-label="method"
          name="method"
          value={ method }
          onChange={ handleMethodChange }
        >
          <FormControlLabel
            value="tarjeta"
            control={ <Radio /> }
            label="Tarjeta de credito"
          />
          <FormControlLabel
            value="marcado-pago"
            control={ <Radio /> }
            label="Mercado Pago"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={ handleClick }
        sx={ { marginTop: '24px' } }
      >
        Confirmar Método de Pago
      </Button>
    </Container>
  )
}

export default BuyPaymentMethod
