import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, InputLabel, TextField, Typography } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { loginStyle } from './loginStyle'
import { URL_LOGIN, emailRegex } from '../../../utils/constants'
import useAuth from '../../../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgBlack } from '../../../utils/styles'
import { useLoader } from '../../../context/LoaderProvider'

const LoginScreen: React.FC = () => {
  const { addLoading, removeLoading } = useLoader()
  const auth = useAuth()
  const { login } = auth
  const navigate = useNavigate()

  const [userOrEmail, setUserOrEmail] = useState<string>('')
  const [errorUserOrEmail, setErrorUserOrEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [errorPassword, seterrorPassword] = useState<string | null>(null)
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false)

  const handleUserOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserOrEmail = e.target.value
    const isValidEmail = emailRegex.test(inputUserOrEmail)

    if (isValidEmail) {
      setUserOrEmail(inputUserOrEmail)
      setErrorUserOrEmail(null)
    } else {
      setUserOrEmail(inputUserOrEmail)
      setErrorUserOrEmail('X - Correo electrónico no válido')
    }
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value

    if (inputPassword.length > 6) {
      setPassword(inputPassword)
      seterrorPassword(null)
    } else {
      setPassword(inputPassword)
      seterrorPassword('X - La contraseña es obligatoria y debe tener más de 6 caracteres')
    }
  }

  const handleNextClick = () => {
    if (userOrEmail === '') {
      toast.error(' Debes ingresar el correo electónico')
      setShowPasswordInput(false)
      return
    }

    setShowPasswordInput(true)
  }

  const handleLoginClick = async () => {
    if (userOrEmail === '' || password === '') {
      toast.error(' Debes ingresar el correo y  la contraseña')
      return
    }

    try {
      addLoading()
      const { data } = await axios.post(URL_LOGIN, { userOrEmail, password })
      login(data.data) // Store the token in the localStorage
      removeLoading()

      // If is an invalid login, due to wrong userOrEmail or password, shows the alert
      if (data.status === 'true' && data.message === 'Credenciales invalidas') {
        toast.error(' Error al loguearte, verifica el correo y la contraseña')
        return
      }

      // If it's login ok redirect to market
      if (data.status === 'true' && data.message === 'Login Correcto') {
        toast.success(' Login Correcto. Redireccionando a Mercado.')
        setTimeout(() => {
          navigate('/market')
        }, 5000)
      }
    } catch (error) {
      toast.error(`Error al loguearte: ${ error }`)
    }
  }

  return (
    <Container maxWidth="xs" sx={ { minHeight: '82vh' } }>
      <Toaster
        position="top-center"
        toastOptions={ { duration: 3000, style: toastStyleBgBlack } }
      />
      <Typography
        variant="h2"
        align="left"
        gutterBottom
        sx={ loginStyle.typography }
      >
        Iniciar sesión
      </Typography>
      <form>
        <InputLabel htmlFor="correo" sx={ loginStyle.label }>
          Correo electrónico
        </InputLabel>
        <TextField
          type="text"
          id="correo"
          placeholder="Ingresa el correo electrónico"
          variant="filled"
          fullWidth
          value={ userOrEmail }
          onChange={ handleUserOrEmail }
          error={ Boolean(errorUserOrEmail) }
          helperText={ errorUserOrEmail }
          sx={ { marginBottom: '20px' } }
        />
        { showPasswordInput &&
          <>
            <InputLabel htmlFor="password" sx={ loginStyle.label }>
              Contraseña
            </InputLabel>
            <TextField
              type="password"
              id="password"
              placeholder="Ingresa la contraseña"
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
        <PrimaryButton
          text={ !showPasswordInput ? "Siguiente" : "Iniciar sesión" }
          ariaLabelText="Continuar con google"
          onClick={ showPasswordInput ? handleLoginClick : handleNextClick }
          sx={ { my: '20px' } }
        />
        <Typography
          variant="h4"
          align="center"
          my={ 2 }
        >
          ¿Aún no tenés una cuenta?
        </Typography>
        <PrimaryButton
          text='Crear cuenta en Binance'
          ariaLabelText='Crear cuenta en Binance'
          variant="contained"
          color="secondary"
          style={ loginStyle.btnCreateAccount }
          onClick={ () => navigate('/') }
        />
      </form>
    </Container>
  )
}

export default LoginScreen
