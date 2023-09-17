import { useNavigate } from 'react-router-dom'
import { ImageList, Typography, Container, Box, ImageListItem } from '@mui/material'
import { LOGIN_STYLES } from './LoginFormStyles'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import Person2Icon from '@mui/icons-material/Person2'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

const LoginForm = () => {
  const navigate = useNavigate()

  return (
    <main style={ { margin: '1rem auto 150px', minHeight: '82vh' } }>
      <Container maxWidth="sm" sx={ LOGIN_STYLES.container }>
        <Box sx={ LOGIN_STYLES.box }>
          <ImageList sx={ { width: 100, height: 100 } }>
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
            Inscríbete para conseguir 1000 USDT de saldo inicial
          </Typography>
          <Box sx={ LOGIN_STYLES.btnContainer }>
            <PrimaryButton
              text=" Regístrate"
              ariaLabelText="Regístrate"
              variant="contained"
              color="primary"
              icon={ <AppRegistrationIcon /> }
              onClick={ () => navigate("/register/continue") }
              sx={ { width: '260px' } }
            />
            <Typography sx={ LOGIN_STYLES.txt2 }>
              ¿Ya tiene una cuenta?
            </Typography>
            <Typography sx={ LOGIN_STYLES.txtLink }>
              <PrimaryButton
                text="Iniciar sesión"
                ariaLabelText="Iniciar sesión"
                variant="contained"
                color="secondary"
                icon={ <Person2Icon /> }
                onClick={ () => navigate("/login") }
                sx={ { width: '260px' } }
              />
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  )
}

export default LoginForm
