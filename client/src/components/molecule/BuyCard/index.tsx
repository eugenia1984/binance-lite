import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { loginStyle } from '../Login/loginStyle'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { Container, Typography } from "@mui/material"
import { useApiContext } from '../../../context/FetchContext'

const MontoInput = () => {
  const [inputValue, setInputValue] = useState("")
  const location = useLocation()
  const urlSearch = location.search
  const idCoin = urlSearch.split('=')[1]
  const navigate = useNavigate()
  const { coinsData } = useApiContext()
  
  const coinToShow = coinsData.filter(coin => coin.uuid === idCoin)

  const handleInputChange = (e) => setInputValue(e.target.value)

  const handleClick = () => navigate(`/buypaymentmethod?moneda=${ inputValue }`)

  return (
    <Container maxWidth="xs" sx={ { minHeight: '82vh' } }>
      <Typography
        variant='h2'
        align='left'
        gutterBottom
        sx={ loginStyle.typography }
      >
        Comprar { coinToShow[0]?.name  }
      </Typography>
      <Typography
        variant='h3'
        style={ { marginTop: "20px" } }
      >
        Quiero Comprar
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        placeholder='Ingrese una cantidad'
        value={ inputValue }
        onChange={ handleInputChange }
        fullWidth
        style={ { marginBottom: "20px", marginTop: "10px", marginRight: "15px", } }
      />
      <PrimaryButton
        text='confirmar'
        onClick={ handleClick }
        style={ { marginBottom: "40px" } }
        ariaLabelText="Confirmar"
      />
    </Container>
  )
}

export default MontoInput
