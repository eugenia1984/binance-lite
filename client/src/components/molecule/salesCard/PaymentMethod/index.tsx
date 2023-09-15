import { Button, Container, Typography } from '@mui/material'
import { loginStyle } from '../../Login/loginStyle'
import { useLocation, useNavigate } from 'react-router'

const PaymentMethod = () => {
  const location = useLocation()
  const moneda = new URLSearchParams(location.search).get("moneda")
  const navigate = useNavigate()
 
  
  
  
  
  
  const handleClick = () => navigate("/sell-coin")


  return (
    <Container maxWidth="xs" sx={ { minHeight: '82vh' } }>
      <Typography
        variant='h2'
        align='center'
        gutterBottom
        sx={ loginStyle.typography }
        style={ { marginBottom: "50px" } }
      >
        Se realizará la venta de :
      </Typography>
      <Typography variant="h1" align="center" marginBottom="20px">
        { moneda } unidades
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        aria-label="Confirmar Método de Pago"
      >
        Confirmar
      </Button>
    </Container>
  )
}

export default PaymentMethod