import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Container, InputLabel, Typography, TextField } from '@mui/material'
import PrimaryButton from '../../atom/buttons/PrimaryButton'
import useAuth from '../../../hooks/useAuth'
import { ADD_CARDS_STYLES } from './AgregarTarjetaStyles'

const AgregarTarjeta = () => {
  const auth = useAuth()

  const [numero, setNumero] = useState<number | undefined>()
  const [titular, setTitular] = useState<string>("")
  const [dateInput, setDateInput] = useState<string>("")
  const [cvv, setCvv] = useState<number | undefined>()
  const [direccion, setDireccion] = useState<string>("")
  const [codigoPostal, setCodigoPostal] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState({ text: "", msg: "" })
  const [nextButton, setNextButton] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleNextClick = () => {
    if (!numero || !titular || !dateInput || !cvv || !direccion || !codigoPostal) {
      setError(true)
      setMessage({
        text: "Todos los campos son obligatorios",
        msg: "Tarjeta",
      });
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    }
    navigate('/buy-coin')
  }

  const handleTitularTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = value.replace(/[^a-zA-Z]/g, '')
    setTitular(formattedValue)
    habilitarContinuar()
  }

  const handleCP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 4) {
      setCodigoPostal(value)
      habilitarContinuar()
    }
  };

  const handleFechaVencimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Utiliza una expresión regular para permitir solo números y la barra "/"
    const formattedValue = value.replace(/[^\d/]/g, '');

    // Asegúrate de que siempre haya una barra "/" en la posición correcta (MM/AA)
    const parts = formattedValue.split('/');
    if (parts.length === 1 && formattedValue.length === 2) {
      const newValue = `${ formattedValue }/`
      setDateInput(newValue)
    } else if (parts.length === 2) {
      const month = parts[0].slice(0, 2)
      const year = parts[1].slice(0, 2)
      const newValue = `${ month }/${ year }`
      setDateInput(newValue);
    } else {
      setDateInput(formattedValue)
    }

    habilitarContinuar()
  }

  const habilitarContinuar = () => {
    (numero && titular && dateInput && cvv && direccion && codigoPostal) ?
      setNextButton(true)
      : setNextButton(false)
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
          <Typography
            sx={ { textAlign: 'center', mx: '24px', mb: '26px' } }
            variant="h2"
            component="h1"
          >
            Datos de la tarjeta
          </Typography>
          <form style={ { maxWidth: "400px" } }>
            <InputLabel
              htmlFor="numero-tarjeta"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              Numero de la tarjeta
            </InputLabel>
            <TextField
              type="number"
              id="numero-tarjeta"
              label="Ingrese numero de la tarjeta"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ numero || "" }
              onChange={ (e) => setNumero(parseInt(e.target.value)) }
            />
            <InputLabel
              htmlFor="titular-tarjeta"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              Titular de la tarjeta
            </InputLabel>
            <TextField
              type="text"
              id="titular-tarjeta"
              label="Ingrese al titular de la tarjeta"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ titular }
              onChange={ handleTitularTarjeta }
            />
            <InputLabel
              htmlFor="fecha-vencimiento"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              Fecha de vencimiento
            </InputLabel>
            <TextField
              type="text"
              id="fecha-vencimiento"
              label="MM/AA"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ dateInput }
              onChange={ handleFechaVencimiento }
              inputProps={ {
                pattern: "\\d{2}/\\d{2}",
                inputMode: "numeric",
                maxLength: 5,
              } }
            />
            <InputLabel
              htmlFor="cvv-tarjeta"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              CVV
            </InputLabel>
            <TextField
              type="number"
              id="cvv-tarjeta"
              label="CVV"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ cvv || "" }
              onChange={ (e) => setCvv(parseInt(e.target.value)) }
            />
            <Typography variant="h3" component="h3" my={ 4 }>
              Datos de Facturación
            </Typography>
            <InputLabel
              htmlFor="direccion-facturacion"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              Dirección
            </InputLabel>
            <TextField
              type="text"
              id="direccion-facturacion"
              label="Direccion"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ direccion }
              onChange={ (e) => setDireccion(e.target.value) }
            />
            <InputLabel
              htmlFor="codigo-postal"
              sx={ ADD_CARDS_STYLES.textBold }
            >
              Código Postal
            </InputLabel>
            <TextField
              type="number"
              id="codigo-postal"
              label="Código postal"
              variant="filled"
              sx={ ADD_CARDS_STYLES.textField }
              value={ codigoPostal }
              onChange={ handleCP }
            />
            { error && (
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
