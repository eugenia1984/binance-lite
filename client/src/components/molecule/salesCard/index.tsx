import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { loginStyle } from '../Login/loginStyle'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { Container, Typography } from "@mui/material"
import { useApiContext } from '../../../context/FetchContext'

const NumericInput = () => {
  const { coinsData } = useApiContext()
  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const idCoin = new URLSearchParams(location.search).get("coin")

  const coinToShow = coinsData.filter(coin => coin.uuid === idCoin)

  const handleInputChange = (e) => setInputValue(e.target.value)

  const handleClick = () => navigate(`/paymentmethod?moneda=${ inputValue }`)

  return (
    <Container maxWidth="xs" sx={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Typography
        variant='h2'
        align='left'
        gutterBottom
        sx={ loginStyle.typography }
      >
        Vender { coinToShow[0]?.name }
      </Typography>
      <Typography variant="h3" style={ { margin: "20px 0px 10px" } }>
        Quiero vender
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        placeholder='Ingrese un importe'
        value={ inputValue }
        onChange={ handleInputChange }
        fullWidth
        sx={ { marginBottom: "20px", marginTop: "10px", marginRight: "15px", } }
      />
      <PrimaryButton
        ariaLabelText='Confirmar'
        text='Confirmar'
        onClick={ handleClick }
        sx={ { marginBottom: "40px" } }
      />
    </Container>
  )
}

export default NumericInput