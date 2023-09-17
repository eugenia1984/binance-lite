import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { loginStyle } from '../login/loginStyle'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { Container, Typography } from "@mui/material"
import { useApiContext } from '../../../context/FetchContext'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgRed } from '../../../utils/styles'

const MontoInput = () => {
  const { coinsData } = useApiContext()
  const location = useLocation()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("")

  const idCoin = new URLSearchParams(location.search).get("coin")

  const coinToShow = coinsData.filter(coin => coin.uuid === idCoin)

  const handleInputChange = (e) => setInputValue(e.target.value)

  const handleClick = () => {
    if (!inputValue) toast.error('Debes ingresar la cantidad')
    if (inputValue) {
      localStorage.setItem('coinToBuy', idCoin)
      localStorage.setItem('amountToBuy', inputValue)
      navigate('/buypaymentmethod')
    }
  }

  return (
    <Container maxWidth="xs" sx={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Toaster
        position="top-center"
        toastOptions={ { duration: 5000, style: toastStyleBgRed } }
      />
      <Typography variant='h2' sx={ loginStyle.typography }>
        Comprar
      </Typography>
      <Typography variant='h3' sx={ { marginTop: "10px" } }>
        Quiero comprar { coinToShow.length > 0 &&
          <>
            <span>{ coinToShow[0]?.name } </span> <img src={ coinToShow[0]?.iconUrl } width="32" height="32" />
          </>
        }
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        placeholder='Ingrese una cantidad'
        value={ inputValue }
        onChange={ handleInputChange }
        fullWidth
        sx={ { margin: "20px auto 30px" } }
      />
      <PrimaryButton
        text='Confirmar'
        onClick={ handleClick }
        sx={ { marginBottom: "40px" } }
        ariaLabelText="Confirmar"
      />
    </Container>
  )
}

export default MontoInput
