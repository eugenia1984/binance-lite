import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Container, InputLabel, Typography, TextField } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { PERSONAL_STYLES } from './PersonalAccountStyles'
import useAuth from '../../../hooks/useAuth'
import { emailRegex } from '../../../utils/constants'
import { URL_REGISTER } from '../../../utils/url'
import { randomPhone } from '../../../helpers/RandonName'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgBlack } from '../../../utils/styles'
import { useLoader } from '../../../context/LoaderProvider'

const PersonalAccount: React.FC = () => {
  const auth = useAuth()
  const { registerAuth } = auth
  const { addLoading, removeLoading } = useLoader()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const balance = 0
  const celphone = randomPhone()
  const isValidEmail = emailRegex.test(email)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value

    if (isValidEmail) {
      setEmail(inputEmail)
      setErrorEmail(null)
      // set the user name
      const newUserName = email.split("@")[0]
      setUsername(newUserName)
    } else {
      setEmail(inputEmail)
      setErrorEmail('X - Correo electrónico no válido')
    }
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value

    if (inputPassword.length > 6) {
      setPassword(inputPassword)
      setErrorPassword(null)
    } else {
      setPassword(inputPassword)
      setErrorPassword('X - La contraseña es obligatoria y debe tener más de 6 caracteres')
    }
    setPassword(inputPassword)
  }

  const handleNextClick = () => {
    if (!email) {
      toast.error('El email es obligatorio')
      return
    }

    setShowPassword(true)
  }

  const handleRegister = async () => {
    if (!password || password.length < 6) {
      toast.error('El password es obligatorio y debe tener más de 6 caracteres')
      return
    }

    try {
      addLoading()
      const response = await axios.post(URL_REGISTER, {
        email,
        password,
        username,
        balance,
        celphone,
      })

      if (response.data?.status === 'true') {
        toast.success(`Bienvenido/a ${ email }. Registro con Exito! Seras redireccionado/a al Login`)
        registerAuth({ email, password, username, balance, celphone })

        setTimeout(() => {
          navigate("/login")
        }, 5000)

      } else {
        toast.error('Error al registrarse. Por favor, intenta nuevamente más tarde.')
      }
    } catch (error) {
      toast.error('Error al registrarse. Por favor, intenta nuevamente más tarde.')
    } finally {
      removeLoading()
    }
  }

  if (!auth) { // if the context is not defined
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se puede registrar
      </Alert>
    )
  }

  return (
    <main style={ PERSONAL_STYLES.main }>
      <Container maxWidth="sm" sx={ PERSONAL_STYLES.container }>
        <Toaster
          position="top-center"
          toastOptions={ {
            duration: 4000,
            style: toastStyleBgBlack,
          } }
        />
        <Box sx={ PERSONAL_STYLES.boxContainer }>
          <Typography variant="h1" component="h2" sx={ PERSONAL_STYLES.title }>
            Crea tu cuenta
          </Typography>
          <form style={ { maxWidth: "400px" } }>
            <InputLabel htmlFor="register-email" sx={ PERSONAL_STYLES.label }>
              Correo electrónico
            </InputLabel>
            <TextField
              type="text"
              id="register-email"
              placeholder="Ingresa el correo electrónico..."
              variant="filled"
              fullWidth
              value={ email }
              onChange={ handleEmail }
              error={ Boolean(errorEmail) }
              helperText={ errorEmail }
              sx={ { marginBottom: '20px' } }
            />
            { showPassword &&
              <>
                <InputLabel htmlFor="rregister-passwordl" sx={ PERSONAL_STYLES.label }>
                  Contraseña
                </InputLabel>
                <TextField
                  type="password"
                  id="register-password"
                  placeholder="Ingresa la contraseña..."
                  variant="filled"
                  fullWidth
                  value={ password }
                  onChange={ handlePassword }
                  error={ Boolean(errorPassword) }
                  helperText={ errorPassword }
                  sx={ { marginBottom: '20px' } }
                />
              </>
            }
            <Typography my={ 4 } gutterBottom>
              Al crear una cuenta, acepto las
              <Box component="span" sx={ PERSONAL_STYLES.textBold }>
                condiciones de servicio
              </Box>
              y las
              <Box component="span" sx={ PERSONAL_STYLES.textBold }>
                política de privacidad
              </Box>
              de
              <Box component="span" sx={ PERSONAL_STYLES.textBold }>
                Binance
              </Box>
            </Typography>
            <PrimaryButton
              text={ !showPassword ? "Siguiente" : "Registrarse" }
              ariaLabelText="Continuar"
              variant="contained"
              color="primary"
              onClick={ showPassword ? handleRegister : handleNextClick }
            />
          </form>
        </Box>
      </Container>
    </main>
  )
}

export default PersonalAccount
