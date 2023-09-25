import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Container, InputLabel, Typography, TextField } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import { PERSONAL_STYLES } from './PersonalAccountStyles'
import useAuth from '../../../hooks/useAuth'
import { emailRegex } from '../../../utils/constants'
import { URL_REGISTER } from '../../../utils/url'
import { randomPhone } from '../../../helpers/RandonName'

const PersonalAccount: React.FC = () => {
  const auth = useAuth()
  const { registerAuth } = auth
  const [email, setEmail] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string | null>(null)

  const [password, setPassword] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string | null>(null)

  const [username, setUsername] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState({ text: '', msg: '' })
  const [welcomeMessage, setWelcomeMessage] = useState({ text: '' })
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const balance = 0
  const celphone = randomPhone()
  const isValidEmail = emailRegex.test(email)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (email) {
  //     const newUserName = email.split("@")[0]
  //     setUsername(newUserName)
  //   }
  // }, [email])

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value
    const isValidEmail = emailRegex.test(inputEmail)

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

  const handleRegister = async () => {
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
      const response = await axios.post(URL_REGISTER, {
        email,
        password,
        username,
        balance,
        celphone,
      })

      if (response) {
        setWelcomeMessage({ text: "Bienvenido" })
        setShowMessage(true)
        setTimeout(() => {
          navigate("/login")
        }, 3000)

        registerAuth({ email, password, username, balance, celphone })
      } else {
        setError(true)
        setMessage({
          text: "Error al registrarse. Por favor, intenta nuevamente más tarde.",
          msg: "Error de registro",
        })
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    } catch (error) {
      setError(true)
      setMessage({
        text: "Error al registrarse. Por favor, intenta nuevamente más tarde.",
        msg: "Error de registro",
      })
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  const handleNextClick = () => {
    if ([email].includes("")) {
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
      })

      setTimeout(() => {
        setError(false)
      }, 3000)

      return
    }
    setShowPassword(true)
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
              placeholder="Ingresa el correo electrónico"
              variant="filled"
              fullWidth
              value={ email }
              onChange={ handleEmail }
              error={ Boolean(errorEmail) }
              helperText={ errorEmail }
              sx={ { marginBottom: '20px' } }
            />
            { error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { message.text } — <strong>{ message.msg }</strong>
              </Alert>
            ) }
            { showPassword && (
              <TextField
                id="register-password"
                label="Contraseña"
                variant="filled"
                type="password"
                style={ PERSONAL_STYLES.inputPassword }
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            ) }
            { showMessage && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                { welcomeMessage.text } —{ " " }
                <strong>
                  Registro con Exito! Seras redireccionado al Login
                </strong>
              </Alert>
            ) }
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
