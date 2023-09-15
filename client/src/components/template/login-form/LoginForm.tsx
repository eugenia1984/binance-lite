import { useNavigate } from 'react-router-dom'
import { ImageList, Typography, Container, Box, ImageListItem } from '@mui/material'
import { LOGIN_STYLES } from './LoginFormStyles'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import Person2Icon from '@mui/icons-material/Person2'

const LoginForm = () => {
  const navigate = useNavigate()

  return (
    <main style={ { minHeight: "80vh" } }>
      <Container maxWidth="sm" sx={ LOGIN_STYLES.container }>
        <Box sx={ LOGIN_STYLES.box }>
          <ImageList sx={ { width: 120, height: 120 } }>
            <ImageListItem>
              <img
                src={ "../../binance-64.png" }
                alt="logo de Binance"
                loading="lazy"
                style={ { width: "200%", height: "auto" } }
              />
            </ImageListItem>
          </ImageList>
          <Typography sx={ LOGIN_STYLES.txt }>
            Inscríbete para conseguir 100 USDT de descuento en la comisión de
            trading
          </Typography>
          <Box sx={ LOGIN_STYLES.btnContainer }>
            <PrimaryButton
              text="Regístrate con correo o telefono"
              ariaLabelText=""
              variant="contained"
              color="primary"
              icon={ <Person2Icon /> }
              onClick={ () => navigate("/register/continue") }
            />
            <Typography sx={ LOGIN_STYLES.txt2 }>
              ¿Ya tiene una cuenta?
            </Typography>
            <Typography sx={ LOGIN_STYLES.txtLink }>
              <PrimaryButton
                text="Iniciar sesión"
                ariaLabelText=""
                variant="contained"
                color="secondary"
                onClick={ () => navigate("/login") }
              />
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  )
}

export default LoginForm
