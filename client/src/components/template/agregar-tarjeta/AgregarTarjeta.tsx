import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Container, InputLabel, Typography, TextField } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import useAuth from '../../../hooks/useAuth'
import { ADD_CARDS_STYLES } from './AgregarTarjetaStyles'
import { getTheLastTwoNumbersOfCurrentYear } from '../../../utils/strings'

const AgregarTarjeta = () => {
  const auth = useAuth()

  const [numero, setNumero] = useState<string>('')
  const [errorNumero, setErrorNumero] = useState<string | null>(null)
  const [titular, setTitular] = useState<string>('')
  const [errorTitular, setErrorTitular] = useState<string | null>(null)
  const [dateInput, setDateInput] = useState<string>('')
  const [errorFechaVencimiento, setErrorFechaVencimiento] = useState<string | null>(null)
  const [cvv, setCvv] = useState<string>('')
  const [errorCvv, setErrorCvv] = useState<string | null>(null)
  const [direccion, setDireccion] = useState<string>('')
  const [errorDireccion, setErrorDireccion] = useState<string | null>(null)
  const [codigoPostal, setCodigoPostal] = useState<string>('')
  const [errorCodigoPostal, setErrorCodigoPostal] = useState<string | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const [message, setMessage] = useState({ text: "", msg: "" })
  const [nextButton, setNextButton] = useState<boolean>(false)

  console.log('DATE INPUT -> ', dateInput)
  const navigate = useNavigate()

  const handleNumeroTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumero = e.target.value
    // Delete white spaces and caracter not numerics
    const cleanedNumero = inputNumero.replace(/\D/g, '')

    if (cleanedNumero.length === 16) {
      setNumero(cleanedNumero.toString())
      setErrorNumero(null)
      habilitarContinuar()
    } else {
      setNumero(cleanedNumero.toString())
      setErrorNumero('x - El número de tarjeta debe tener exactamente 16 dígitos')
    }
  }

  const handleTitularTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTitular = e.target.value

    const formattedTitular = inputTitular.replace(/[^a-zA-Z]/g, '')

    if (formattedTitular.length >= 3) {
      setTitular(formattedTitular)
      setErrorTitular(null)
      habilitarContinuar()
    } else {
      setTitular(formattedTitular)
      setErrorTitular('x - El titular debe contener al menos tres letras')
    }
  }

  const handleFechaVencimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const formattedValue = value.replace(/[^\d/]/g, '') // Only numbers and "/"
    const parts = formattedValue.split('/') // Always the  "/" is between MM and YY 

    if (parts.length === 1 && formattedValue.length === 2) {
      const newValue = `${ formattedValue }/`
      setDateInput(newValue)
    } else if (parts.length === 2) {
      const month = parts[0].slice(0, 2)
      const year = parts[1].slice(0, 2)
      const newValue = `${ month }/${ year }`

      if (+month < 1 || +month > 12 || +year <= +getTheLastTwoNumbersOfCurrentYear()) {
        setDateInput(newValue)
        setErrorFechaVencimiento('X - Debes ingresar una fecha válida')
        return
      }
      setErrorFechaVencimiento(null)
      setDateInput(newValue)
    } else {
      setDateInput(formattedValue)
    }
    habilitarContinuar()
  }

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCvv = e.target.value
    // Delete white spaces and caracter not numerics
    const formattedCvv = inputCvv.replace(/\D/g, '')

    if (formattedCvv.length === 3) {
      setCvv(formattedCvv)
      setErrorCvv(null)
      habilitarContinuar()
    } else {
      setCvv(formattedCvv)
      setErrorCvv('x - El CVV es de tres números')
    }
  }

  const handleDireccion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDireccion = e.target.value

    if (inputDireccion.length > 8) {
      setDireccion(inputDireccion)
      setErrorDireccion(null)
      habilitarContinuar()
    } else {
      setDireccion(inputDireccion)
      setErrorDireccion('x - La dirección debe tener al menos 8 caracteres')
    }
  }

  const handleCodigoPostal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length >= 4 && value.length <= 8) {
      setCodigoPostal(value)
      setErrorCodigoPostal(null)
      habilitarContinuar()
    } else {
      setCodigoPostal(value)
      setErrorCodigoPostal('x- El codigo postal debe contener de 4 a 8 caracteres')
    }
  }

  const habilitarContinuar = () => {
    (numero && titular && dateInput && cvv && direccion && codigoPostal) ?
      setNextButton(true)
      : setNextButton(false)
  }

  const handleNextClick = () => {
    if (!numero || !titular || !dateInput || !cvv || !direccion || !codigoPostal) {
      setHasError(true)
      setMessage({
        text: "Todos los campos son obligatorios",
        msg: "Tarjeta",
      });
      setTimeout(() => {
        setHasError(false)
      }, 3000)
      return
    }
    navigate('/buy-coin')
  }

  if (!auth) { // when context is not defined 
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se puede registrar
      </Alert>
    )
  }

  return (
    <main style={ ADD_CARDS_STYLES.main }>
      <Container maxWidth="sm" sx={ ADD_CARDS_STYLES.container }>
        <Box sx={ ADD_CARDS_STYLES.boxContainer }>
          <Typography sx={ ADD_CARDS_STYLES.title } variant="h2">
            Datos de la tarjeta
          </Typography>
          <form style={ { maxWidth: "400px" } }>
            <InputLabel htmlFor="numero-tarjeta" sx={ ADD_CARDS_STYLES.textBold }>
              Numero de la tarjeta
            </InputLabel>
            <TextField
              type="text"
              id="numero-tarjeta"
              placeholder="Ingrese numero de la tarjeta"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ numero }
              onChange={ handleNumeroTarjeta }
              error={ Boolean(errorNumero) }
              helperText={ errorNumero }
              inputProps={ { inputMode: "numeric", maxLength: 16 } }
            />
            <InputLabel htmlFor="titular-tarjeta" sx={ ADD_CARDS_STYLES.textBold }>
              Titular de la tarjeta
            </InputLabel>
            <TextField
              type="text"
              id="titular-tarjeta"
              placeholder="Tal como figura en la tarjeta"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ titular }
              onChange={ handleTitularTarjeta }
              error={ Boolean(errorTitular) }
              helperText={ errorTitular }
            />
            <InputLabel htmlFor="fecha-vencimiento" sx={ ADD_CARDS_STYLES.textBold }>
              Fecha de vencimiento
            </InputLabel>
            <TextField
              type="text"
              id="fecha-vencimiento"
              placeholder="MM/AA. Ejemplo: 02/24"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ dateInput }
              onChange={ handleFechaVencimiento }
              error={ Boolean(errorFechaVencimiento) }
              helperText={ errorFechaVencimiento }
              inputProps={ { pattern: "\\d{2}/\\d{2}", inputMode: "numeric", maxLength: 5 } }
            />
            <InputLabel htmlFor="cvv-tarjeta" sx={ ADD_CARDS_STYLES.textBold }>
              CVV
            </InputLabel>
            <TextField
              type="number"
              id="cvv-tarjeta"
              placeholder="CVV"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ cvv }
              onChange={ handleCvv }
              error={ Boolean(errorCvv) }
              helperText={ errorCvv }
              inputProps={ { inputMode: "numeric", maxLength: 3 } }
            />
            <Typography variant="h3" component="h3" my={ 4 }>
              Datos de Facturación
            </Typography>
            <InputLabel htmlFor="direccion-facturacion" sx={ ADD_CARDS_STYLES.textBold } >
              Dirección
            </InputLabel>
            <TextField
              type="text"
              id="direccion-facturacion"
              placeholder="Dirección"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ direccion }
              onChange={ handleDireccion }
              error={ Boolean(errorDireccion) }
              helperText={ errorDireccion }
            />
            <InputLabel htmlFor="codigo-postal" sx={ ADD_CARDS_STYLES.textBold } >
              Código Postal
            </InputLabel>
            <TextField
              type="text"
              id="codigo-postal"
              placeholder="Código postal"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ codigoPostal }
              onChange={ handleCodigoPostal }
              error={ Boolean(errorCodigoPostal) }
              helperText={ errorCodigoPostal }
            />
            { hasError && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { message.text } — <strong>{ message.msg }</strong>
              </Alert>
            ) }
            <PrimaryButton
              text={ "Siguiente" }
              ariaLabelText="Continuar"
              variant="contained"
              color="primary"
              disabled={ !nextButton }
              onClick={ handleNextClick }
            />
          </form>
        </Box>
      </Container>
    </main>
  )
}

export default AgregarTarjeta
