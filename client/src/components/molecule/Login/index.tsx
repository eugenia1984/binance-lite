import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Container, TextField, Typography } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { loginStyle } from './loginStyle'
import { URL_LOGIN, emailRegex } from '../../../utils/constants'
import useAuth from '../../../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'
import { toastStyleBgRed } from '../../../utils/styles'

const LoginScreen: React.FC = () => {
  const auth = useAuth()
  const { login } = auth
  const navigate = useNavigate()

  const [userOrEmail, setUserOrEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState({ text: "", msg: "" })
  const [welcomeMessage, setWelcomeMessage] = useState({ text: "" })
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const isValidEmail = emailRegex.test(userOrEmail)

  const handleNextClick = () => {
    if ([userOrEmail].includes("")) {
      setError(true)
      setMessage({
        text: "El email es obligatorio",
        msg: "Email",
      });
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    }
    if (!isValidEmail) {
      setError(true)
      setMessage({
        text: "El email contiene caracteres invalidos",
        msg: "Email invalido",
      });
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    }
    setShowPasswordInput(true)
  }

  const handleLoginClick = async () => {
    if (!password || password.length < 6) {
      setError(true)
      setMessage({
        text: "El password es obligatorio y debe tener más de 6 caracteres",
        msg: "password invalido",
      })
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    }

    try {
      const { data } = await axios.post(URL_LOGIN, { userOrEmail, password })
  
      // Store the token in the localStorage
      login(data.data) 

      // If is an invalid login shows the alert
      if (data.status === 'true' && data.message === 'Credenciales invalidas') {
        toast.error('Error al loguearte')
        return
      }

      // If it's login ok redirect to market
      if (data.status === 'true' && data.message === 'Login Correcto') {
        navigate("/market")
      }
    } catch (error) {
      toast.error(`Error al loguearte: ${error}`)
    }
  }

  return (
    <Container maxWidth="xs" sx={ { minHeight: '82vh' } }>
        <Toaster
          position="top-center"
          toastOptions={ {
            duration: 6000,
            style: toastStyleBgRed,
          } }
        />
      <Typography
        variant="h2"
        align="left"
        gutterBottom
        sx={ loginStyle.typography }
      >
        Iniciar sesión
      </Typography>
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        margin="normal"
        value={ userOrEmail }
        onChange={ (e) => setUserOrEmail(e.target.value) }
        sx={ { marginBottom: "20px", borderRadius: '12px' } }
      />
      { error &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          { message.text } — <strong>{ message.msg }</strong>
        </Alert>
      }
      { showPasswordInput &&
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      }
      { showMessage &&
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          { welcomeMessage.text } —{ " " }
          <strong>Registro con Exito! Seras redireccionado al Market</strong>
        </Alert>
      }
      <PrimaryButton
        text={ !showPasswordInput ? "Siguiente" : "Iniciar sesión" }
        ariaLabelText="Continuar con google"
        onClick={ showPasswordInput ? handleLoginClick : handleNextClick }
        style={ { marginBottom: "20px" } }
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
        variant='outlined'
        style={ loginStyle.btnCreateAccount }
        onClick={ () => navigate('/') }
      />
    </Container>
  )
}

export default LoginScreen
